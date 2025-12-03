export const preloadGalleryBlocks = (blocks) => {
  const urls = []

  Object.values(blocks).forEach((blockArray) => {
    blockArray.forEach((item) => {
      if (item.type === 'image') {
        urls.push(item.src)
      }
    })
  })

  const loadImage = src =>
    new Promise((resolve) => {
      const img = new Image()
      img.src = src
      img.onload = resolve
      img.onerror = resolve
    })

  return Promise.all(urls.map(loadImage))
}

export default preloadGalleryBlocks
