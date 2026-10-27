/**
 * Gets the age certification rating for a movie or TV show.
 * 
 * @param {Object} ratingsData - The raw response from TMDB (release_dates or content_ratings)
 * @param {string} type - 'movie' or 'tv'
 * @returns {string} The certification code (e.g. 'PG-13', 'TV-MA') or 'Unrated'
 * 
*/
export function getShowRating(ratingsData, type) {
  if (!ratingsData?.results || ratingsData.results.length === 0) return 'Unrated';
  if (type && type === 'person') return;

  const targetCountry = navigator?.language.split('-')[1] || 'US';
  const results = ratingsData.results;
  const country = results.find(rating => rating.iso_3166_1 === targetCountry);

  try {
    if (type === 'movie') {
      const rating = country.release_dates.find(rating => rating.certification && rating.certification.trim() !== '')
      return rating?.certification || 'Unrated';
    } else {
      return country?.rating?.trim() !== '' &&  country?.rating
      ? country.rating
      : 'Unrated'
    }
  } catch(err) {
    console.error(err.message);
  }
}

export function formatRuntime(runtime) {
  if (!runtime) return 'N/A';

  function formatTime(value) {
    if (value >= 60) {
      const hour = (Math.floor(value / 60));
      const minutes = value % 60;
      
      return `${hour}h ${minutes}m`
    }

    return `${value}m`
  }

  function getRuntime(runtime) {
    if (Array.isArray(runtime)) {
      if (runtime.length === 0) return 'N/A';
      if (runtime.length === 1) return formatTime(runtime[0]);

      const min = formatTime(Math.min(...runtime));
      const max = formatTime(Math.max(...runtime));

      return `${min} - ${max}`
    }

    if (typeof runtime === 'number') {
      return formatTime(runtime)
    }

    return 'N/A'
  }

  return getRuntime(runtime);
}

export function formatVoteCount(voteCount) {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  })

  return formatter.format(voteCount);
}

export const getTodayDate = () => new Date().toISOString().split('T')[0];

// Get date in string
export const date_to_string = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

export const getAge = (birthday, deathday) => {
  const birthdate = birthday
  ? new Date(birthday)
  : null;

  const end_date = deathday
  ? new Date(deathday)
  : new Date();

  let age = end_date.getFullYear() - birthdate.getFullYear();
  const month_difference = end_date.getMonth() - birthdate.getMonth();
  const day_difference = end_date.getDay() - birthdate.getDay();

  if (month_difference < 0 && day_difference < 0) {
    age++
  }

  return age;
}