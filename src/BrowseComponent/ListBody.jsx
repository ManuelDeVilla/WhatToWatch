import styles from '../css/ShowLists.module.css';
import ShowCard from '../ShowCard';
import LoadingShow from '../LoadingShow';

export default function ListBody({result, type, loading}) {
  const {element, isLoading} = loading;

  return (
    <section className={ styles.listBody }>
      <h3>Explore Movies</h3>
      <div className={ styles.showGrid }>
        {
          result?.length > 0 &&
          result.map((data) => {
            
            return (
              <ShowCard
                data={data}
                showRatings={true}
              />
            )
          })
        }
        {
          isLoading &&
          <LoadingShow />
        }
        <div ref={element} className={ styles.tracker }></div>
      </div>
    </section>
  )
}
