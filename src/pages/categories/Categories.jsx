import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { Box, Typography, Paper, InputBase, Autocomplete } from '@mui/material'
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

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [actualSearch, setActualSearch] = useState(null)

  const { t } = useTranslation()

  const { categories, subjects, findOffers } = authRoutes

  const searchedCategories = useMemo(() => {
    if (!actualSearch) return categoriesData

    const normilizedSearch = normilizeString(actualSearch)

    return categoriesData.filter((category) =>
      normilizeString(category.name).includes(normilizedSearch)
    )
  }, [categoriesData, actualSearch])

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

  const handleCategorySearch = () => {
    setActualSearch(inputValue)
  }

  const handleCategoryChange = (event, value) => {
    setSelectedCategory(value)
    setInputValue(value?.name || '')
    setActualSearch(value?.name)
  }

  function normilizeString(v) {
    return v?.trim().toLowerCase()
  }

  return (
    <PageWrapper>
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
              normilizeString(option.name)?.includes(normilizeString(value))
            }
            onChange={handleCategoryChange}
            onInputChange={(e, newValue) => setInputValue(newValue)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.defaultMuiPrevented = true
                handleCategorySearch()
              }
            }}
            options={categoriesData}
            renderInput={(params) => {
              const { ...rest } = params
              return (
                <InputBase
                  {...params.InputProps}
                  {...rest}
                  placeholder={t('categoriesPage.searchLabel')}
                  sx={styles.searchInput}
                />
              )
            }}
            sx={styles.searchBox}
            value={selectedCategory}
          />
          <AppButton onClick={handleCategorySearch} sx={styles.searchButton}>
            Search
          </AppButton>
          <AppButton sx={styles.isMobile}>
            <SearchIcon />
          </AppButton>
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
      <Box>
        {searchedCategories.length > 0 &&
          searchedCategories.map((category, index) => (
            <CategoryItemCard
              category={category.name}
              id={category._id}
              image={category.name}
              key={`${category.id}-${index}`}
              offers={category?.totalOffers[0]}
            />
          ))}
      </Box>
    </PageWrapper>
  )
}

export default Categories
