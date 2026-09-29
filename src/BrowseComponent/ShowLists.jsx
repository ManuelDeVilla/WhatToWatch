import { useEffect, useRef, useState } from 'react';
import useLazyLoadingShows from '../useLazyLoadingShows.jsx';
import { fetchBatch, getApiEndpoint } from '../utils/tmdb.js';
import { useLoaderData, useParams } from 'react-router-dom';
import { formatShowList } from '../utils/adapter_functions.js';
import useDebounce from '../useDebounce.jsx';
import ListHeader from './ListHeader.jsx';
import ListBody from './ListBody.jsx';
import { GENRE_MAP } from '../utils/variables.js';
import useFilterSearch from './useFilterSearch.jsx';

const GENRE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'animation', label: 'Animation' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'crime', label: 'Crime' },
];

const LIST_TYPE = [
  {value: 'newest', label: 'Newest'},
  {value: 'popular', label: 'Popular'},
  {value: 'top_rated', label: 'Top Rated'},
  {value: 'unreleased', label: 'Coming Soon'},
];

const SHOW_TYPE = [
  {value: 'all', label: 'Movies and Series'},
  {value: 'movie', label: 'Movie'},
  {value: 'tv', label: 'TV Series'}
];

export default function ShowLists() {
  // Datas
  const fetched_data = useLoaderData();
  const [current_data, setCurrentData] = useState(formatShowList(fetched_data))
  const result = current_data?.result || [];

  const {
    handlers = {},
    filter_search_data = {}
  } = useFilterSearch(
    {
      formatted_data: {
        current_data,
        setCurrentData
      },
      passed_type: current_data.type
    });
  const {handleFilterChange, handleSearchChange} = handlers
  const {filter_data, debounce_text} = filter_search_data;

  const { element, isLoading } = useLazyLoadingShows(
    {
      current_data: {
        type: current_data.type,
        setCurrentData
      },
      filter: {
        filter_data,
        debounce_text
      }
    });

  return (
    <div className='container'>
      <ListHeader
        stateSetters={{
          handleFilterChange,
          handleSearchChange
        }}
        data={{
          GENRE_OPTIONS,
          LIST_TYPE,
          SHOW_TYPE,
          type: current_data.type
        }}
        filter_data={filter_data}
      />

      <ListBody
        result={result}
        type={fetched_data.type}
        loading={{
          element,
          isLoading
        }}
      />
    </div>
  )
}

export const showListLoader = async ({params}) => {
  // If the type is all then give all trending
  // console.log(params)
  const type = params.type
  const formatted_type = type === 'all'
    ? ['movie', 'tv']
    : params.type;

  const fetch_data = getApiEndpoint({
    type,
    page_result: 1
  })

  const fetched_data = await Promise.all([
    fetchBatch(fetch_data)
  ]);
  const data = fetched_data[0];

  return {data, type: formatted_type};
}