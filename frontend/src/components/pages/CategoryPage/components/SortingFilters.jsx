import { Button, SortingIcon } from '@ui'
import styles from './SortingFilters.module.css'

const sortButtons = [
  { key: 'likes', label: 'Лайки' },
  { key: 'dates', label: 'Дата' },
]

const SortingFilters = ({ sorting, setSorting }) => {
  const handleSortMode = (currentMode) => {
    setSorting(prev => ({
      ...prev,
      activeMode: currentMode,
      [currentMode]:
        prev.activeMode === currentMode && prev[currentMode] === 'increase'
          ? 'decrease'
          : 'increase',
    }))
  }

  return (
    <>
      {sortButtons.map(({ key, label }) => (
        <Button
          key={key}
          type="button"
          isActive={sorting.activeMode === key}
          className={styles.button}
          onClick={() => handleSortMode(key)}
        >
          <SortingIcon direction={sorting[key]} />
          <p className="sorting-text">{label}</p>
        </Button>
      ))}
    </>
  )
}

export default SortingFilters
