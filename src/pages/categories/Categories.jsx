import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CreateRequestOfferBlock from '~/components/create-request-offer-block/CreateRequestOfferBlock'
import { Box, Typography, Paper, Autocomplete, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import { styles } from '~/pages/categories/Categories.styles.js'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AppButton from '~/components/app-button/AppButton'
import HashLink from '~/components/hash-link/HashLink'
import { categoryService } from '~/services/category-service'
import { useEffect, useState, useMemo } from 'react'
import { authRoutes } from '~/router/constants/authRoutes'
import CategoryItemCard from '~/components/category-item-card/CategoryItemCard'
import { useNavigate, useLocation } from 'react-router-dom'

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

  const { categories, subjects, findOffers } = authRoutes

  const searchedCategories = useMemo(() => {
    if (!search) return categoriesData

    const normilizedSearch = normalizeString(search)

    return categoriesData.filter((category) =>
      normalizeString(category.name).includes(normilizedSearch)
    )
  }, [categoriesData, search])

  useEffect(() => {
    setInputValue(search)
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

    navigateTo({ search: params.toString() }, { replace: true })
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

  return (
    <PageWrapper>
      <CreateRequestOfferBlock />
      <Box sx={styles.container}>
        <Typography sx={styles.title}>{t('categoriesPage.title')}</Typography>
        <Typography>{t('categoriesPage.description')}</Typography>
      </Box>
      <Box sx={styles.showOffersBox}>
        <Typography
          component={HashLink}
          sx={styles.showOffers}
          to={findOffers.path}
        >
          {t('categoriesPage.showAllOffers')}
          <ArrowForwardIcon sx={styles.arrowIcon} />
        </Typography>
      </Box>
      <Paper elevation={0} sx={styles.searchContainer}>
        <Box sx={styles.searchBox}>
          <SearchIcon sx={styles.searchIcon} />
          <Autocomplete
            freeSolo
            getOptionLabel={(option) => option.name}
            inputValue={inputValue}
            isOptionEqualToValue={(option, value) =>
              normalizeString(option.name)?.includes(normalizeString(value))
            }
            onChange={handleCategoryChange}
            onInputChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.defaultMuiPrevented = true
              }
            }}
            options={categoriesData}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder={t('categoriesPage.searchLabel')}
                  sx={styles.searchInput}
                />
              )
            }}
            sx={styles.searchBox}
            value={selectedCategory}
          />
        </Box>
      </Paper>
      <Box sx={styles.underSearchBoxText}>
        <Typography>{t('categoriesPage.cantFindLabel')}</Typography>
        <Typography
          component={HashLink}
          sx={styles.underlineText}
          to={categories.path}
        >
          {t('categoriesPage.category')}
        </Typography>
        <Typography>{t('categoriesPage.and')}</Typography>
        <Typography
          component={HashLink}
          sx={styles.underlineText}
          to={subjects.path}
        >
          {t('categoriesPage.subject')}
        </Typography>
        <Typography>{t('categoriesPage.exclmMark')}</Typography>
      </Box>
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
    </PageWrapper>
  )
}

export default Categories
