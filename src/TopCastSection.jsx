import SectionHeader from './SectionHeader.jsx';
import styles from './css/TopCastSection.module.css';
import dummyPhoto from './assets/images/user.png';
import CastLists from './CastLists.jsx';
import { BASE_POSTER_PATH } from './config/api.js';
import { Link } from 'react-router-dom';

export default function TopCastSection({adapter_data}) {
  const credits_data = adapter_data?.all_data?.data?.credits || {};
  const acting_casts = credits_data.cast?.filter(cast => cast.known_for_department === 'Acting') || [];
  const rendered_casts = acting_casts.length > 16 ? acting_casts.slice(0, 16) :
                                                    acting_casts.slice(0, acting_casts.length);

  return (
    <div className="container">
      <SectionHeader title={'Top Cast'} />

      <div className={ styles.castGrid }>
        {
          rendered_casts.map((cast) => (
            <div key={cast.character} className={ styles.item }>
              <img
                src={
                  !cast?.profile_path
                  ? dummyPhoto
                  : `${BASE_POSTER_PATH}${cast.profile_path}` 
                } 
                alt={`${cast.original_name} image`}
              />
              <div className={ styles.castNamesContainer }>
                <Link to={'/'}>{ cast.original_name}</Link>
                <span>{ cast.character }</span>
              </div>
            </div>
          ))
        }
      </div>

      <CastLists heroSection={false} />
    </div>
  )
}
