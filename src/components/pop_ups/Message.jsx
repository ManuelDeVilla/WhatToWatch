import React from 'react'
import styles from '../../css/Message.module.css';
import { ICONS } from '../../utils/variables';

export default function Message({
  type: iconType,
  message,
  hide
}) {
  const Icon = ICONS?.[iconType] || null;

  return (
    <div className={`${styles.messageContainer} ${hide ? styles.hide : ''}`}>
      { Icon && <Icon /> }
      <p>{message}</p>
    </div>
  )
}
