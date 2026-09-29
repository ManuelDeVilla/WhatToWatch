import ShowsBatch from './ShowsBatch';
import styles from './css/Footer.module.css';
import { useEffect } from 'react';
import footerDataCaching from './utils/footerDataCaching.js';

export default function Footer({cache}) {

  // For Footer caching
  const {footerCachedData, setFooterCachedData} = cache;
  useEffect(() => {
    footerDataCaching({}, "", setFooterCachedData)
  }, [])

  console.log(footerCachedData);

  return (
    <div className={ styles.footerContainer }>
      <div className={ styles.footerHeader }>
        <span className={ styles.headerText }>Recently Viewed</span>
        <button>Clear</button>
      </div>
      
      <ShowsBatch
        data={footerCachedData}
        showRatings={false}
        debugLabel={"footer"}
      />

      <div className={ styles.containerFooter }>
        <p>This site uses the TMDB API but is not endorsed, certified, or otherwise approved by TMDB.</p>
        <p>Want to contribute? Join the community by visiting <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database</a>.</p>
      </div>
    </div>
  )
}
