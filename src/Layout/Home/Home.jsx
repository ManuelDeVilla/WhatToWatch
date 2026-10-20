import ShowsCarousel from '../../components/ShowsCarousel/ShowsCarousel.jsx';
import ShowsBatch from '../../ShowsBatch.jsx';
import styles from './css/Home.module.css';

//Config API Call
import { BASE_URL } from '../../config/api.js';
import { fetchBatch } from '../../utils/tmdb.js';
import { useLoaderData } from 'react-router-dom';

export default function Home() {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className={ styles.homeContainer }>
      <div className={ styles.fullWidthCarousel }>
        <ShowsCarousel
          data={data}
        />
      </div>
      
      {
        !data ? (
          <p>No Data got from the api</p>
        ) : (
          Object.keys(data).map((dataType) => {
            const showType = data[dataType].type;
            const dataShowList = data[dataType][`${dataType}_data`];
            
            return Object.keys(dataShowList).map((categories) => {
              return (
                <ShowsBatch
                  key={categories}
                  showsRating={true}
                  headerTitle={categories}
                  data={dataShowList[categories].results}
                  type={showType}
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

  // To get Upcoming Movies
  // Reason: upcoming endpoint returns the movie that are going to be released
  // However the main problem is that there is only released_date no primary_release_date
  // Which may confuse the user, as they can only see it as, had already released.
  const date = new Date(Date.now())

  const futureDayTimestamp = new Date();
  futureDayTimestamp.setDate(date.getDate() + 1);
  const futureDay = futureDayTimestamp.toISOString().split('T')[0];

  const futureMonthTimestamp = new Date(futureDayTimestamp);
  futureMonthTimestamp.setMonth(date.getMonth() + 1);
  const futureMonth = futureMonthTimestamp.toISOString().split('T')[0];

  const upcomingMoviesQueryParam = `primary_release_date.gte=${futureDay}&primary_release_date.lte=${futureMonth}&sort_by=popularity.desc`;

  //Movies
  const movieBatch = [
    {
      title: 'Upcoming Movies',
      url: `${BASE_URL}/discover/movie?${upcomingMoviesQueryParam}`,
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