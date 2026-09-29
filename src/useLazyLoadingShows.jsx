import { useRef, useState, useEffect } from 'react'
import { fetchBatch, getApiEndpoint } from './utils/tmdb';
import { formatShowList } from './utils/adapter_functions';

export default function useLazyLoadingShows({current_data, filter}) {
  const element = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  const {type, setCurrentData} = current_data;
  const {debouce_text, filter_data} = filter;
  const {genre, list_type, show_type} = filter_data;

  useEffect(() => {
    if (!element.current) return;

    const observer = new IntersectionObserver(async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setIsLoading(true);

          page.current += 1;

          const endpoints = getApiEndpoint({
            type,
            page_result: page.current,
            filter
          });

          const [fetch_data] = await Promise.all([
            fetchBatch(endpoints)
          ]);
          
          const cleaned_data = formatShowList({data: fetch_data, type: type})

          setCurrentData((old_data) => (
            {
              ...old_data,
              result: [
                ...old_data?.result || [],
                ...cleaned_data?.result || []
              ]
            }));
          setIsLoading(false);
        }
      }
    }, {
      threshold: [0.95]
    })

    observer.observe(element.current);
    return () => observer.disconnect()
  }, [
    type,
    genre,
    list_type,
    show_type,
    debouce_text
  ]);

  return { element, isLoading }
}
