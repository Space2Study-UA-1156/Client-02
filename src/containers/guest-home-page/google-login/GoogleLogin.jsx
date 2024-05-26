import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import HashLink from '~/components/hash-link/HashLink'

import { useModalContext } from '~/context/modal-context'
import { guestRoutes } from '~/router/constants/guestRoutes'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'

import { styles } from '~/containers/guest-home-page/google-login/GoogleLogin.styles'

const GoogleLogin = ({ type }) => {
  const { t } = useTranslation()
  const { whatCanYouDo } = guestRoutes.navBar
  const { openModal, closeModal } = useModalContext()

  const openLoginDialog = () => {
    closeModal()
    setTimeout(() => openModal({ component: <LoginDialog /> }), 0)
  }

  return (
    <Box>
      <Box sx={styles.haveAccount}>
        <Typography sx={{ pr: 1 }} variant='body2'>
          {t(`${type}.haveAccount`)}
        </Typography>

        {type === 'signup' ? (
          <Typography
            onClick={openLoginDialog}
            sx={styles.underlineText}
            variant='body2'
          >
            {t('signup.joinUs')}
          </Typography>
        ) : (
          <Typography
            component={HashLink}
            onClick={closeModal}
            sx={styles.underlineText}
            to={whatCanYouDo.path}
            variant='body2'
          >
            {t('login.joinUs')}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default GoogleLogin
