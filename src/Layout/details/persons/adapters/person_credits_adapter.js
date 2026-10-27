import { accordionDataAdapter } from "./accordion_data_adapter";

export function personCreditsAdapter(adapter_data) {
  const tv_credits_data = adapter_data?.data?.tv_credits;
  const movie_credits_data = adapter_data?.data?.movie_credits;

  const tv_crew = tv_credits_data?.crew || [];
  const movie_crew = movie_credits_data?.crew || [];

  // Person's movie and tv production data
  const combined_production_data = [...tv_crew, ...movie_crew];
  const formatted_production_jobs = combined_production_data.reduce((acc, curV) => {
    const show_id = curV?.id;
    if (!Object.hasOwn(acc, show_id)) {
      acc[show_id] = {...curV, job: [curV.job]};
    } else {
      acc[show_id].job.push(curV.job)
    }

    return acc
  }, {});
  
  const production_data = accordionDataAdapter(formatted_production_jobs);
  const production_total = production_data.released.length + production_data.upcoming.length

  // Person's acted movie and tv data
  const movie_acted = movie_credits_data?.cast || [];
  const movie_data = accordionDataAdapter(movie_acted);
  const movie_total = movie_data.released.length + movie_data.upcoming.length

  const tv_acted = tv_credits_data?.cast || [];
  const tv_data = accordionDataAdapter(tv_acted);
  const tv_total = tv_data.released.length + tv_data.upcoming.length

  return [
    {
      data: movie_data,
      title: "Movies",
      total: movie_total
    },
    {
      data: tv_data,
      title: "TV Series",
      total: tv_total
    },
    {
      data: production_data,
      title: "Production Credits",
      total: production_total
    }
  ]
};