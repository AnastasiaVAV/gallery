import { useState, useRef, useEffect } from 'react'
import styles from './ImageMagnifier.module.css'

const ImageMagnifier = ({
  src,
  alt,
  zoomLevel = 2.5,
  magnifierSize = 300,
  setIsLoading,
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  const imgRef = useRef(null)
  const rafRef = useRef(null)
  const rectRef = useRef({ top: 0, left: 0, width: 0, height: 0 })

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const controller = new AbortController()
    const { signal } = controller

    const handleEnter = () => {
      const rect = img.getBoundingClientRect()
      rectRef.current = rect
      setShowMagnifier(true)
    }

    const handleLeave = () => {
      setShowMagnifier(false)
    }

    const handleMove = (clientX, clientY) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setCoords({ x: clientX, y: clientY })
      })
    }

    const handlePointerMove = (e) => {
      handleMove(e.clientX, e.clientY)
    }

    img.addEventListener('pointerenter', handleEnter, { passive: true, signal })
    img.addEventListener('pointerleave', handleLeave, { passive: true, signal })
    img.addEventListener('pointermove', handlePointerMove, { passive: true, signal })

    // отключает стандартные жесты браузера на тач-экранах
    img.style.touchAction = 'none'

    return () => {
      controller.abort()
      img.style.touchAction = ''
    }
  }, [])

  const { x, y } = coords
  const { top, left, width, height } = rectRef.current

  const magnifierStyle = showMagnifier
    ? {
        left: `${x - magnifierSize / 2}px`,
        top: `${y - magnifierSize / 2}px`,
        width: `${magnifierSize}px`,
        height: `${magnifierSize}px`,
        backgroundImage: `url('${src}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
        backgroundPosition: `${((x - left) / width) * 100}% ${((y - top) / height) * 100}%`,
      }
    : {}

  return (
    <div className={styles.magnifierContainer}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        className={styles.image}
      />

      {showMagnifier && <div className={styles.magnifier} style={magnifierStyle} />}
    </div>
  )
}

export default ImageMagnifier
