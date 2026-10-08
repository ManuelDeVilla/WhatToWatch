import React from 'react'
import styles from '../../css/Message.module.css';
import { ICONS } from '../../utils/variables';

export default function Message({message, hide}) {
  const {message: messageValue, type} = message;
  const Icon = ICONS?.[type] || null;

  return (
    <div className={`${styles.messageContainer} ${hide ? styles.hide : ''}`}>
      { Icon && <Icon /> }
      <p>{messageValue}</p>
    </div>
  )
}
