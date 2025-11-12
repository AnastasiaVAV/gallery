import { Link, Outlet } from 'react-router-dom'
import { Header, Footer } from '@layout'

const MainPage = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainPage
