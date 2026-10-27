import { useEffect, useState } from 'react'

export default function useDebounce(value, delay = 400) {
  const [debounce_value, setDebounceValue] = useState(value);

  useEffect(() => {
    if (value.trim() === '') return;

    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay)

    return () => clearTimeout(handler);
  }, [value, delay])

  return debounce_value;
}
