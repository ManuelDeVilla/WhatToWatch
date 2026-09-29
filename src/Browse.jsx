import styles from './css/Browse.module.css';
import MovieIcon from './assets/movie.svg?react';
import SeriesIcon from './assets/series.svg?react';
import AnimeIcon from './assets/anime.svg?react';
import HistoryIcon from './assets/history.svg?react';
import WatchlistIcon from './assets/watchlist.svg?react';

export default function Browse() {
  return (
    <div className={ styles.browserContainer }>
        <div className={ styles.browserHeader}>
          <span>Browse</span>
        </div>

        <div className={ styles.containerHeader}>
          <span className={ styles.header }>Categories</span>
        </div>
        <div className={ styles.categoriesContainer }>
          <div className={ styles.categories }>
            <div className={ styles.icon }><MovieIcon /></div>
            <span>Movies</span>
          </div>
          <div className={ styles.categories }>
            <div className={ styles.icon }><SeriesIcon /></div>
            <span>Series</span>
          </div>
          <div className={ styles.categories }>
            <div className={ styles.icon }><AnimeIcon /></div>
            <span>Anime</span>
          </div>
        </div>

        <div className={ styles.containerHeader}>
          <span className={ styles.header }>Personal</span>
        </div>
        <div className={ styles.personalContainer}>
          <div className={ styles.personal }>
            <div className="personalIcon"><HistoryIcon /></div>
            <span>History</span>
          </div>
          <div className={ styles.personal }>
            <div className="personalIcon"><WatchlistIcon /></div>
            <span>WatchList</span>
          </div>
        </div>
    </div>
  )
}
