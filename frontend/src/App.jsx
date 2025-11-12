import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'

import { useGetCategoryIdsQuery } from '@api/supabaseApi.js'

import MainPage from '@components/MainPage'
import { HomePage } from '@pages'
import { CategoryPageSkeleton } from '@pages'
const CategoryPage = lazy(() => import('@pages/CategoryPage/CategoryPage.jsx'))

function App() {
  const { data: categories, isLoading } = useGetCategoryIdsQuery()

  if (isLoading) {
    return <div></div>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage />}></Route>
            {categories && categories.map(category => (
              <Route
                key={category.id}
                path={category.name}
                element={(
                  <Suspense fallback={<CategoryPageSkeleton />}>
                    <CategoryPage categoryId={category.id} />
                  </Suspense>
                )}
              >
              </Route>
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
