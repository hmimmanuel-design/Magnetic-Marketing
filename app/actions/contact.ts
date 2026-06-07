"use server";

import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

/**
 * Server Action voor het contactformulier.
 *
 * Beveiliging:
 *  - Honeypot veld (`website`): bots vullen 'm meestal in → afkeuren
 *  - Strikte input-validatie via Zod (lengte + type)
 *  - Rate limit per IP via een eenvoudige in-memory map (te vervangen door Upstash/Redis later)
 *  - HTML escaping in body (Resend stuurt plain text)
 *  - Geen secrets in client bundle (RESEND_API_KEY blijft server-side)
 */

const ContactSchema = z.object({
  business: z.string().min(2, "Vul minimaal 2 tekens in").max(500),
  service: z.string().min(2, "Vul minimaal 2 tekens in").max(2000),
  budget: z.string().min(1, "Vul een budget in").max(200),
  // Honeypot
  website: z.string().max(0, "spam").optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"business" | "service" | "budget", string>>;
};

// Eenvoudige in-memory rate limit (per server instance). Per IP: max 5 per uur.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const headersList = await (await import("next/headers")).headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  if (!rateLimitOk(ip)) {
    return {
      status: "error",
      message:
        "Te veel aanvragen vanaf jouw IP. Probeer het later opnieuw of bel ons direct.",
    };
  }

  const raw = {
    business: formData.get("business")?.toString() ?? "",
    service: formData.get("service")?.toString() ?? "",
    budget: formData.get("budget")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    const allowed = new Set(["business", "service", "budget"]);
    for (const issue of parsed.error.issues) {
      const raw = issue.path[0];
      if (typeof raw === "string" && allowed.has(raw)) {
        const key = raw as keyof NonNullable<ContactState["fieldErrors"]>;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Controleer de ingevulde velden.",
      fieldErrors,
    };
  }

  // Honeypot trigger → stilletjes "success" tonen, niets versturen
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { status: "success", message: "Bedankt voor je bericht." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY ontbreekt");
    return {
      status: "error",
      message:
        "De e-mailservice is tijdelijk niet beschikbaar. Bel ons gerust direct.",
    };
  }

  const resend = new Resend(apiKey);
  const fromAddress =
    process.env.RESEND_FROM || "Magnetic Marketing <noreply@marketing-magnetic.nl>";

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [siteConfig.email],
      replyTo: siteConfig.email,
      subject: "Nieuwe aanvraag via website",
      text: [
        "Nieuwe aanvraag via marketing-magnetic.nl",
        "",
        "Wat voor type bedrijf of dienst verkoopt u?",
        parsed.data.business,
        "",
        "Naar welke service bent u op zoek?",
        parsed.data.service,
        "",
        "In wat voor budget range bevindt u zich?",
        parsed.data.budget,
        "",
        `IP: ${ip}`,
        `Tijdstip: ${new Date().toISOString()}`,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return {
        status: "error",
        message:
          "Versturen mislukte. Probeer het opnieuw of mail rechtstreeks naar " +
          siteConfig.email,
      };
    }

    return {
      status: "success",
      message:
        "Dankjewel! We hebben je aanvraag ontvangen en nemen zo snel mogelijk contact op.",
    };
  } catch (err) {
    console.error("[contact] Onverwachte fout", err);
    return {
      status: "error",
      message:
        "Er ging iets mis. Probeer het opnieuw of mail rechtstreeks naar " +
        siteConfig.email,
    };
  }
}
