import { useEffect, useCallback } from 'react'
import Portal from './modalPortal'
import { useModalState } from '@hooks'
import styles from './Modal.module.css'

const Modal = ({ children }) => {
  const { closeModal } = useModalState()

  const handleEscKey = useCallback((e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }, [closeModal])

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [handleEscKey])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <Portal>
      <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
        <div className={styles.modal}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
