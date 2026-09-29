import React from 'react'

export default function CarouselButtons({ moveCarousel, isOverflowing}) {
  return (
    <>
      { isOverflowing && (
        <>
          <button onClick={() => moveCarousel('left')} className={ `${'prev'} ${'button'}` }>prev</button>
          <button onClick={() => moveCarousel('right')} className={ `${'next'} ${'button'}` }>next</button>
        </>
      )}
    </>
  )
}
