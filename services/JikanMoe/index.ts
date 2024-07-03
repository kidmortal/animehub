import { JikanAnimeCharacters } from './types/characters';
import { SeasonAnimesResponse } from './types/season';
import { JikanMoeSeasonsList } from './types/seasons';

class JikanMoeServiceClass {
  private endpoint = 'https://api.jikan.moe/v4';

  async getCurrentSeasonAnimes(): Promise<SeasonAnimesResponse> {
    const response = await fetch(`${this.endpoint}/seasons/now`);
    const data: SeasonAnimesResponse = await response.json();
    return data;
  }

  async getSeasonsList(): Promise<JikanMoeSeasonsList> {
    const response = await fetch(`${this.endpoint}/seasons/`);
    const data: JikanMoeSeasonsList = await response.json();
    return data;
  }

  async getCharactersFromAnimeId(animeId: number): Promise<JikanAnimeCharacters> {
    const response = await fetch(`${this.endpoint}/anime/${animeId}/characters`);
    const data = await response.json();
    return data;
  }
}

export const JikanMoeService = new JikanMoeServiceClass();
