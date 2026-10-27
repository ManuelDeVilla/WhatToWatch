export default function adapter(data) {
  let adapterData = getPopularShows(data);

  if (adapterData.length === 0) {
    adapterData = getTopRatedShows(data);
  }

  return adapterData
}

function getPopularShows(data) {
  const allPopularMovies = data?.movies?.movies_data?.["Popular Movies"];
  const allPopularSeries = data?.series?.series_data?.["Popular TV Series"];

  const topPopularMovies = allPopularMovies?.results?.slice(0, 5);
  const topPopularSeries = allPopularSeries?.results?.slice(0, 5);

  const sortedShows = [...topPopularMovies, ...topPopularSeries]
  .sort((a, b) => b.popularity - a.popularity);

  return sortedShows
}

function getTopRatedShows(data) {
  const allTopRatedMovies = data?.movies?.movies_data?.["Top Rated Movies"];
  const allTopRatedSeries = data?.series?.series_data?.["Top Rated Series"];

  const topRatedMovies = allTopRatedMovies?.results.slice(0, 5);
  const topRatedSeries = allTopRatedSeries?.results.slice(0, 5);

  const sortedShows = [...topRatedMovies, ...topRatedSeries]
  .sort((a, b) => b.popularity - a.popularity);

  return sortedShows
}