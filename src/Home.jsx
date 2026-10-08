import ShowsCarousel from './ShowsCarousel.jsx';
import ShowsBatch from './ShowsBatch.jsx';
import styles from './css/Home.module.css';

//Config API Call
import { BASE_URL } from './config/api.js';
import { fetchBatch } from './utils/tmdb.js';
import { useLoaderData } from 'react-router-dom';

export default function Home({setIsBrowserActive}) {
  const data = useLoaderData();

  return (
    <div className={ styles.homeContainer }>
      <div className={ styles.fullWidthCarousel }>
        <ShowsCarousel />
      </div>
      
      {
        !data ? (
          <p>No Data got from the api</p>
        ) : (
          Object.keys(data).map((data_type) => {
            const type_link = data[data_type].type;
            const type_data_type = data[data_type][`${data_type}_data`];
            
            return Object.keys(type_data_type).map((categories) => {
              return (
                <ShowsBatch
                  showsRating={true}
                  headerTitle={categories}
                  data={type_data_type[categories].results}
                  type={type_link}
                />
              )
            })
          })
        )
      }
    </div>
  )
}


export const homeLoader = async () => {

  //Movies
  const movieBatch = [
    {
      title: 'Upcoming Movies',
      url: `${BASE_URL}/movie/upcoming`,
      type: 'movie'
    },
    {
      title: 'Now Playing on Theaters',
      url: `${BASE_URL}/movie/now_playing`,
      type: 'movie'
    },
    {
      title: 'Popular Movies',
      url: `${BASE_URL}/movie/popular`,
      type: 'movie'
    },
    {
      title: 'Top Rated Movies',
      url: `${BASE_URL}/movie/top_rated`,
      type: 'movie'
    }
  ];

  //Series
  const seriesBatch = [
    {
      title: 'Airing Today',
      url: `${BASE_URL}/tv/airing_today`,
      type: 'tv'
    },
    {
      title: 'On The Air',
      url: `${BASE_URL}/tv/on_the_air`,
      type: 'tv'
    },
    {
      title: 'Popular TV Series',
      url: `${BASE_URL}/tv/popular`,
      type: 'tv'
    },
    {
      title: 'Top Rated Series',
      url: `${BASE_URL}/tv/top_rated`,
      type: 'tv'
    }
  ];

  const [movies_data, series_data] = await Promise.all([
    fetchBatch(movieBatch),
    fetchBatch(seriesBatch)
  ]).catch((err) => console.error(err))

  return {
    movies: {movies_data, type: 'movie'},
    series: {series_data, type: 'tv'}
  };
}