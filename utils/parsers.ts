import { SeasonYearName } from '@/context/animes';
import { JikanMoeSeason } from '@/services/JikanMoe/types/seasons';

export class ParserUtils {
  static parseJikanSeasonsToSeasonYearName(seasons: JikanMoeSeason[]): SeasonYearName[] {
    let parsedSeasons: SeasonYearName[] = [];
    for (let i = 0; i < seasons.length; i++) {
      const seasonYear = seasons[i];
      // needs to follow this order -> winter, fall, summer, spring
      const sortedSeasons = seasonYear.seasons.sort((a, b) => {
        if (a === 'winter') return -1;
        if (b === 'winter') return 1;
        if (a === 'fall') return -1;
        if (b === 'fall') return 1;
        if (a === 'summer') return -1;
        if (b === 'summer') return 1;
        if (a === 'spring') return -1;
        if (b === 'spring') return 1;
        return 0;
      });

      sortedSeasons.forEach((season) => {
        parsedSeasons.push({
          year: seasonYear.year,
          season: season,
        });
      });
    }
    return parsedSeasons;
  }
}
