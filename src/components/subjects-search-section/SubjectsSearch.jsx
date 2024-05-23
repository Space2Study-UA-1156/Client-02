import { Box, Typography } from '@mui/material'
import { styles } from '~/components/subjects-search-section/SubjectsSearch.styles.js'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { authRoutes } from '~/router/constants/authRoutes'
import AsyncAutocomplete from '../async-autocomplete/AsyncAutocomplete'
import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import SearchIcon from '@mui/icons-material/Search'
import Link from '@mui/material/Link'
import HashLink from '~/components/hash-link/HashLink'

export function capitalize(value) {
  if (!value) return ''

  return value.charAt(0).toUpperCase() + value.slice(1)
}

function SubjectsSearch({
  inputValue,
  selectedSubject,
  handleInputChange,
  selectedCategory,
  categoryName,
  categoryId,
  setInputSubjectValue,
  inputSubjectValue,
  handleSubjectChange,
  handleCategoryChange
}) {
  const { t } = useTranslation()
  const { findOffers, categories } = authRoutes

  const categoryNameCapital = capitalize(categoryName)

  return (
    <>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>
          {t('subjectsPage.subjects.title', {
            category: selectedCategory ? categoryNameCapital : ''
          })}
        </Typography>
        <Typography>{t('subjectsPage.subjects.description')}</Typography>
      </Box>
      <Box sx={styles.showOffersBox}>
        <Box sx={styles.links}>
          <Link component={HashLink} sx={styles.link} to={categories.path}>
            <ArrowBackIcon />
            {t('subjectsPage.subjects.backToAllCategories')}
          </Link>
          <Link component={HashLink} sx={styles.link} to={findOffers.path}>
            {t('subjectsPage.subjects.showAllOffers')}
            <ArrowForwardIcon />
          </Link>
        </Box>
        <Box sx={styles.autocompleteBox}>
          <AsyncAutocomplete
            getOptionLabel={(v) => v.name}
            id='left'
            inputValue={inputValue}
            onChange={(_, newValue) => handleCategoryChange(newValue)}
            onInputChange={handleInputChange}
            service={categoryService.getCategoriesNames}
            sx={styles.categoriesAutocomplete}
            textFieldProps={{
              label: t('subjectsPage.subjects.backToAllCategories'),
              sx: styles.searchInput
            }}
            value={selectedCategory}
            valueField='_id'
          />
          <Box sx={styles.searchBox}>
            <SearchIcon />
            <AsyncAutocomplete
              getOptionLabel={(v) => v.name}
              id='right'
              inputValue={inputSubjectValue}
              onChange={(_, newValue) => handleSubjectChange(newValue)}
              onInputChange={(e, newValue) => setInputSubjectValue(newValue)}
              service={() => subjectService.getSubjectsNames(categoryId)}
              sx={styles.subjectsAutocomplete}
              textFieldProps={{
                placeholder: t('subjectsPage.subjects.searchLabel'),
                sx: styles.searchInput
              }}
              value={selectedSubject}
              valueField='_id'
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SubjectsSearch
