import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/CastLists.module.css';
import NextIcon from './assets/icons/next.svg?react';

export default function CastLists({casts, heroSection}) {

  return (
    <div className={ styles.castsContainer }>
      <div className={ styles.casts }>
        <span className={ styles.castHeader }>Director</span>
        <ul className={ styles.castList }>
          {
            casts?.length !== 0 
            ? (
              casts?.map(cast => (
                <React.Fragment key={cast.name}>
                  <li>&sdot;</li>
                  <li>
                    <Link to={'/'}>{ cast.name }</Link>
                  </li>
                </React.Fragment>
              ))
            )
            : (
              <>
                <li>&sdot;</li>
                <li>Unknown</li>
              </>
            )
          }
        </ul>
      </div>
      {
        !heroSection ?
        (
          <a href='/' className={ `${styles.casts} ${ styles.castLink }` }>
            <span className={ styles.castHeader }>All Casts & Crews</span>
            <NextIcon />
          </a>
        ) : null
      }
    </div>
  )
}
