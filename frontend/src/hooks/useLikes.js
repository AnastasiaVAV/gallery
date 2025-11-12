const useLikes = (artworkId) => {
  const isLiked = localStorage.getItem(`${artworkId}`)

  const toggleLike = () => {
    if (isLiked) {
      localStorage.removeItem(`${artworkId}`)
    }
    else {
      localStorage.setItem(`${artworkId}`, 'true')
    }
    return !isLiked
  }

  return { isLiked, toggleLike }
}

export default useLikes
