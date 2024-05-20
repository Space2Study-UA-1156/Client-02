import { Box, Typography, Paper, Autocomplete, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import HashLink from '~/components/hash-link/HashLink'

const CategorySearch = ({
  inputValue,
  handleCategoryChange,
  handleInputChange,
  categoriesData,
  selectedCategory,
  styles,
  categoriesPath,
  subjectsPath,
  findOffersPath,
  normalizeString
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>{t('categoriesPage.title')}</Typography>
        <Typography>{t('categoriesPage.description')}</Typography>
      </Box>
      <Box sx={styles.showOffersBox}>
        <Typography
          component={HashLink}
          sx={styles.showOffers}
          to={findOffersPath}
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
          to={categoriesPath}
        >
          {t('categoriesPage.category')}
        </Typography>
        <Typography>{t('categoriesPage.and')}</Typography>
        <Typography
          component={HashLink}
          sx={styles.underlineText}
          to={subjectsPath}
        >
          {t('categoriesPage.subject')}
        </Typography>
        <Typography>{t('categoriesPage.exclmMark')}</Typography>
      </Box>
    </>
  )
}

export default CategorySearch
