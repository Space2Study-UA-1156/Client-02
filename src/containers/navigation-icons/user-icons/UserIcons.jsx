import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'

import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import UserAvatar from '~/components/user-avatar/UserAvatar'
import AccountMenu from '~/containers/layout/account-menu/AccountMenu'
import LanguageMenu from '~/containers/layout/language-menu/LanguageMenu'
import { userIcons } from '~/containers/navigation-icons/NavigationIcons.constants'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

const UserIcons = ({ setSidebarOpen }) => {
  const { firstName, lastName, photo } = useSelector((state) => state.appMain)
  const { t } = useTranslation()
  const anchorRef = useRef(null)
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null)
  const openAccountMenu = () => setAccountMenuAnchorEl(anchorRef.current)
  const closeAccountMenu = () => setAccountMenuAnchorEl(null)

  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = useState(null)
  const openLanguageMenu = () => setLanguageMenuAnchorEl(anchorRef.current)
  const closeLanguageMenu = () => setLanguageMenuAnchorEl(null)

  const icons = userIcons.map(
    (item) =>
      !item.disabled && (
        <NavigationIcon
          buttonProps={item.buttonProps({
            openAccountMenu,
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
      <NavigationIcon
        buttonProps={{
          onClick: openAccountMenu,
          sx: styles.studentIcons
        }}
        icon={
          <UserAvatar firstName={firstName} lastName={lastName} photo={photo} />
        }
        key={'iconsTooltip.account'}
        tooltip={t('iconsTooltip.account')}
      />
      <AccountMenu anchorEl={accountMenuAnchorEl} onClose={closeAccountMenu} />
      <LanguageMenu
        anchorEl={languageMenuAnchorEl}
        onClose={closeLanguageMenu}
      />
    </Box>
  )
}

export default UserIcons
