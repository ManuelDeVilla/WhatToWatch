import React from 'react';
import styles from './css/LoadingShow.module.css';

export default function LoadingShow() {
  return (
    <div className={ styles.loadingContainer}>
      <div className={ styles.skeletonImg }></div>
      <div className={ styles.skeletonTextContainer }>
        <div className={ `${styles.skeletonLine} ${styles.title}` }></div>
        <div className={ `${styles.skeletonLine} ${styles.info}`  }></div>
      </div>
    </div>
  )
}
