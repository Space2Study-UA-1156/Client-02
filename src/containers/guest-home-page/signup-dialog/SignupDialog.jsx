import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { confirmPassword } from '~/utils/validations/login'
import useForm from '~/hooks/use-form'

import { signup, snackbarVariants } from '~/constants'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import { loginUser, signupUser } from '~/redux/reducer'

import student from '~/assets/img/signup-dialog/student.svg'
import tutor from '~/assets/img/signup-dialog/tutor.svg'

import { styles } from '~/containers/guest-home-page/signup-dialog/SignupDialog.styles'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'

const SignupDialog = ({ type }) => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const dispatch = useDispatch()
  const signupImg = { student, tutor }

  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await dispatch(signupUser({ ...data, role: type })).unwrap()
          openModal({
            component: <EmailConfirmModal />
          })
          setTimeout(
            () => dispatch(loginUser({ ...data, role: type })).unwrap(),
            3000
          )
        } catch (e) {
          setAlert({
            severity: snackbarVariants.error,
            message: `errors.${e}`
          })
        }
      },
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validations: { confirmPassword }
    }
  )
  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='signup'
          component='img'
          src={signupImg[type]}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t('signup.head', { returnObjects: true })[type]}
        </Typography>
        <Box sx={styles.form}>
          <SignupForm
            closeModal={closeModal}
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <GoogleLogin
            buttonWidth={styles.form.maxWidth}
            role={type}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog
