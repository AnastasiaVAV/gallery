import styles from './Button.module.css'

const Button = ({
  type = 'button',
  variant = 'primary', // primary | secondary
  isActive = false,
  className = '',
  children,
  ...props
}) => {
  const classes = `${styles.button} ${styles[variant]} ${isActive ? styles.active : ''} ${className}`

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
