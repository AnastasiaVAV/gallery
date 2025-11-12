import img1 from '@assets/images/homePage/1.jpg'
import img3 from '@assets/images/homePage/3.jpg'
import img4 from '@assets/images/homePage/4.jpg'

import img5 from '@assets/images/homePage/5.jpg'
import img6 from '@assets/images/homePage/6.jpg'
import img7 from '@assets/images/homePage/7.jpg'
import img8 from '@assets/images/homePage/8.jpg'
import img9 from '@assets/images/homePage/9.jpg'

import img10 from '@assets/images/homePage/10.jpg'
import img11 from '@assets/images/homePage/11.jpg'

import styles from './HomePage.module.css'

const galleryBlocks = {
  1: [
    { type: 'image', src: img1 },
    { type: 'image', src: img7 },
    { type: 'image', src: img5 },
    { type: 'div', classes: `${styles.bgLightBlue} ${styles.toX} ${styles.alternate}` },
    { type: 'div', classes: `${styles.bgDarkGray} ${styles.toYX} ${styles.alternateReverse}` },
    { type: 'image', src: img10 },
    { type: 'image', src: img8 },
  ],
  2: [
    { type: 'image', src: img3 },
    { type: 'div', classes: `${styles.bgLight} ${styles.toX} ${styles.alternateReverse}` },
    { type: 'image', src: img7 },
    { type: 'image', src: img6 },
    { type: 'div', classes: `${styles.bgLight}` },
    { type: 'image', src: img11 },
    { type: 'div', classes: `${styles.bgLight} ${styles.toYX} ${styles.alternate}` },
  ],
  3: [
    { type: 'image', src: img4 },
    { type: 'div', classes: `${styles.bgLight} ${styles.toYX} ${styles.alternateReverse}` },
    { type: 'image', src: img9 },
    { type: 'div', classes: `${styles.bgLight}` },
    { type: 'div', classes: `${styles.bgLight} ${styles.toX} ${styles.alternate}` },
    { type: 'image', src: img7 },
    { type: 'div', classes: `${styles.bgLight} ${styles.toY} ${styles.alternateReverse}` },
  ],
}

export default galleryBlocks
