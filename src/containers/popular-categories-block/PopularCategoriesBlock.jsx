import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from '~/containers/popular-categories-block/PopularCategoriesBlock.styles.js'
import { categoryService } from '~/services/category-service'
import AppButton from '~/components/app-button/AppButton'
import { useEffect, useState, useMemo } from 'react'
import CategoryItemCard from '~/components/category-item-card/CategoryItemCard'
import { useLocation } from 'react-router-dom'

const PopularCategoriesBlock = () => {
  const { t } = useTranslation()
  const [categoriesData, setCategoriesData] = useState([])
  const [showMore, setShowMore] = useState(6)

  const location = useLocation()

  const addCategories = 6

  const queryParams = new URLSearchParams(location.search)

  const search = queryParams.get('search') || ''

  const searchedCategories = useMemo(() => {
    if (!search) return categoriesData

    const normilizedSearch = normalizeString(search)

    return categoriesData.filter((category) =>
      normalizeString(category.name).includes(normilizedSearch)
    )
  }, [categoriesData, search])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories()
        setCategoriesData(response.data.items)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleShowMore = () => {
    setShowMore((prev) => prev + addCategories)
  }

  function normalizeString(v) {
    if (typeof v !== 'string') {
      return ''
    }
    return v.trim().toLowerCase()
  }

  return (
    <>
      <Box sx={styles.gridBox}>
        {searchedCategories.length > 0 &&
          searchedCategories
            .filter((_, i) => i < showMore)
            .map((category, index) => (
              <CategoryItemCard
                bg={category.appearance.color}
                category={category.name}
                id={category._id}
                image={category.appearance.icon_path}
                key={`${category.id}-${index}`}
                offers={category?.totalOffers.student}
              />
            ))}
      </Box>
      {showMore < searchedCategories.length && (
        <AppButton onClick={handleShowMore} sx={styles.viewMoreButton}>
          {t('categoriesPage.viewMore')}
        </AppButton>
      )}
    </>
  )
}
export default PopularCategoriesBlock
