import supabase from '../../../lib/api/supabase';
import styles from '../css/Header.module.css';

export default function UserAction({userMenuVisibility}) {
  return (
    <div className={`${styles.userActionTab} ${userMenuVisibility ? styles.active : ''}`}>
      <ul className={styles.userMenu}>
        <li>Profile</li>
        <li>WatchList</li>
        <li onClick={() => supabase.auth.signOut()}>Logout</li>
      </ul>
    </div>
  )
}
