import SuccessIcon from '../assets/icons/success.svg?react';
import ErrorIcon from '../assets/icons/error.svg?react'

import { getTodayDate } from "./formatter";

export const LIST_TYPE_QUERY_PARAM = {
  newest: {
    movie: 'primary_release_date.desc',
    tv: 'first_air_date.desc'
  },
  popular: {
    movie: 'popularity.desc',
    tv: 'popularity.desc'
  },
  top_rated: {
    movie: 'vote_average.desc&vote_count.gte=300',
    tv: 'vote_average.desc&vote_count.gte=300'
  },
  unreleased: {
    movie: `primary_release_date.asc`,
    tv: `first_air_date.asc`
  }
}

export const ICONS = {
  success: SuccessIcon,
  error: ErrorIcon
}

// Filter variables
export const PLACEHOLDER_MAP = {
  all: 'Movies and TV Series',
  movie: 'Movies',
  tv: 'TV Series',
  person: 'Crews or Casts',
};

export const SHOW_TYPE = [
  {value: 'all', label: 'Movies and Series'},
  {value: 'movie', label: 'Movie'},
  {value: 'tv', label: 'TV Series'}
];

export const LIST_TYPE = [
  {value: 'newest', label: 'Newest'},
  {value: 'popular', label: 'Popular'},
  {value: 'top_rated', label: 'Top Rated'},
  {value: 'unreleased', label: 'Coming Soon'},
];

export const GENRE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'animation', label: 'Animation' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'crime', label: 'Crime' },
];

export const GENRE_MAP = {
  action:    { movie: 28,    tv: 10759 }, // Action vs Action & Adventure
  comedy:    { movie: 35,    tv: 35 },    // Same ID
  drama:     { movie: 18,    tv: 18 },    // Same ID
  animation: { movie: 16,    tv: 16 },    // Same ID
  mystery:   { movie: 9648,  tv: 9648 },  // Same ID
  crime:     { movie: 80,    tv: 80 },    // Same ID
  sciFi:     { movie: 878,   tv: 10765 }, // Sci-Fi vs Sci-Fi & Fantasy
  western:   { movie: 37,    tv: 37 }     // Same ID
};