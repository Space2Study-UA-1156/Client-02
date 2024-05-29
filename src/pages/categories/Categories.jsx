import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CreateRequestOfferBlock from '~/components/create-request-offer-block/CreateRequestOfferBlock'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from '~/components/category-search-section/CategorySearchSection.styles.js'
import AppButton from '~/components/app-button/AppButton'
import { categoryService } from '~/services/category-service'
import { useEffect, useState, useMemo } from 'react'
import { authRoutes } from '~/router/constants/authRoutes'
import CategoryItemCard from '~/components/category-item-card/CategoryItemCard'
import { useNavigate, useLocation } from 'react-router-dom'
import CategorySearchSection from '~/components/category-search-section/CategorySearchSection'
import NoResultsContent from '~/components/no-results-content/NoResultsContent'
import RequestNewCategoryDialog from '~/containers/student-home-page/request-new-category/request-new-category-dialog/RequestNewCategoryDialog'

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState([])
  const [showMore, setShowMore] = useState(6)
  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const navigateTo = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const search = queryParams.get('search') || ''

  const addCategories = 6

  const { t } = useTranslation()

  const { categories, findOffers } = authRoutes

  const searchedCategories = useMemo(() => {
    if (!search) return categoriesData

    const normilizedSearch = normalizeString(search)

    return categoriesData.filter((category) =>
      normalizeString(category.name).includes(normilizedSearch)
    )
  }, [categoriesData, search])

  useEffect(() => {
    setInputValue(search)
    /* eslint-disable-next-line */
  }, [])

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

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    if (!search) params.delete('search')

    navigateTo({ search: params.toString().toLowerCase() }, { replace: true })
  }, [search, navigateTo, location.search])

  const handleShowMore = () => {
    setShowMore((prev) => prev + addCategories)
  }

  const handleCategoryChange = (event, value) => {
    setSelectedCategory(value)
    setInputValue(value?.name || '')
    navigateTo(`/categories?search=${value?.name || ''}`)
  }

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue)
    navigateTo(`/categories?search=${newValue}`)
  }

  function normalizeString(v) {
    if (typeof v !== 'string') {
      return ''
    }
    return v.trim().toLowerCase()
  }

  const searchedContent =
    searchedCategories.length === 0 ? (
      <NoResultsContent
        actionModal={<RequestNewCategoryDialog />}
        contentName={t('categoriesPage.category')}
      />
    ) : (
      <>
        <Box sx={styles.gridBox}>
          {searchedCategories.length > 0 &&
            searchedCategories
              .filter((_, i) => i < showMore)
              .map((category, index) => (
                <CategoryItemCard
                  bg={category.appearance.color}
                  category={category}
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

  return (
    <PageWrapper>
      <CreateRequestOfferBlock />
      <CategorySearchSection
        categoriesData={categoriesData}
        categoriesPath={categories.path}
        findOffersPath={findOffers.path}
        handleCategoryChange={handleCategoryChange}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        normalizeString={normalizeString}
        selectedCategory={selectedCategory}
        styles={styles}
      />
      {searchedContent}
    </PageWrapper>
  )
}

export default Categories
