export enum ViewState {
  LOBBY = 'LOBBY',
  PORTFOLIO = 'PORTFOLIO',
  CONTACT = 'CONTACT',
  SERVICES = 'SERVICES'
}

export enum BackgroundTheme {
  CYBER = 'CYBER',
  DESERT = 'DESERT',
  ANTARCTICA = 'ANTARCTICA',
  BEACH = 'BEACH',
  JUNGLE = 'JUNGLE',
  PARTY = 'PARTY'
}

export interface CharacterConfig {
  name: string;
  role: string;
  hairColor: 'black' | 'blond';
  outfitColor: string;
  isReady: boolean;
  avatarSeed: string; // For dicebear API
  imageUrl?: string; // For custom uploaded character images
  speechText?: string;
}