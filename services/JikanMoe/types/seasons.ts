export type JikanMoeSeasonsList = {
  pagination: Pagination;
  data: JikanMoeSeason[];
};

export type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
};

export type JikanMoeSeason = {
  year: number;
  seasons: JikanMoeSeasonString[];
};

export type JikanMoeSeasonString = 'winter' | 'spring' | 'summer' | 'fall';
