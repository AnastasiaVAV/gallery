import styles from './Skeleton.module.css'

const Skeleton = ({
  type = 'image', // image | text
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`${styles.skeleton} ${styles[type]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Skeleton
