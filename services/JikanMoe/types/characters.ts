export interface JikanAnimeCharacters {
  data: JikanAnimeCharacter[];
}

export interface JikanAnimeCharacter {
  character: Character;
  role: string;
  favorites: number;
  voice_actors: VoiceActor[];
}

export interface Character {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
}

export interface Images {
  jpg: Jpg;
  webp: Webp;
}

export interface Jpg {
  image_url: string;
}

export interface Webp {
  image_url: string;
  small_image_url: string;
}

export interface VoiceActor {
  person: Person;
  language: string;
}

export interface Person {
  mal_id: number;
  url: string;
  images: PersonImages;
  name: string;
}

export interface PersonImages {
  jpg: PersonImagesJpg;
}

export interface PersonImagesJpg {
  image_url: string;
}
