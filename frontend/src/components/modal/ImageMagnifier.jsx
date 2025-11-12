// import { useState, useRef } from 'react'
// import styles from './ImageMagnifier.module.css'

// const ImageMagnifier = ({
//   src,
//   alt,
//   zoomLevel = 2.5,
//   isLoading,
//   magnifierSize = 200,
//   onLoad,
//   onError,
// }) => {
//   const [[x, y], setPosition] = useState([0, 0])
//   const [[imgWidth, imgHeight], setSize] = useState([0, 0])
//   const [[imgTop, imgLeft], setPositionImg] = useState([0, 0])
//   const [showMagnifier, setShowMagnifier] = useState(false)

//   const imgRef = useRef(null)
//   const rafRef = useRef(null)

//   const handleMouseEnter = () => {
//     const elem = imgRef.current
//     if (!elem) return
//     const { width, height } = elem.getBoundingClientRect()
//     setSize([width, height])
//     setShowMagnifier(true)
//   }

//   const handleMouseMove = (e) => {
//     // if (isLoading) return
//     if (!imgRef.current) return

//     cancelAnimationFrame(rafRef.current)
//     rafRef.current = requestAnimationFrame(() => {
//       const { top, left } = imgRef.current.getBoundingClientRect()
//       setPositionImg([top, left])
//       const x = e.clientX - left
//       const y = e.clientY - top
//       setPosition([x, y])
//     })
//   }

//   const handleMouseLeave = () => setShowMagnifier(false)
//   // handleMouseMove на DOM элементе с option (3 параметр)
//   return (
//     <div className={styles.magnifierContainer}>
//       <img
//         ref={imgRef}
//         src={src}
//         alt={alt}
//         onMouseEnter={handleMouseEnter}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         onLoad={onLoad}
//         onError={onError}
//         className={styles.image}
//       />

//       {showMagnifier && (
//         <div
//           className={styles.magnifier}
//           style={{
//             left: `${x + imgLeft - magnifierSize / 2}px`,
//             top: `${y + imgTop - magnifierSize / 2}px`,
//             width: `${magnifierSize}px`,
//             height: `${magnifierSize}px`,

//             backgroundImage: `url('${src}')`,
//             backgroundRepeat: 'no-repeat',
//             backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
//             backgroundPosition: `${(x / imgWidth) * 100}% ${(y / imgHeight) * 100}%`,
//           }}
//         />
//       )}
//     </div>
//   )
// }

// export default ImageMagnifier
