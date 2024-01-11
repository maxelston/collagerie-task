export interface ICharacterCore {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  avatar: string;
  image: string;
}

export interface ICharacter extends ICharacterCore {
  origin: ILocation;
  location: ILocation;
  episode: IEpisode[];
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
  residents: ICharacter[];
  dimension: string;
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  characters: ICharacter[];
  episode: string;
}

export interface ICharactersResponse {
  response: {
    characters: {
      results: ICharacterCore[];
      info: {
        pages: number;
      };
    };
  };
}

export interface ICharacterResponse {
  response: {
    character: ICharacter;
  };
  episodes: {
    firstAppearance: IEpisode;
    lastAppearance: IEpisode;
  };
}
