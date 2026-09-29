import React, { useRef } from 'react'
import styles from './css/Accordion.module.css';
import UpIcon from './assets/icons/up.svg?react';
import StarIcon from './assets/icons/star.svg?react';
import dummyPhoto from './assets/images/hoyeon4.jpg';
import { Link } from 'react-router-dom';
import { BASE_POSTER_PATH } from './config/api';

export default function Accordion({accordion, data}) {
  const {
    accordionIndex,
    expandAccordion,
    setExpandAccordion
  } = accordion;
  const {header, accordionData} = data;
  const accordionContainer = useRef(null);

  const setAccordion = () => {
    const accordionId = accordionContainer.current.id;
    setExpandAccordion((data) => ({...data, [accordionId]: !data[accordionId]}));
  }

  return (
    <div ref={accordionContainer} id={accordionIndex} className={ styles.accordionContainer}>
      <div onClick={setAccordion} className={ styles.accordionButton }>
        <div className={ styles.textButton }>
          <span>{header}</span>
          <span>&#183;</span>
          <span>{accordionData.length}</span>
        </div>
        <UpIcon />
      </div>

      <div className={`
        ${styles.accordionGridContainer}
        ${expandAccordion[accordionIndex]
          ? styles.open
          : ''}
      `}>
        <div className={ styles.accordionContent }>
          {
            accordionData.map(data => {
              const poster_path = data?.poster_path
              ? `${BASE_POSTER_PATH}/${data.poster_path || data.profile_path}`
              : dummyPhoto;
              const show_type = data?.title
              ? "Movie"
              : "TV Series"
              const role = data?.character || data?.job || "No data yet";
              const released_year = new Date(data?.first_air_date || data?.release_date).getFullYear();
              const link = show_type === "Movie"
              ? `/movie/${data.id}`
              : `/tv/${data.id}`

              return (
                <Link to={link} className={ styles.item } key={data.id}>
                  <img src={ poster_path } alt={data?.name || data?.title} />
                  <div className={ styles.itemTextContainer }>
                    <span className={ styles.showTitle }>{data?.name || data?.title}</span>
                    <div className={ styles.itemDetails }>
                      <div className={ styles.rating}>
                        <StarIcon />
                        <span className={ styles.bodyText }>{data.vote_average}</span>
                      </div>
                      <span className={ styles.bodyText }>{show_type}</span>
                    </div>
                    <ul className={ styles.itemLists }>
                      {
                        Array.isArray(role) ? (
                          role.map(data => (
                            <React.Fragment key={data}>
                              <li className={ styles.bodyText }>&#183;</li>
                              <li className={ styles.bodyText }>{data}</li>
                            </React.Fragment>
                          ))
                        ) : 
                        (
                          <>
                            <li className={ styles.bodyText }>&#183;</li>
                            <li className={ styles.bodyText }>{role}</li>
                          </>
                        )
                      }
                    </ul>
                  </div>
                  <div className={ styles.statusContainer }>
                    <span className={ styles.bodyText }>{released_year || ""}</span>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
