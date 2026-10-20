import useCarouselLogic from './custom_hooks/useCarouselLogic';
import styles from './css/ShowsCarousel.module.css';
import PrevIcon from '../../assets/icons/previous.svg?react';
import NextIcon from '../../assets/icons/next.svg?react';
import useResetCarouselMovement from './custom_hooks/useResetCarouselMovement';
import adapter from './js/adapter';
import { BASE_BACKDROP_PATH } from '../../config/api';

export default function Shows({data}) {
  const {trackElement, moveCarousel} = useCarouselLogic();
  const carouselBtnHandler = useResetCarouselMovement(moveCarousel);

  const adapterData = adapter(data);

  return (
    <div className={ styles.showsCarouselContainer}>
      <>
        <button onClick={() => carouselBtnHandler('left')} className={ `${styles.button} ${styles.prev}` }><PrevIcon /></button>
        <button onClick={() => carouselBtnHandler('right')} className={ `${styles.button} ${styles.next}` }><NextIcon /></button>
      </>
      <div ref={trackElement} className={ styles.track }>
        {
          adapterData.map(data => {
            const showTypeDetail = data.type === 'movie'
            ? {
              type: "Movie",
              title: data.title
            }
            : {
              type: "TV Series",
              title: data.name
            };

            return (
              <div key={showTypeDetail.title} className={styles.show}>
                <img src={ `${BASE_BACKDROP_PATH}/${data.backdrop_path}` } alt="" />
                <div className={styles.showInfo}>
                  <div className={styles.showTypeContainer}>
                    <span>Trending Now</span>
                    <span>{showTypeDetail.type}</span>
                  </div>

                  <h1 className={styles.header}>{showTypeDetail.title}</h1>
                  <p className={styles.body}>{data.overview}</p>

                  <button>Add to Watch List</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
    