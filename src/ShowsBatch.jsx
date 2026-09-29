import SectionHeader from './SectionHeader';
import CarouselButtons from './CarouselButtons';
import useCarouselLogic from './useCarouselLogic';
import styles from './css/ShowsBatch.module.css';
import ShowCard from './ShowCard';

export default function ShowsBatch({headerTitle, data, type, debugLabel}) {
  const {trackElement, moveCarousel, isOverflowing} = useCarouselLogic(data, debugLabel);

  return (
    <div className={ styles.showsBatchContainer}>
      {
        headerTitle && <SectionHeader title={headerTitle} />
      }
      <CarouselButtons isOverflowing={isOverflowing} moveCarousel={moveCarousel} />
      <div ref={trackElement} className={ styles.track }>
        {
          data ? (
            data.map((show) => (
              <ShowCard
                key={show.id}
                data={show}
                showRatings={true}
              />
            ))
          ) : null
        }
      </div>
    </div>
  )
}
