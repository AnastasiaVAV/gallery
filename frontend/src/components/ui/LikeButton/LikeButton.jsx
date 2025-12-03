import { useState, useEffect } from 'react'

import { useAddLikeMutation, useRemoveLikeMutation } from '@api/supabaseApi'
import { useLikes } from '@hooks'
import { Button } from '@ui'
import styles from './LikeButton.module.css'

const likeIcon = (
  <svg
    className={styles.icon}
    // width="25px"
    // height="25px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LikeButton = ({ id, likes }) => {
  const { isLiked, toggleLike } = useLikes(id)
  const [localLikes, setLocalLikes] = useState(Number(likes) || 0)
  const [isLoadingLike, setIsLoadingLike] = useState(false)

  const [addLike] = useAddLikeMutation()
  const [removeLike] = useRemoveLikeMutation()

  useEffect(() => {
    setLocalLikes(Number(likes) || 0)
  }, [likes])


  const handleUpdateLikes = async (e, id) => {
    e.stopPropagation()

    if (isLoadingLike) return
    setIsLoadingLike(true)

    const wasLiked = isLiked
    const previousLikes = localLikes

    try {
      toggleLike(id)
      setLocalLikes(wasLiked ? previousLikes - 1 : previousLikes + 1)
      wasLiked
        ? await removeLike({ artworkId: id, currentLikes: previousLikes })
        : await addLike({ artworkId: id, currentLikes: previousLikes })
    }
    catch (error) {
      console.error('Ошибка при обновлении лайка:', error)
      toggleLike(id)
      setLocalLikes(previousLikes)
    }
    finally {
      setIsLoadingLike(false)
    }
  }

  return (
    <div className={styles.likeButtonContainer}>
      <p className={styles.likesCount}>{localLikes}</p>
      <Button
        type="button"
        onClick={e => handleUpdateLikes(e, id, localLikes)}
        className={`button ${styles.button} ${isLiked ? styles.active : ''}`}
        aria-pressed={isLiked}
        disabled={isLoadingLike}
      >
        {likeIcon}
      </Button>
    </div>
  )
}

export default LikeButton
