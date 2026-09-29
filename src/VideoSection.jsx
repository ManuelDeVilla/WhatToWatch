import { Link  } from 'react-router-dom';
import SectionHeader from './SectionHeader.jsx';
import styles from './css/VideoSection.module.css';
import { createVideoLink, getVideo } from './utils/tmdb.js';

export default function Videos({videos}) {
  const videoResult = videos?.results || [];
  const maxVideo = Math.min(videoResult.length, 6);

  const selectedVideos = getVideo(videoResult, maxVideo);

  const videosLink = createVideoLink(selectedVideos);
  const [heroVideo, ...otherVideos] = videosLink || [];

  return (
    <div className={ `${'container'}` }>
      <SectionHeader title={"Videos"} />
      
      <div className={ styles.videoGrid }>
        {
          heroVideo && (
            <Link to={'/'} className={ `${styles.item} ${styles.heroTwo}` } style={{gridArea: 'box-1'}}>
              <div className={ styles.videoContainer }>
                <iframe
                width={'100%'}
                height={'100%'}
                src={ heroVideo?.link }
                title={'Trailer'}
                frameBorder={0}></iframe>
              </div>
              <span>{heroVideo?.data.name}</span>
            </Link>
          ) 
        }
        
        <div className={ styles.track }>
          {
            otherVideos && (
              otherVideos.map((data, index) => (
                <Link key={index} to={'/'} className={ `${styles.item} ${styles.heroTwo}` } style={{gridArea: `box-${index + 2}`}}>
                  <div className={ styles.videoContainer }>
                    <iframe
                    width={'100%'}
                    height={'100%'}
                    src={ data?.link }
                    title={'Trailer'}
                    frameBorder={0}></iframe>
                  </div>
                  <span>{data?.data?.name}</span>
                </Link>
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}
