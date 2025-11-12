import { useState } from 'react'
import { ModalContext } from '@contexts'

const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: null,
  })

  const openModal = (content) => {
    setModalState({
      isOpen: true,
      content,
    })
  }

  const closeModal = () => {
    setModalState({
      isOpen: false,
      content: null,
    })
  }

  const value = {
    isOpen: modalState.isOpen,
    content: modalState.content,
    openModal,
    closeModal,
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
