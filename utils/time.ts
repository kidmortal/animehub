export class TimeUtils {
  static getNow() {
    return new Date().getTime();
  }
  static getCurrentSeasonYearName() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    let season = '';
    if (month >= 0 && month <= 2) {
      season = 'winter';
    } else if (month >= 3 && month <= 5) {
      season = 'spring';
    } else if (month >= 6 && month <= 8) {
      season = 'summer';
    } else {
      season = 'fall';
    }
    return {
      year,
      season,
    };
  }
}
