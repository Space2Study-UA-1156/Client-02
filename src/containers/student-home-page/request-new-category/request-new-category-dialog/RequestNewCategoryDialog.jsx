import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import RequestNewCategoryForm from '~/containers/student-home-page/request-new-category/request-new-category-form/RequestNewCategoryForm'

import { validations } from '~/containers/student-home-page/request-new-category/request-new-category-dialog/constants'
import { snackbarVariants } from '~/constants'
import useForm from '~/hooks/use-form'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userRequestService } from '~/services/user-request-service'

import image from '~/assets/img/student-home-page/requestNewCategory.svg'
import { style } from '~/containers/student-home-page/request-new-category/request-new-category-dialog/RequestNewCategoryDialog.style'

const mapDataToAPIObject = (data) => {
  const { newSubject, newCategory, additionalInformation } = data
  return {
    new_subject: newSubject,
    category: newCategory,
    additionalInfo: additionalInformation
  }
}

const RequestNewCategoryDialog = () => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()

  const {
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    handleBlur,
    data,
    errors
  } = useForm({
    onSubmit: async () => {
      try {
        await userRequestService.createUserRequest(mapDataToAPIObject(data))
        setAlert({
          severity: snackbarVariants.success,
          message: 'studentHomePage.requestNewCategory.successMessage'
        })
        closeModal()
      } catch (e) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${e}`
        })
      }
    },
    initialValues: {
      newSubject: '',
      newCategory: '',
      additionalInformation: ''
    },
    validations
  })

  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        <Box
          alt={t('studentHomePage.requestNewCategory.title')}
          component='img'
          src={image}
          sx={style.img}
        />
      </Box>

      <Box sx={style.formContainer}>
        <Box id='form' sx={style.form}>
          <TitleWithDescription
            description={t('studentHomePage.requestNewCategory.description')}
            style={style.titleWithDescription}
            title={t('studentHomePage.requestNewCategory.title')}
          />
          <RequestNewCategoryForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default RequestNewCategoryDialog
