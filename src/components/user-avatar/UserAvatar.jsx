import Avatar from '@mui/material/Avatar'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import { styles } from '~/components/user-avatar/UserAvatar.styles'

const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0).toUpperCase()}${lastName
    ?.charAt(0)
    .toUpperCase()}`
}

const UserAvatar = ({ firstName, lastName, photo }) => {
  const userPhotoAvatar = (
    <Avatar
      alt={`${firstName} ${lastName} Avatar`}
      src={photo}
      sx={styles.userPhoto}
    />
  )

  const userInitialsPlaceholderAvatar = (
    <Avatar sx={styles.userInitialsPlaceholder}>
      {getInitials(firstName, lastName)}
    </Avatar>
  )

  const userFallbackAvatar = <AccountCircleOutlinedIcon />

  const renderUserAvatar = () => {
    if (photo) {
      return userPhotoAvatar
    }
    if (firstName && lastName) {
      return userInitialsPlaceholderAvatar
    }
    return userFallbackAvatar
  }

  return <>{renderUserAvatar()}</>
}

export default UserAvatar
