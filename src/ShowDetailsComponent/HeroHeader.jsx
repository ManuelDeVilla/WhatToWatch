import styles from '../css/ShowsHeroMedia.module.css';
import StarIcon from '../assets/icons/star.svg?react';
import UnfilledStarIcon from '../assets/icons/unfilledStar.svg?react';
import { Link } from 'react-router-dom';

export default function HeroHeader({adapter_data}) {
  const name = adapter_data?.name || '[Name Unavailable]';
  const type = adapter_data?.type || null;

  let subtitle_one = '';
  let subtitle_two = '';
  let subtitle_three = '';

  if (type === 'person') {
    subtitle_one = adapter_data?.birth_year || null;
    subtitle_two = adapter_data?.known_for_department || null;
    subtitle_three = adapter_data?.age || null;
  } else {
    subtitle_one = adapter_data?.year_released || null;
    subtitle_two = adapter_data?.rating || null;
    subtitle_three = adapter_data?.runtime || null;
  }

  const vote_average = adapter_data?.vote_average || 0;
  const vote_count = adapter_data?.vote_count || 0;

  return (
    <section className={ styles.showHeader }>
      <div className={ styles.headerDetailsContainer }>
        <h1>{name}</h1>
        <div className={ styles.headerDetails }>
          <Link to={'/'}>{ subtitle_one }</Link>
          <span>&#8901;</span>
          <span>{ subtitle_two }</span>
          <span>&#8901;</span>
          <span>{ subtitle_three }</span>
        </div>
      </div>
      
      {
        adapter_data?.type !== 'person' &&
        (
          <div className={ styles.headerRatingContainer }>
            <div className={ styles.headerRating }>
              <span className={ styles.headerText }>TMDB RATING</span>
              <a href="/" className={ styles.ratingLink }>
                <div className={ styles.ratingIcon }>
                  <StarIcon />
                </div>
                <div className={ styles.ratingTextContainer }>
                  <div className={ styles.ratingText }>
                    <span className={ styles.currentRating }>{ vote_average }</span>
                    <span> /10</span>
                  </div>
                  <span className={ styles.rating }>{ vote_count || 'N/A' }</span>
                </div>
              </a>
            </div>
            <div className={ styles.headerRating }>
              <span className={ styles.headerText }>Your Rating</span>
              <button className={ styles.rateButton }>
                <UnfilledStarIcon />
                <span>Rate</span>
              </button>
            </div>
          </div>
        )
      }
    </section>
  )
}
