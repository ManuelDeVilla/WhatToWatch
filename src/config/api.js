export const BASE_URL = "https://api.themoviedb.org/3";
export const BASE_POSTER_PATH = "https://image.tmdb.org/t/p/w342"
export const TMDB_LINK = "https://www.themoviedb.org/"

export const REQUEST = {
    get: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`
      }
    }
  }