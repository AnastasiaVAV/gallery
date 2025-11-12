import { useContext } from 'react'
import { ModalContext } from '@contexts'

export const useModalState = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

// import { useState } from 'react'

// const useModalState = () => {
//   const [isOpenModal, SetIsOpenModal] = useState(false)

//   const openModal = () => {
//     SetIsOpenModal(true)
//   }

//   const closeModal = () => {
//     SetIsOpenModal(false)
//     console.log(isOpenModal)
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && e.target === e.currentTarget) {
//       openModal()
//     }
//   }

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       SetIsOpenModal(false)
//     }
//   }

//   return { isOpenModal, openModal, closeModal, handleKeyDown, handleBackdropClick }
// }

export default useModalState
