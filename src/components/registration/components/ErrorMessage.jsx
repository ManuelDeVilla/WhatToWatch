import styles from '../css/Register.module.css'

export default function ErrorMessage({message}) {
  return (
    message && (
      <span className={styles.error}>{message}</span>
    )
  )
}
