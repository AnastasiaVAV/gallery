import { Skeleton } from '@ui'

import './CategoryPage.css'
import styles from './CategoryPageSkeleton.module.css'

const skeletonItems = Array.from({ length: 6 }, (_, index) => index)

const CategoryPageSkeleton = () => {
  return (
    <section className="container">
      <div className="sortingContainer">
        <Skeleton className={styles.button}></Skeleton>
        <Skeleton className={styles.button}></Skeleton>
      </div>

      <div className="container categoryContainer">
        {skeletonItems.map(item => (
          <div key={item} className={styles.imageCard}>
            <Skeleton className={styles.image}></Skeleton>
            <div className={styles.info}>
              <Skeleton type="text" className={styles.title}></Skeleton>
              <Skeleton type="text" className={styles.likes}></Skeleton>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategoryPageSkeleton
