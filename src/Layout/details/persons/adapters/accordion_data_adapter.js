export function accordionDataAdapter(data) {
  const show_data = {
    upcoming: [],
    released: []
  }

  function checkDate(val) {
    const release_date = val?.release_date || val?.first_air_date;
    const release_date_ms = new Date(release_date);
    const date_now_ms = Date.now();

    if (release_date_ms > date_now_ms) {
      show_data.upcoming.push(val);
    } else {
      show_data.released.push(val);
    }
  }

  if (Array.isArray(data)) {
    data.forEach(val => {
      checkDate(val)
    }, {})
  } else {
    Object.entries(data).forEach(val => {
      checkDate(val[1])
    })
  }

  return show_data;
}