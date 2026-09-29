import { Link } from 'react-router-dom'
import styles from '../css/ShowsHeroMedia.module.css'
import CastLists from '../CastLists';
import dummyPhoto from '../assets/images/img_placeholder.jpg';
import NextIcon from '../assets/icons/next.svg?react';
import PrevIcon from '../assets/icons/previous.svg?react';
import ImageIcon from '../assets/icons/image.svg?react';
import VideoIcon from '../assets/icons/video.svg?react';
import useCarouselLogic from '../useCarouselLogic';
import { BASE_POSTER_PATH, TMDB_LINK } from '../config/api';
import HeroHeader from './HeroHeader';

export default function ShowHeroMedia({adapter_data}) {
  const {
    trackElement,
    moveCarousel,
    isOverflowing,
    displayButtons
  } = useCarouselLogic()
  const show_data = adapter_data?.all_data?.data?.show_data || {};

  // Show Type 
  const type = adapter_data?.all_data?.type || null;

  // Medias
  const poster_path = show_data?.poster_path
  ? `${BASE_POSTER_PATH}/${show_data.poster_path}`
  : dummyPhoto;
  const hero_video = adapter_data?.hero_video?.video_link || '';

  // Show Link
  const show_link = type
  ? `${TMDB_LINK}${type}/${show_data?.id || null}`
  : `${TMDB_LINK}`;

  // Media Count
  const formatted_photo_count = adapter_data.photo_count > 99 ? '99+' : adapter_data.photo_count;
  const formatted_video_count = adapter_data.video_count > 99 ? '99+' : adapter_data.video_count;

  // Genres
  const genres = adapter_data?.all_data?.data?.show_data?.genres || [];

  return (
    <div className={ styles.backgroundContainer }>
      <div className={ styles.showHeroMediaContainer}>
        <HeroHeader
          adapter_data={adapter_data} 
        />

        <section className={ styles.gridContainer }>
          <div className={ styles.items } style={{ gridArea: 'box-1'}}>
            <img className={ styles.poster } src={ `${poster_path}` } alt="" />
          </div>
          <div className={ `${styles.items} ${styles.videoItems}` } style={{ gridArea: 'box-2'}}>
            <iframe
            width={'100%'}
            height={'100%'}
            src={ hero_video?.link }
            title={'Trailer'}
            frameBorder={0}></iframe>
          </div>
          <Link to={'/'} className={ styles.items } style={{ gridArea: 'box-3'}}>
            <div className={ styles.moreMedia }>
              <ImageIcon />
              <span>{ formatted_photo_count } PHOTOS</span>
            </div>
          </Link>
          <Link to={'/'} className={ styles.items } style={{ gridArea: 'box-4'}}>
            <div className={ styles.moreMedia }>
              <VideoIcon />
              <span>{ formatted_video_count } VIDEOS</span>
            </div>
          </Link>
        </section>

        <section className={ styles.showBodyContainer }>
          <div className={ styles.genresContainer}>
            {
              isOverflowing &&
              <>
                {
                  displayButtons.displayPrevButton &&
                  <button onClick={() => {moveCarousel('left')}} className='button previous'><PrevIcon /></button>
                }
                {
                  displayButtons.displayNextButton &&
                  <button onClick={() => {moveCarousel('right')}} className='button next'><NextIcon /></button>
                }
              </>
            }
            <div ref={ trackElement } className={ styles.track }>
              {
                genres.map(genre => (
                  <Link key={genre.name} to={'/'}>{ genre.name }</Link>
                ))
              }
            </div>
          </div>

          <div className={ styles.bodyContainer}>
            <div className={ styles.bodyInfo}>
              <div className={ styles.descContainer }>
                {
                  show_data?.overview?.length === 0
                  ? (
                    <span className={ styles.noDescription }>
                      <span>
                        No description for {name} yet. If you want to edit this details you can go to 
                      </span>
                      <a href={ `${show_link}` }>The Movie Database.</a>
                    </span>
                  ) : (
                    <span>{show_data?.overview}</span>
                  )
                }
              </div>

              <CastLists casts={adapter_data.directors} />
            </div>

            <div className={ styles.interactionContainer}>
              <div className={ styles.statusContainer }>
                <div className={ styles.statusBorder }></div>
                {
                  adapter_data?.is_released &&
                  (
                    <div className={ styles.statusTextContainer }>
                      <span className={ styles.statusHeader }>Coming Soon</span>
                      <span>Releases: {adapter_data?.formatted_release}</span>
                    </div>
                  )
                }
            </div>
              <button>Add To Watchlist</button>
              <button>Marked as Watched</button>
              <div className={ styles.userReviews }>
                <span className={ styles.reviewNumber }>{ adapter_data.review_count }</span>
                <span>User Reviews</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
