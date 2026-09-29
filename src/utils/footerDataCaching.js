import image_placeholder from '../assets/images/img_placeholder.jpg';

export default function useFooterDataCaching(adapter_data = {}, type, cacheSetter) {
  const key = 'footer_data';
  const data = type === "person"
  ? adapter_data?.data?.person_data
  : adapter_data;
  let raw_cache_data = cacheData(key, cacheSetter);
  if (Object.keys(adapter_data).length === 0) return;
  const profile_path = data?.profile_path || data?.poster_path || image_placeholder;

  if (hasExistingData(data.id, type, raw_cache_data)) {
    raw_cache_data = rearrangeCacheData(data.id, type, data.name, raw_cache_data)
  } else {
    if (raw_cache_data.length === 10) {
      raw_cache_data.pop();
    }

    const cache_data = {
      id: data.id,
      name: data?.name || data?.title,
      profile_path,
      type,
      vote_average: adapter_data?.vote_average,
      date: adapter_data?.release_date || adapter_data?.first_air_date
    };
    raw_cache_data.unshift(cache_data)
  }

  setCacheData(key, raw_cache_data, cacheSetter)
}

function cacheData(key, cacheSetter) {
  const raw_data = localStorage.getItem(key);
  let data = null;

  if (!raw_data) {
    setCacheData(key, data, cacheSetter);
  }

  try {
    data = JSON.parse(raw_data) || [];
  } catch (e) {
    console.error(e);
    data = [];
    setCacheData(key, data, cacheSetter);
  }

  return data;
}

function setCacheData(key, data, cacheSetter) {
  localStorage.setItem(key, JSON.stringify(data));
  cacheSetter(data)
}

function hasExistingData(id, type, cache_data) {
  const data = cache_data.filter(data => data.id === id && data.type === type)
  return data.length > 0;
}

function rearrangeCacheData(id, type, name, cache_data) {
  const new_cache_data = cache_data.filter(data => data.id !== id && data.name !== name)
  const data = cache_data.find(data => data.id === id && data.type === type);
  new_cache_data.unshift(data);

  return new_cache_data;
}