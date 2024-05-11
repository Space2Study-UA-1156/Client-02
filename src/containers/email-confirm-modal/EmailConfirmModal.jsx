import Box from '@mui/material/Box'
import { styles } from '~/containers/email-confirm-modal/EmailConfirmModal.styles'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

const EmailConfirmModal = () => {
  return (
    <Box sx={styles.box}>
      <ImgTitleDescription
        img={imgSuccess}
        style={styles}
        title='You have been successfully registered!'
      />
    </Box>
  )
}

export default EmailConfirmModal
