import { useEffect, useRef, useState } from 'react'
import { GENRE_MAP } from '../utils/variables';
import useDebounce from '../useDebounce';
import { fetchBatch, getApiEndpoint } from '../utils/tmdb';
import { formatShowList } from '../utils/adapter_functions';

export default function useFilterSearch({formatted_data, passed_type}) {
  // Checks if the filter is used as useEffect guard clause
  const isFilterized = useRef(false);

  // For data
  const {current_data, setCurrentData} = formatted_data;

  // States for inputs
  const [filter_data, setFilterData] = useState({
    genre: '',
    list_type: 'popular',
    show_type: passed_type
  });
  
  const handleFilterChange = (input_type, value) => {
    isFilterized.current = true;

    const new_value = input_type === 'genre'
    ? GENRE_MAP[value.value]
    : value.value;

    setFilterData((old_data) => ({...old_data, [input_type]: new_value}));
  }

  const [text_search, setTextSearch] = useState('')
  const debounce_text = useDebounce(text_search);

  const handleSearchChange = (e) => {
    isFilterized.current = true;
    setTextSearch(e.target.value)
  }

  // For Filters
  useEffect(() => {
    if (!isFilterized.current) return;

    const endpoint = getApiEndpoint({
      type: current_data.type,
      page_result: 1,
      filter: {
        filter_data,
        debounce_text
      }
    });

    const fetch_data = async () => {
      const show_type = filter_data.show_type;
      const format_show_type = show_type === 'all'
      ? ['movie', 'tv']
      : show_type;

      const fetched_data = await Promise.all([
        fetchBatch(endpoint)
      ]);
      const data = fetched_data[0];
      const formatted_data = formatShowList(
        {
          data,
          type: format_show_type,
        },
        filter_data.list_type
      );

      setCurrentData(formatted_data);
    }

    fetch_data();

  }, [debounce_text, filter_data])

  return {
    setTextSearch,
    handlers: {
      handleFilterChange,
      handleSearchChange
    },
    filter_search_data: {
      filter_data,
      debounce_text
    }
  }
}
