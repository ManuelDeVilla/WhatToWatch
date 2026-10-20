import { useCallback, useEffect, useRef } from 'react'

export default function useResetCarouselMovement(moveCarousel) {
  const carouselIntervalId = useRef(null);

  // Create Interval for the carousel to move the movie right every x seconds.
  const startMoveCarousel = useCallback(() => {
    clearInterval(carouselIntervalId.current);

    carouselIntervalId.current = setInterval(() => {
      moveCarousel('right');
    }, 6000)
  }, [moveCarousel]);

  // Executes the creation of the Interval.
  useEffect(() => {
    startMoveCarousel();

    return () => clearInterval(carouselIntervalId.current);
  }, [startMoveCarousel]);

  const carouselBtnHandler = (direction) => {
    moveCarousel(direction);

    // Resets the interval movement of the carousel.
    startMoveCarousel();
  }

  return carouselBtnHandler;
}
