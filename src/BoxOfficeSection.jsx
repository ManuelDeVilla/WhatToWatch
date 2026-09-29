import React from 'react';
import SectionHeader from './SectionHeader';
import styles from './css/BoxOffice.module.css';

export default function BoxOfficeSection({show_data}) {
  const budget = show_data.budget.toLocaleString() || 'N/A';
  const revenue = show_data.revenue.toLocaleString() || 'N/A';
  return (
    <div className='container'>
      <SectionHeader title={'Box Office'} />

      <div className={ styles.gridContainer}>
        <div className={ styles.gridItems }>
          <span className={ styles.textHeader}>Budget</span>
          <span>{`$${budget} ${budget ? '(estimated)' : ''}`}</span>
        </div>

        <div className={ styles.gridItems }>
          <span className={ styles.textHeader}>Revenue</span>
          <span>{`$${revenue}`}</span>
        </div>
      </div>
    </div>
  )
}
