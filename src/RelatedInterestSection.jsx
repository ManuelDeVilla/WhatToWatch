import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader.jsx';
import CarouselButtons from './CarouselButtons.jsx';
import useCarouselLogic from './useCarouselLogic.jsx';
import styles from './css/RelatedInterest.module.css';

export default function RelatedInterestSection({genres}) {
  
  return (
    <div className='container'>
      <SectionHeader title={'Related Interest'} />
      <div className={ styles.interests}>
        {
          genres.map(genre => (
            <Link key={genre.name} to={'/'}>{genre.name}</Link>
          ))
        }
      </div>
    </div>
  )
}
