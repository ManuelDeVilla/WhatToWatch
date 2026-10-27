import { Link } from 'react-router-dom'
import SectionHeader from '../../../../components/section_header/SectionHeader.jsx';
import CarouselButtons from '../../../../components/carousel_btns/CarouselButtons.jsx';
import useCarouselLogic from '../../../../lib/custom_hooks/useCarouselLogic.jsx';
import styles from '../css/RelatedInterest.module.css';

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
