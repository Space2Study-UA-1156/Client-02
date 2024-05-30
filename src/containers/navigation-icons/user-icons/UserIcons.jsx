import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'

import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import { userIcons } from '~/containers/navigation-icons/NavigationIcons.constants'

import UserAvatar from '~/components/user-avatar/UserAvatar'
import AccountMenu from '~/containers/layout/account-menu/AccountMenu'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

const UserIcons = ({ setSidebarOpen }) => {
  const { firstName, lastName, photo } = useSelector((state) => state.appMain)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const anchorRef = useRef(null)
  const { t } = useTranslation()

  const openMenu = () => setMenuAnchorEl(anchorRef.current)
  const closeMenu = () => setMenuAnchorEl(null)

  const icons = userIcons.map(
    (item) =>
      !item.disabled && (
        <NavigationIcon
          buttonProps={item.buttonProps({
            openMenu,
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
          onClick: openMenu,
          sx: styles.studentIcons
        }}
        icon={
          <UserAvatar firstName={firstName} lastName={lastName} photo={photo} />
        }
        key={'iconsTooltip.account'}
        tooltip={t('iconsTooltip.account')}
      />
      <AccountMenu anchorEl={menuAnchorEl} onClose={closeMenu} />
    </Box>
  )
}

export default UserIcons
