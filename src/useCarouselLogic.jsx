import { useRef, useState, useEffect } from 'react'

export default function useCarouselLogic(deps = [], debugLabel) {
  const trackElement = useRef(null);
  const [displayPrevButton, setDisplayPrevButton] = useState(false)
  const [displayNextButton, setDisplayNextButton] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)


  // When a data changes, move to the left most part or the starting area
  useEffect(() => {
    if (!trackElement.current) return;

    trackElement.current.scrollTo({
      left: 0,
      behavior: 'auto'
    })
  }, [deps])

  // For resize observer
  // Checks if the component is overflowing
  useEffect(() => {
    if (!trackElement.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target;
        setIsOverflowing(target.scrollWidth > target.clientWidth)
      }
    })

    observer.observe(trackElement.current);
    return () => observer.disconnect();
  }, [deps])

  // For intersection observer
  useEffect(() => {
    if (!trackElement.current) return

    const firstElement = trackElement.current.firstElementChild;
    const lastElement = trackElement.current.lastElementChild;
    if (!firstElement || !lastElement) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target
        if (target === firstElement) {
          setDisplayPrevButton(entry.intersectionRatio < 0.95);
        } else if (target === lastElement) {
          setDisplayNextButton(entry.intersectionRatio < 0.95);
        }
      }
    }, {
      root: trackElement.current,
      threshold: [0, 0.95]
    })

    observer.observe(firstElement);
    observer.observe(lastElement);

    return () => observer.disconnect();
  }, [deps])

  // Carousel Movement
  const moveCarousel = (direction) => {
    if (!trackElement.current) return;
    const clientWidth = trackElement.current.clientWidth;
    const scrollWidth = trackElement.current.scrollWidth;

    if (!displayNextButton && direction === 'right') {
      trackElement.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
      return;
    }

    if (!displayPrevButton && direction === 'left') {
      trackElement.current.scrollTo({
        left: scrollWidth - clientWidth,
        behavior: 'smooth'
      })
      return;
    }

    trackElement.current.scrollBy({
      left: direction === 'right' ? clientWidth : -clientWidth,
      behavior: 'smooth'
    })
  }

  return { 
    trackElement, isOverflowing, moveCarousel,
    displayButtons: {displayPrevButton, displayNextButton}
  }
}
