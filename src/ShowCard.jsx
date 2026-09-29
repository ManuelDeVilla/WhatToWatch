import { Link } from 'react-router-dom';
import styles from './css/ShowCard.module.css';
import StarIcon from './assets/icons/star.svg?react';
import { BASE_POSTER_PATH } from './config/api';
import imgPlaceholder from './assets/images/img_placeholder.jpg'

export default function ShowCard({data, showRatings}) {
  const type = data?.type || null;
  const dateReleased = data.release_date || data.first_air_date || data.date;
  const year = dateReleased?.split('-')[0] || "N/A";
  const imageLocation = data?.poster_path || data?.profile_path
  ? `${BASE_POSTER_PATH}${data?.poster_path || data?.profile_path}`
  : imgPlaceholder;

  return (
    <Link to={`/${type}/${data.id}`} className={ styles.items }>
      <img src={`${imageLocation}`} alt={`${data.name || data.title} Poster`} />
      <div className={ styles.textContent }>
        <span className={ styles.title }>{data.name || data.title}</span>
        {
          showRatings && type !== 'person' && 
          (
            <div className={ styles.ratingContainer }>
              <div className={ styles.rating }>
                <StarIcon />
                <span className={ styles.text }>{data.vote_average.toFixed(1)}</span>
              </div>
              <span className={ styles.text }>{year}</span>
              <span className={ styles.text }>{data.name ? 'TV Series' : 'Movie'}</span>
            </div>
          )
        }
      </div>
    </Link>
  )
}
