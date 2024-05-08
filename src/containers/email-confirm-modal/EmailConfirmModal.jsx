import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styles } from '~/containers/email-confirm-modal/EmailConfirmModal.styles'
import { useTranslation } from 'react-i18next'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

const EmailConfirmModal = ({ openModal }) => {
  const { t } = useTranslation()

  const openLoginDialog = () => {
    openModal({ component: <LoginDialog /> })
  }

  return (
    <Box sx={styles.box}>
      <ImgTitleDescription
        img={imgSuccess}
        style={styles}
        title='You have been successfully registered!'
      />
      <Button onClick={openLoginDialog} sx={styles.button} variant='contained'>
        {t('button.goToLogin')}
      </Button>
    </Box>
  )
}

export default EmailConfirmModal
