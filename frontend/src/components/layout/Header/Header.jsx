import { NavLink } from 'react-router-dom'

import logo from '@assets/images/star-02.png'
import styles from './Header.module.css'
const preloadCategoryPage = () => import('@pages/CategoryPage/CategoryPage.jsx')

const Header = () => {
  const getClassNames = isActive => `${styles.menuLink} ${isActive ? styles.active : ''}`

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.content}`}>
          <NavLink
            to="/"
          >
            <img
              src={logo}
              alt=""
              className={styles.logo}
            />
          </NavLink>

          <nav className={styles.menu}>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) => getClassNames(isActive)}
                >
                  Главная
                </NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink
                  to="/girls"
                  className={({ isActive }) => getClassNames(isActive)}
                  onMouseEnter={preloadCategoryPage}
                  onFocus={preloadCategoryPage}
                >
                  Девушки
                </NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink
                  to="/monsters"
                  className={({ isActive }) => getClassNames(isActive)}
                  onMouseEnter={preloadCategoryPage}
                  onFocus={preloadCategoryPage}
                >
                  Монстрики
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
