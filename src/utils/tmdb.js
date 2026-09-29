import { data } from "react-router-dom";
import { BASE_URL, REQUEST } from "../config/api";
import { GENRE_MAP, LIST_TYPE_QUERY_PARAM } from "./variables";
import { getTodayDate } from "./formatter";
import { formatResultData } from "./adapter_functions";

/**
 * Fetches a batch of data in parallel.
 * @param {Array<{title: string, url: string}>} showType - Array of objects containing title and url
 * @returns {Promise<Array<{title: string, data: any}>>}
 */

export async function fetchBatch(batchFetchArray) {
  const entries = await Promise.all(
    batchFetchArray.map(async ({
      title,
      url,
      type = ''
    }) => {
      try {
        const res = await fetch(url, REQUEST.get);
        if (!res.ok) throw new Error(`Failed to fetch: ${url}`);

        const data = await res.json();
        const updated_data = formatResultData(data ,type);

        return [title, updated_data || []]
      } catch (err) {
        console.error(`Caught error for ${title}:`, err.message)
        return [title, null]
      }
    })
  );

  return Object.fromEntries(entries);
}

export function getHeroVideo(videos) {
  if (videos?.length === 0) return null;

  const video = videos.find(video => video.type === 'Trailer') ||
  videos.find(video => video.type === 'Teaser');
  if (!video) return null;

  return {
    video_link: createVideoLink(video),
    video_key: video.key
  };
}

export function createVideoLink(links) {
  function createLink(video) {
    switch (video.site) {
      case 'YouTube':
        return {data: video, link: `https://www.youtube.com/embed/${video.key}`};
      case 'Vimeo':
        return {data: video, link: `https://player.vimeo.com/video/${video.key}`};
      case 'Dailymotion':
        return {data: video, link: `https://www.dailymotion.com/embed/video/${video.key}`};
      default:
        console.warn(`Unsupported video provider: ${video.site}`);
        return null;
    }
  }

  if (Array.isArray(links)) {
    return links?.map((link) => createLink(link)) || [];
  }

  return createLink(links)
}

export function getDirectors(crew, type) {
  if (!crew && crew.length === 0) return [];

  if (type === 'movie') {
    return crew.filter((member) => member.job === 'Director')
  }

  return [];
}

export function getVideo(videos, length) {
  if (!videos && videos.length === 0) return;

  const videoResult = [];

  for (let x = 0; x < length; x++) {
    videoResult.push(videos[x])
  }

  return videoResult;
}

// For getting the featured reviews
export const getFeaturedReviews = (reviews, limit = 4) => {
  if (!reviews || reviews.length === 0) return [];

  const positive_limit = Math.ceil(limit / 2);
  const critical_limit = Math.floor(limit / 2);
  const featured_reviews = reviews.filter(review => review.content.length > 150)
                                  .sort((a, b) => b.author_details.rating - a.author_details.rating) || [];
  const all_positive_reviews = featured_reviews.filter(review => review.author_details.rating > 7) || [];
  const all_critical_reviews = featured_reviews.filter(review => {
    const rating = review.author_details.rating || null;
    return rating < 7 && rating != null
  }) || [];

  if (all_positive_reviews.length >= positive_limit && all_critical_reviews.length >= critical_limit) {
    return [
      ...all_positive_reviews.slice(0, positive_limit),
      ...all_critical_reviews.slice(0, critical_limit)
    ];
  }

  return featured_reviews.slice(0, limit) || [];
}

export const getReviewScore = (reviews = []) => {
  const ratings = {
    ratings_per_rating: [
      {rating: 1, total: 0 },
      {rating: 2, total: 0 },
      {rating: 3, total: 0 },
      {rating: 4, total: 0 },
      {rating: 5, total: 0 },
      {rating: 6, total: 0 },
      {rating: 7, total: 0 },
      {rating: 8, total: 0 },
      {rating: 9, total: 0 },
      {rating: 10, total: 0 },
      ],
    total_ratings: 0
  }

  if (Array.isArray(reviews) && reviews.length > 0) {
     for (let review of reviews) {
      if (review.author_details.rating === null) continue;

      const author_ratings = review?.author_details?.rating || 0;
      
      if (author_ratings <= 10 && author_ratings >= 1) {
        ratings.ratings_per_rating[Math.floor(author_ratings) - 1].total += 1;
        ratings.total_ratings += 1;
      }
    } 
  }

  return ratings;
}

export const getApiEndpoint = ({
  type = 'all',
  page_result = 1,
  filter
}) => {
  const {debounce_text = '', filter_data = {}} = filter || {};

  const data_type = filter_data.show_type || type;
  const target_types = data_type === 'all'
  ? ['movie', 'tv']
  : [data_type];

  return (
    target_types.map((type) => {
      let link = '';
      const query_param = new URLSearchParams({
        page: page_result
      });

      if (debounce_text.trim() !== '') {
        link += `/search/${type}`
        query_param.append('query', debounce_text)
      }
      else if (type === 'person') {
        link += `/${type}/popular`
      }
      else {
        link += `/discover/${type}`

        if (filter) {
          const list_type = filter_data.list_type;

          if(list_type && LIST_TYPE_QUERY_PARAM[list_type]) {
            const list_type_config = LIST_TYPE_QUERY_PARAM[list_type][type];
            const date_today = getTodayDate();

            if (list_type === 'unreleased') {
              query_param.append('primary.release._date.gte', date_today)
            }

            query_param.append('sort_by', list_type_config)
          }

          const selected_genre = filter_data.genre;
          if (selected_genre) {
            query_param.append('with_genres', selected_genre[type]);
          }
        }
      }
      
      return {
        title: type,
        url: `${BASE_URL}${link}?${query_param}`,
        type: type
      }
    })
  )
}