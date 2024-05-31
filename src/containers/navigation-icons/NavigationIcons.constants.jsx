import { Link } from 'react-router-dom'

import BookmarkIcon from '@mui/icons-material/Bookmark'
import LanguageIcon from '@mui/icons-material/Language'
import LoginIcon from '@mui/icons-material/Login'
import MenuIcon from '@mui/icons-material/Menu'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'

import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

const languageIcon = {
  tooltip: 'iconsTooltip.language',
  icon: <LanguageIcon />,
  buttonProps: ({ openLanguageMenu }) => ({
    onClick: openLanguageMenu,
    sx: styles.studentIcons
  })
}

const menuIcon = {
  tooltip: 'iconsTooltip.menu',
  icon: <MenuIcon />,
  buttonProps: ({ setSidebarOpen }) => ({
    onClick: setSidebarOpen,
    sx: styles.showOnlyOnMobile
  })
}

export const guestIcons = [
  languageIcon,
  {
    tooltip: 'iconsTooltip.login',
    icon: <LoginIcon />,
    buttonProps: ({ openLoginDialog }) => ({
      onClick: openLoginDialog,
      sx: styles.showOnlyOnMobile
    })
  },
  menuIcon
]

export const userIcons = [
  languageIcon,
  {
    disabled: true,
    tooltip: 'iconsTooltip.messages',
    icon: <MessageRoundedIcon />,
    buttonProps: () => ({
      component: Link,
      sx: styles.studentIcons,
      to: authRoutes.chat.path
    })
  },
  {
    disabled: true,
    tooltip: 'iconsTooltip.bookmarks',
    icon: <BookmarkIcon color='disabled' />,
    buttonProps: () => ({ sx: styles.studentIcons })
  },
  {
    disableRipple: true,
    disableFocusRipple: true,
    color: 'neutral',
    tooltip: 'iconsTooltip.notifications',
    badgeContent: ({ notifications }) => notifications,
    icon: <NotificationsRoundedIcon />,
    buttonProps: ({ openNotifications }) => ({
      onClick: openNotifications,
      sx: { ...styles.studentIcons, color: 'primary.200' }
    })
  },
  menuIcon
]
