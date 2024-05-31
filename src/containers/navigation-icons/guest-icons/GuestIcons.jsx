import { useRef, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import LanguageMenu from '~/containers/layout/language-menu/LanguageMenu'
import { guestIcons } from '~/containers/navigation-icons/NavigationIcons.constants'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'
import { useModalContext } from '~/context/modal-context'

const GuestIcons = ({ setSidebarOpen }) => {
  const { t } = useTranslation()
  const anchorRef = useRef(null)
  const { openModal } = useModalContext()

  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = useState(null)
  const openLanguageMenu = () => setLanguageMenuAnchorEl(anchorRef.current)
  const closeLanguageMenu = () => setLanguageMenuAnchorEl(null)

  const openLoginDialog = useCallback(() => {
    openModal({ component: <LoginDialog /> })
  }, [openModal])

  const icons = guestIcons.map(
    (item) =>
      !item.disabled && (
        <NavigationIcon
          buttonProps={item.buttonProps({
            openLoginDialog,
            openLanguageMenu,
            setSidebarOpen
          })}
          icon={item.icon}
          key={item.tooltip}
          tooltip={t(item.tooltip)}
        />
      )
  )

  return (
    <Box ref={anchorRef} sx={styles.iconBox}>
      {icons}
      <AppButton
        onClick={openLoginDialog}
        size={'medium'}
        sx={styles.loginButton}
      >
        {t('header.loginButton')}
      </AppButton>
      <LanguageMenu
        anchorEl={languageMenuAnchorEl}
        onClose={closeLanguageMenu}
      />
    </Box>
  )
}

export default GuestIcons
