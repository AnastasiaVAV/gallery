import { useState, useMemo } from 'react'

import { useGetArtsByCategoryQuery } from '@api/supabaseApi.js'

import SortingFilters from './components/SortingFilters.jsx'
import ImageCard from './components/ImageCard.jsx'
import { CategoryPageSkeleton } from '@pages'

import './CategoryPage.css'

const CategoryPage = ({ categoryId }) => {
  const { data = [], isLoading, error } = useGetArtsByCategoryQuery(categoryId)
  const [sorting, setSorting] = useState({
    activeMode: 'likes', // dates
    likes: 'increase', // decrease
    dates: 'increase', // decrease
  })

  const sortedData = useMemo(() => {
    if (data.length === 0) return []

    switch (sorting.activeMode) {
      case 'likes':
        return data.toSorted((a, b) =>
          sorting.likes === 'increase' ? b.likes - a.likes : a.likes - b.likes,
        )
      case 'dates':
        return data.toSorted((a, b) => {
          const aDate = new Date(a.createdAt)
          const bDate = new Date(b.createdAt)
          return sorting.dates === 'increase' ? bDate - aDate : aDate - bDate
        })
      default:
        return data
    }
  }, [data, sorting])

  if (isLoading) return <CategoryPageSkeleton />
  if (error)
    return (
      <div>
        Error:
        {error.message}
      </div>
    )

  return (
    <section className="container">
      <div className="container sortingContainer">
        <SortingFilters sorting={sorting} setSorting={setSorting} />
      </div>
      <div className="container categoryContainer">
        {sortedData.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </section>
  )
}

export default CategoryPage
