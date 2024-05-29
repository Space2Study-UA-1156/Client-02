import Avatar from '@mui/material/Avatar'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import { styles } from '~/components/user-avatar/UserAvatar.styles'

const UserAvatar = ({ firstName, lastName, photo }) => {
  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }

  const renderAvatar = () => {
    if (photo) {
      return (
        <Avatar
          alt={`${firstName} ${lastName} Avatar`}
          src={photo}
          sx={styles.userPhoto}
        />
      )
    }
    if (firstName && lastName) {
      return (
        <Avatar sx={styles.userInitialsPlaceholder}>{getInitials()}</Avatar>
      )
    }
    return <AccountCircleOutlinedIcon />
  }

  return <>{renderAvatar()}</>
}

export default UserAvatar
