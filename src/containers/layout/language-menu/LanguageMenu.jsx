import { useTranslation } from 'react-i18next'

import MenuItem from '@mui/material/MenuItem'

import AppMenu from '~/components/app-menu/AppMenu'
import languages from '~/constants/translations/languages'

import { styles } from '~/containers/layout/language-menu/LanguageMenu.styles'

const LanguageMenu = ({ anchorEl, onClose }) => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
    onClose()
  }

  const menuList = Object.keys(languages).map((languageCode) => {
    return (
      <MenuItem
        key={languageCode}
        onClick={() => handleLanguageChange(languageCode)}
        sx={styles.menuItem}
      >
        {languages[languageCode]}
      </MenuItem>
    )
  })

  return (
    <AppMenu
      anchorEl={anchorEl}
      menuList={menuList}
      onClose={onClose}
      open={Boolean(anchorEl)}
    />
  )
}

export default LanguageMenu
