import { useModalState } from '@hooks'
import { Modal } from '@ui'

const ModalRoot = () => {
  const { isOpen, content, closeModal } = useModalState()

  if (!isOpen || !content) return null

  return (
    <Modal onClick={closeModal}>
      {content}
    </Modal>
  )
}

export default ModalRoot
