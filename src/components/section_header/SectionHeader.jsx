import React from 'react';
import styles from './css/SectionHeader.module.css';

export default function SectionHeader({title}) {

  return (
    <div className={ styles.sectionHeaderContainer }>
      <div className={ styles.leftBorder }></div>
      <span>{title.toString()}</span>
    </div>
  )
}
