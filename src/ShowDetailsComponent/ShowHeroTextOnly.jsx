import CastLists from '../CastLists';
import useCarouselLogic from '../useCarouselLogic';
import styles from '../css/ShowsHeroMedia.module.css';
import dummyPhoto from '../assets/images/img_placeholder.jpg';
import NextIcon from '../assets/icons/next.svg?react';
import PrevIcon from '../assets/icons/previous.svg?react';
import HeroHeader from './HeroHeader';
import { BASE_POSTER_PATH, TMDB_LINK } from '../config/api';
import { Link } from 'react-router-dom';
import { formatHeroTextShow } from '../utils/adapter_functions';

export default function ShowHeroTextOnly({adapter_data}) {

  const data = adapter_data?.type === 'person'
  ? adapter_data
  : formatHeroTextShow(adapter_data);

  // Medias
  const poster_path = data?.poster_path || data.profile_path
  ? `${BASE_POSTER_PATH}/${data.poster_path || data.profile_path}`
  : dummyPhoto;

  const {
    trackElement,
    moveCarousel,
    isOverflowing,
    displayButtons
  } = useCarouselLogic();

  return (
    <div className={ styles.backgroundContainer }>
      <div className={ styles.showHeroMediaContainer}>
        <HeroHeader
          adapter_data={data}
        />

        <section className={ styles.heroTextBody }>
          <div className={ data?.type !== 'person'
            ? styles.heroTextInfo
            : styles.heroTextInfoPerson
           }>
            <img src={ poster_path } alt={ data.name } />
            <div className={styles.detailsContainer}>
              <div className={ data?.type !== 'person'
                ? styles.heroTextDetailsContainerShow
                : styles.heroTextDetailsContainerPerson
              }
              >
                {
                  data?.type !== 'person' ?
                  (
                    <>
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
                            data.genres.map(genre => (
                              <Link key={genre.name} to={'/'}>{ genre.name }</Link>
                            ))
                          }
                        </div>
                      </div>
                        <div className={ styles.descContainerShow }>
                        {
                          data?.overview?.length === 0
                          ? (
                            <span className={ styles.noDescription }>
                              <span>
                                No description for {data?.name || null} yet. If you want to edit this details you can go to 
                              </span>
                              <a href={ `${data?.show_link || null}` }>The Movie Database.</a>
                            </span>
                          ) : (
                            <span>{data?.overview}</span>
                          )
                        }
                      </div>
                    </>
                  ) : (
                    <>
                      <h3>Biography</h3>
                      <span>{data?.biography}</span>
                      <div className={ styles.descContainerPerson }>
                        <span>{data?.biography}</span>
                      </div>
                    </>
                  )
                }
                {
                  data?.type !== 'person' &&
                  <CastLists casts={adapter_data.directors} />
                }
              </div>

              {
                data?.type !== 'person' &&
                (
                  <div className={ styles.heroTextInteractionContainer }>
                    <div className={ styles.heroTextStatus }>
                      {
                        adapter_data?.is_released &&
                        (
                          <div className={styles.statusContainer}>
                            <div className={ styles.statusBorder }></div>
                            <div className={ styles.statusTextContainer }>
                              <span className={ styles.statusHeader }>Coming Soon</span>
                              <span>Releases: {adapter_data?.formatted_release || ''}</span>
                            </div>
                          </div>
                        )
                      }
                    <button className={ styles.statusButton }>Add to WatchList</button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
