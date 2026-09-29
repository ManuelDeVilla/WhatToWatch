import ShowHeroMedia from '../ShowDetailsComponent/ShowHeroMedia.jsx';
import ShowHeroTextOnly from './ShowHeroTextOnly.jsx';
import VideoSection from '../VideoSection.jsx';
import PhotoSection from '../PhotoSection.jsx';
import CreditsSection from '../CreditsSection.jsx';
import TopCastSection from '../TopCastSection.jsx';
import ReviewSection from '../ReviewSection.jsx';
import RelatedIntersSection from '../RelatedInterestSection.jsx';
import StorylineSection from '../StorylineSection.jsx';
import ShowsBatch from '../ShowsBatch.jsx';
import BoxOfficeSection from '../BoxOfficeSection.jsx';
import styles from '../css/ShowDetails.module.css';
import { BASE_URL } from '../config/api.js';
import { useLoaderData } from 'react-router-dom';
import {fetchBatch} from '../utils/tmdb.js';
import { formatHeroTextShow, formatShowData } from '../utils/adapter_functions.js';
import { useContext, useEffect } from 'react';
import { SetFooterCacheContext } from '../lib/contexts/setCacheContext.js';
import footerDataCaching from '../utils/footerDataCaching.js';

export default function Show() {
  // Data Fetching
  const fetched_data = useLoaderData();
  
  // adapter data
  const adapter_data = formatShowData(fetched_data);

  // Video Number without trailer
  const videos = fetched_data?.data?.videos || {};
  const hero_video_key = adapter_data.hero_video?.video_key;
  const video_result = videos?.results.filter(video => video.key !== hero_video_key);

  // Shortcut Data Links
  // Checks whether the data have videos other than hero video
  const all_data = adapter_data.all_data.data || {}
  const recommended_shows_data = all_data?.recommended_shows?.results || [];
  const popular_shows_data = all_data?.popular?.results || [];
  const show_data = all_data?.show_data || {};

  // Data counts
  const video_count = video_result.length > 0;
  const review_count = all_data?.reviews?.results;

  // For Footer caching
  const cacheSetter = useContext(SetFooterCacheContext);
  useEffect(() => {
    footerDataCaching(show_data, fetched_data.type, cacheSetter)
  }, [fetched_data])
  
  return (
    <div className={ styles.showContainer }>
      {
        hero_video_key ?
        (
          <ShowHeroMedia
            adapter_data={adapter_data}
          />
        ) : (
          <ShowHeroTextOnly
            adapter_data={adapter_data}
          />
        )
      }
      {
        video_count &&
        <VideoSection
          videos={fetched_data.data.videos}
        />
      }
      {
        adapter_data?.photo_count > 0 &&
        <PhotoSection
          photos={fetched_data?.data?.photos}
          type={all_data.type}
        />
      }
      {/* <CreditsSection /> */}
      <TopCastSection
        adapter_data={adapter_data}
      />
      <ReviewSection
        adapter_data={adapter_data}
      />
      <ShowsBatch
        headerTitle={'More Like This'}
        data={recommended_shows_data}
      />
      <StorylineSection
        adapter_data={adapter_data}
      />
      <ShowsBatch
        headerTitle={`Popular ${fetched_data.type.toUpperCase()}${fetched_data.type ===  'tv'
          ? 'Series'
          : ''}`}
        data={popular_shows_data}
        type={fetched_data.type}
      />
      {
        fetched_data.type === 'movie' &&
          <BoxOfficeSection
            show_data={show_data}
          />
      }
      <RelatedIntersSection
        genres={show_data.genres}
      />
    </div>
  )
}

export const showDetailsLoader = async ({ params }) => {
  const {type, id} = params;
  const ratings_endpoint = type ==='movie'
  ? 'release_dates'
  : 'content_ratings';

  const fetch_data = [
    {
      title: 'show_data',
      url: `${BASE_URL}/${type}/${id}`,
    },
    {
      title: 'videos', 
      url: `${BASE_URL}/${type}/${id}/videos`
    },
    {
      title: 'photos', 
      url: `${BASE_URL}/${type}/${id}/images`
    },
    {
      title: 'reviews', 
      url: `${BASE_URL}/${type}/${id}/reviews`
    },
    {
      title: 'keywords', 
      url: `${BASE_URL}/${type}/${id}/keywords`
    },
    {
      title: 'credits',
      url: `${BASE_URL}/${type}/${id}/credits`
    },
    {
      title: 'recommended_shows',
      url: `${BASE_URL}/${type}/${id}/recommendations`,
      type: type
    },
    {
      title: 'popular',
      url: `${BASE_URL}/${type}/popular`,
      type: type
    },
    {
      title: 'rating',
      url: `${BASE_URL}/${type}/${id}/${ratings_endpoint}`
    }
  ];

  const fetched_data = await Promise.all([
    fetchBatch(fetch_data)
  ]).catch((err) => console.error(err));
  const data = fetched_data?.[0];
  
  return {type, data};
} 