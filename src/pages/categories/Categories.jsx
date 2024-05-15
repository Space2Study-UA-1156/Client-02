import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { Box, Typography, Paper, InputBase, Autocomplete } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import { styles } from '~/pages/categories/Categories.styles.js'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AppButton from '~/components/app-button/AppButton'
import HashLink from '~/components/hash-link/HashLink'
import { categoryService } from '~/services/category-service'
import { useEffect, useState } from 'react'
import { authRoutes } from '~/router/constants/authRoutes'

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState()

  const { t } = useTranslation()

  const { categories, subjects, findOffers } = authRoutes

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
          />
          <AppButton sx={styles.searchButton}>Search</AppButton>
          <AppButton sx={styles.iconButton}>
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
    </PageWrapper>
  )
}

export default Categories
