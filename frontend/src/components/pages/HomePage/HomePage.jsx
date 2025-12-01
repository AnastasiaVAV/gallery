import galleryBlocks from './galleryBlocks'
import styles from './HomePage.module.css'

const allBlocks = [
  ...Object.keys(galleryBlocks),
  ...Object.keys(galleryBlocks),
]

const SliderElement = ({ el, index }) => {
  const gridArea = index + 1
  return el.type === 'image'
    ? (
        <img loading="lazy" key={index} src={el.src} className={styles.sliderBlockImage} grid-area={gridArea} />
      )
    : (
        <div
          key={index}
          className={`${el.classes} ${styles.sliderBlockDiv} ${el}`}
          grid-area={gridArea}
        >
        </div>
      )
}

const HomePage = () => {
  return (
    <>
      <section className={styles.gallery}>
        <div className={`container ${styles.titleContainer}`}>
          <h1 className={styles.title} data-title="Gallery">
            Gallery
          </h1>
        </div>
        <div className={styles.slider}>
          {allBlocks.map((currentBlock, blockIndex) => {
            return (
              <div
                className={`${styles.sliderBlock} ${styles[`block${currentBlock}`]}`}
                key={`${currentBlock}-${blockIndex}`}
              >
                {galleryBlocks[currentBlock].map((el, index) => (
                  <SliderElement key={index} el={el} index={index}></SliderElement>
                ))}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default HomePage
