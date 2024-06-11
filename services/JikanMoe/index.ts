import { SeasonAnimesResponse } from "./types";

class JikanMoeService {
  private endpoint = "https://api.jikan.moe/v4";

  async getCurrentSeasonAnimes(): Promise<SeasonAnimesResponse> {
    const response = await fetch(`${this.endpoint}/seasons/now`);
    const data: SeasonAnimesResponse = await response.json();
    return data;
  }
}
