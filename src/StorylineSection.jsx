import React from 'react'
import SectionHeader from './SectionHeader';
import styles from './css/StorylineSection.module.css';
import { Link } from 'react-router-dom';

export default function StorylineSection({adapter_data}) {

  const show_data = adapter_data?.all_data?.data?.show_data || {};
  const genres = show_data?.genres || [];
  return (
    <div className='container'>
      <SectionHeader title={'Storyline'} />
      
      <p className={ styles.storyline }>{ show_data.overview }</p>

      <div className={ styles.genresContainer }>
        <span>Genres</span>
        <ul>
          {
            genres.length > 0 &&
            genres.map(genre => (
              <React.Fragment key={genre.name}>
                <li>&#183;</li>
                <li><Link to="/">{genre.name}</Link></li>
              </React.Fragment>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
