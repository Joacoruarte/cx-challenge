interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

interface Origin {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Origin;
  image: string;
  episode: string[];
  url: string;
  created: string;
  currentPage?: number;
}

export interface CharacterResponse {
  info: Info;
  results: Character[];
}
