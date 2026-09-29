import { useRef } from 'react';
import useCarouselLogic from './useCarouselLogic';
import styles from './css/ShowsCarousel.module.css';
import dummyPoster from './assets/images/dummy_poster.jpg';
import dummyPoster1 from './assets/images/dummy_poster2.jpg';
import dummyPoster2 from './assets/images/dummy8.jpg';
import PrevIcon from './assets/icons/previous.svg?react';
import NextIcon from './assets/icons/next.svg?react';

export default function Shows({isInShow}) {
  const {trackElement, moveCarousel} = useCarouselLogic();

  return (
    <div className={ styles.showsCarouselContainer}>
      <>
        <button onClick={() => moveCarousel('left')} className={ `${styles.button} ${styles.prev}` }><PrevIcon /></button>
        <button onClick={() => moveCarousel('right')} className={ `${styles.button} ${styles.next}` }><NextIcon /></button>
      </>
      <div ref={trackElement} className={ styles.track }>
        <img src={ dummyPoster } alt="" />
        <img src={ dummyPoster1 } alt="" />
        <img src={ dummyPoster2 } alt="" />
      </div>
    </div>
  )
}
    