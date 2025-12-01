import { useState, useMemo, useEffect } from 'react'

import { useGetArtsByCategoryQuery } from '@api/supabaseApi.js'

import SortingFilters from './SortingFilters/SortingFilters.jsx'
import ImageCard from './ImageCard/ImageCard.jsx'
import { CategoryPageSkeleton } from '@pages'

import './CategoryPage.css'
import { useImage } from '@hooks'

const CategoryPage = ({ categoryId }) => {
  const { data = [], isLoading, error } = useGetArtsByCategoryQuery(categoryId)
  const [sorting, setSorting] = useState({
    activeMode: 'likes', // dates
    likes: 'increase', // decrease
    dates: 'increase', // decrease
  })

  const { setCurrentImages } = useImage()

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

  useEffect(() => {
    if (sortedData.length > 0) setCurrentImages(sortedData)
  }, [sortedData, setCurrentImages])

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
        {sortedData.map((image, index) => (
          <ImageCard key={image.id} image={image} imgIndex={index} />
        ))}
      </div>
    </section>
  )
}

export default CategoryPage
