import { useState } from 'react';
import useLazyLoadingShows from '../../lib/custom_hooks/useLazyLoadingShows.jsx';
import { fetchBatch, getApiEndpoint } from '../../utils/tmdb.js';
import { useLoaderData } from 'react-router-dom';
import { formatShowList } from '../../utils/adapter_functions.js';
import ListHeader from './components/ListHeader.jsx';
import ListBody from './components/ListBody.jsx';
import useFilterSearch from './custom_hooks/useFilterSearch.jsx';

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
        type={current_data.type}
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