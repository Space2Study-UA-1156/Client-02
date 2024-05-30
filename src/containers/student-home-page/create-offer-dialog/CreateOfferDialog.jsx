import useForm from '~/hooks/use-form'

import Box from '@mui/material/Box'

import { snackbarVariants } from '~/constants'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import {
  category,
  subject,
  title,
  description,
  languages,
  price
} from '~/utils/validations/create-request'
import { offerRequestService } from '~/services/offer-service'

import styles from '~/containers/student-home-page/create-offer-dialog/CreateOfferDialog.styles'
import CreateRequestOfferForm from '~/components/create-request-offer-form/CreateRequestOfferForm'

const CreateOfferDialog = () => {
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const {
    handleSubmit,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    data,
    errors
  } = useForm({
    onSubmit: async () => {
      try {
        await offerRequestService.createOffer(data)
        closeModal()
        setAlert({
          severity: snackbarVariants.success,
          message: 'offerPage.createOffer.successMessage'
        })
      } catch (e) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${e}`
        })
      }
    },
    initialValues: {
      category: '',
      subject: '',
      title: '',
      description: '',
      languages: [],
      proficiencyLevel: [],
      price: '',
      FAQ: [
        {
          id: 1,
          question: '',
          answer: ''
        }
      ]
    },
    validations: {
      category,
      subject,
      title,
      description,
      languages,
      price
    }
  })

  return (
    <Box sx={styles.root}>
      <Box sx={styles.formContainer}>
        <CreateRequestOfferForm
          closeModal={closeModal}
          data={data}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  )
}

export default CreateOfferDialog
