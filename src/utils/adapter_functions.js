import { TMDB_LINK } from "../config/api";
import { date_to_string, formatRuntime, formatVoteCount, getAge, getShowRating } from "./formatter";
import { getDirectors, getHeroVideo } from "./tmdb";

// Adopter for each data
// This adds data type for each data if type property exists in fetching
export function formatResultData (data = {}, type = '') {
  if (type.trim() === '') return data;

  const updated_result = data.results?.map((result_data) => ({...result_data, type: type})) || []
 
  return {...data, results: updated_result}; 
}


// Adopter for show details
export function formatShowData (fetchedData) {
  const data = fetchedData?.data || {};
  const showData = data?.show_data || {};
  const video_data = data?.videos || {};

  console.log(data)
  console.log(showData)
  const name = showData?.title || showData?.name || null;
  
  // Get Year Released
  const year_released = showData?.release_date?.split('-')[0]
    || showData?.first_air_date?.split('-')[0]
    || null;

  // Get show rating [PG, 18, etc.]
  const rating_details = data?.rating || {};
  const rating = getShowRating(rating_details, fetchedData.type);

  // Get show length
  const data_runtime = showData?.runtime || showData?.episode_run_time || null;
  const runtime = formatRuntime(data_runtime);

  // Get Vote -> audience vote
  const vote = showData?.vote_average?.toFixed(1) || 0;
  const vote_count = formatVoteCount(showData.vote_count) || 0;
  
  // Get Photo Count
  const photo_array = data?.photos || {}
  const photo_count = photo_array?.backdrops?.length || 0 +
                    photo_array?.logos?.length || 0 +
                    photo_array?.posters?.length || 0

  // Get Video Count
  const video_count = data?.videos?.results?.length || 0;

  // Get Video Hero 
  const {video_link = null, video_key = null} = getHeroVideo(video_data?.results || {}) || {};

  // Get Directors or Creators depending on show 
  const crews = data?.credits?.crew || [];
  const directors = fetchedData.type === 'movie'
    ? getDirectors(crews, 'movie')
    : showData?.created_by || [];
  
  // Get review count
  const review_count = data?.reviews?.total_results || 0;
  // To know if the show is released or not
    const date_today = new Date ().getTime();

    const release_date = showData?.release_date || showData?.first_air_date || null;
    const date_of_release = new Date(release_date).getTime();
    
    const is_released = date_of_release < date_today;
    const formatted_release = date_to_string.format(date_of_release);

  return {
    all_data: fetchedData,
    year_released,
    rating,
    name,
    runtime,
    vote_average: vote,
    vote_count,
    photo_count,
    video_count,
    hero_video: {
      video_link,
      video_key
    },
    directors: directors,
    review_count,
    is_released,
    formatted_release
  }
}

// Adopter

// ShowList Adopter
export function formatShowList(fetched_data, sort_type = 'popular') {
  const {data, type} = fetched_data;
  let result = null;

  // If two or more types then combine results
  if (Array.isArray(type)) {
    if (!data) return [];

    const result_array = [];

    Object.keys(data).forEach((show_type) => {
      const result_path = data[show_type]?.results || [];
      result_path.forEach(data => result_array.push(data))
    })
    
    result = result_array;

    // Else do not
  } else {
    if (!fetched_data.type) return [];
    result = data[type]?.results || [];
  }

  // for Sorting
  switch(sort_type) {
    case 'popular':
    case 'top_rated':
      result = result.sort((a, b) => b.popularity - a.popularity);
      break;

    case 'newest':
    case 'unreleased':
      if (type !== 'person') {
        result = result.sort((a, b) => {
          const date_a = new Date(
            a?.release_date ||
            a?.first_air_date ||
            0
          );
          const date_b = new Date(
            b?.release_date ||
            b?.first_air_date ||
            0
          );

          return date_a - date_b;
        });
      }
      break;
  }

  return {...fetched_data, result};
}

export function formatHeroTextShow(adapter_data) {
  
    const show = adapter_data?.all_data?.data?.show_data ||
                 {};
    const type = adapter_data?.all_data?.type ||
                 null;
    const release_date = show?.release_date ||
                         show?.first_air_date ||
                         null;
    const release_date_timestamp = release_date
    ? new Date(release_date).getTime()
    : null;

    return {
      id: show?.id || null,
      name: show.name ||
            show.title ||
            'Untitled',
      genres: show?.genres || [],
      show_link: type
      ? `${TMDB_LINK}${type}/${show?.id || null}`
      : `${TMDB_LINK}`,
      type: type,
      release_date: release_date_timestamp
      ? date_to_string.format(release_date_timestamp)
      : 'Unnanounced',
      is_released: release_date_timestamp
      ? release_date_timestamp <= Date.now()
      : false,
      year_released: release_date
      ? release_date.split('-')[0]
      : null,
      directors: adapter_data?.directors || [],
      vote_count: Number(adapter_data?.vote_count || 0),
      average_vote: adapter_data?.vote_average || 0,
      rating: adapter_data?.rating || null,
      runtime: adapter_data?.runtime,
      poster_path: show?.poster_path || null,
      overview: show?.overview || null
    }
}