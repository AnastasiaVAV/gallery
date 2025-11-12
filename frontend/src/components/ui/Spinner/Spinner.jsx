import styles from './Spinner.module.css'

const Spinner = ({ className = '' }) => {
  return (
    <div className={`${styles.loadingSpinner} ${className}`}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Spinner
