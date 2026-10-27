import CreditsSection from './components/CreditsSection';
import { BASE_URL } from '../../../config/api';
import { fetchBatch } from '../../../utils/tmdb';
import { useLoaderData } from 'react-router-dom';
import { personCreditsAdapter } from './adapters/person_credits_adapter';
import { heroTextPersonAdapter } from './adapters/hero_text_person_adapter';
import ShowHeroTextOnly from '../components/ShowHeroTextOnly';
import PhotoSection from '../components/PhotoSection';
import cacheFooterData from '../../../utils/cacheFooterData';
import { useContext, useEffect } from 'react';
import { SetFooterCacheContext } from '../../../lib/contexts/setCacheContext';

export default function PersonDetails() {
  // Data Fetching
  const fetched_data = useLoaderData();
  const hero_text_adapter = heroTextPersonAdapter(fetched_data);
  const person_credits_adapter = personCreditsAdapter(fetched_data);

  // For Footer caching
  const cacheSetter = useContext(SetFooterCacheContext);
  useEffect(() => {
    cacheFooterData(fetched_data, fetched_data.type, cacheSetter)
  }, [])

  console.log(fetched_data)


  // Images
  const images = fetched_data.data.images;
  const image_length = images.profiles.length
  
  return (
    <div className='container'>
      <ShowHeroTextOnly
        adapter_data={hero_text_adapter}
      />
      {
        image_length > 0 && (
          <PhotoSection
            photos={images}
            type={"person"}
          />
        )
      }
      <CreditsSection adapter_data={person_credits_adapter} />
    </div>
  )
}

export const personDetailsLoader = async ({params}) => {
  const type = 'person';
  const { id } = params

  const data_to_fetch = [
    {
      title: 'person_data',
      url: `${BASE_URL}/person/${id}`
    },
    {
      title: 'movie_credits',
      url: `${BASE_URL}/person/${id}/movie_credits`
    },
    {
      title: 'tv_credits',
      url: `${BASE_URL}/person/${id}/tv_credits`
    },
    {
      title: 'images',
      url: `${BASE_URL}/person/${id}/images`
    }
  ];

  const response_data = await Promise.all([
    fetchBatch(data_to_fetch)
  ]);
  const data = response_data?.[0] || null;

  return {data, type};
}