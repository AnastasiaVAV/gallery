import img1 from '@assets/images/homePage/1.jpg'
import img1_3 from '@assets/images/homePage/1_3.jpg'
// import img1_5 from '@assets/images/homePage/1_5.jpg'
// import img1_6 from '@assets/images/homePage/1_6.jpg'
import img1_7 from '@assets/images/homePage/1_7.jpg'
import img1_8 from '@assets/images/homePage/1_8.jpg'
import img1_9 from '@assets/images/homePage/1_9.jpg'

import img2 from '@assets/images/homePage/2.jpg'
import img2_1 from '@assets/images/homePage/2_1.jpg'
import img2_2 from '@assets/images/homePage/2_2.jpg'
import img2_3 from '@assets/images/homePage/2_3.jpg'

import img3 from '@assets/images/homePage/3.jpg'
import img3_1 from '@assets/images/homePage/3_1.jpg'
import img3_2 from '@assets/images/homePage/3_2.jpg'
import img3_3 from '@assets/images/homePage/3_3.jpg'

// import img4 from '@assets/images/homePage/4.jpg'

// import img5 from '@assets/images/homePage/5.jpg'
// import img6 from '@assets/images/homePage/6.jpg'
// import img7 from '@assets/images/homePage/7.jpg'
// import img8 from '@assets/images/homePage/8.jpg'
// import img9 from '@assets/images/homePage/9.jpg'

// import img10 from '@assets/images/homePage/10.jpg'
// import img11 from '@assets/images/homePage/11.jpg'

import styles from './HomePage.module.css'

const galleryBlocks = {
  1: [
    { type: 'image', src: img1 },
    { type: 'image', src: img1_9 },
    { type: 'image', src: img1_3 },
    { type: 'div', classes: `${styles.bgLightPurple} ${styles.toX} ${styles.alternate}` },
    { type: 'div', classes: `${styles.bgLightBlue} ${styles.toYX} ${styles.alternateReverse}` },
    { type: 'image', src: img1_8 },
    { type: 'image', src: img1_7 },
  ],
  2: [
    { type: 'image', src: img2 },
    { type: 'div', classes: `${styles.bgDarkBlue} ${styles.toX} ${styles.alternateReverse}` },
    { type: 'image', src: img2_2 },
    { type: 'image', src: img2_3 },
    { type: 'div', classes: `${styles.bgDarkGray}` },
    { type: 'image', src: img2_1 },
    { type: 'div', classes: `${styles.bgLight} ${styles.toYX} ${styles.alternate}` },
  ],
  3: [
    { type: 'image', src: img3 },
    { type: 'image', src: img3_3 },
    { type: 'div', classes: `${styles.bgDarkBlue}` },
    { type: 'image', src: img3_1 },
    { type: 'div', classes: `${styles.bgLightBlue} ${styles.toX} ${styles.alternate}` },
    { type: 'image', src: img3_2 },
    { type: 'div', classes: `${styles.bgLightPurple} ${styles.toY} ${styles.alternateReverse}` },
  ],
}

export default galleryBlocks
