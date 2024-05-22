import { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import useAxios from '~/hooks/use-axios'

import { useDispatch } from 'react-redux'
import { checkAuth } from '~/redux/reducer'
import { snackbarVariants } from '~/constants'
import { userService } from '~/services/user-service'
import { useModalContext } from '~/context/modal-context'
import { useStepContext } from '~/context/step-context'
import { useSnackBarContext } from '~/context/snackbar-context'

const useSteps = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const { closeModal } = useModalContext()
  const {
    data,
    errors,
    validTabs,
    markGeneralInfoAsValidated,
    markSubjectsAsValidated,
    markLanguagesAsValidated,
    markPhotoAsValidated
  } = useStepContext()
  const { setAlert } = useSnackBarContext()
  const dispatch = useDispatch()

  const { userId, userRole } = useSelector((state) => state.appMain)
  const isTutor = userRole === 'tutor'

  const mapDataToAPIObject = () => {
    const {
      firstName,
      lastName,
      country,
      city,
      professionalSummary,
      subjects,
      languages
      // photo
    } = data

    const address = { country, city }
    const mainSubjects = subjects
    const languageData = isTutor
      ? { nativeLanguage: languages.name }
      : { spokenLanguages: languages.map((language) => language.name) }

    return {
      firstName,
      lastName,
      address,
      professionalSummary,
      mainSubjects,
      ...languageData
      // photo
    }
  }

  const handleSubmitError = () => {
    setAlert({
      severity: snackbarVariants.error,
      message: 'becomeTutor.errorMessage'
    })
  }

  const updateUser = useCallback(
    (data) => userService.updateUser(userId, data),
    [userId]
  )

  const handleResponseError = (error) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'becomeTutor.successMessage'
    })
    dispatch(checkAuth())
    closeModal()
  }

  const { loading, fetchData } = useAxios({
    service: updateUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const validateCurrentStep = useCallback(() => {
    switch (activeStep) {
      case 0:
        markGeneralInfoAsValidated()
        break
      case 1:
        markGeneralInfoAsValidated()
        markSubjectsAsValidated()
        break
      case 2:
        markGeneralInfoAsValidated()
        markSubjectsAsValidated()
        markLanguagesAsValidated()
        break
      case 3:
        markGeneralInfoAsValidated()
        markSubjectsAsValidated()
        markLanguagesAsValidated()
        markPhotoAsValidated()
        break
      default:
        break
    }
  }, [
    activeStep,
    markGeneralInfoAsValidated,
    markSubjectsAsValidated,
    markLanguagesAsValidated,
    markPhotoAsValidated
  ])

  const next = () => {
    validateCurrentStep()
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const isLastStep = activeStep === steps.length - 1
  const isFirstStep = activeStep === 0

  const handleSubmit = () => {
    markGeneralInfoAsValidated()
    markSubjectsAsValidated()
    markLanguagesAsValidated()
    markPhotoAsValidated()

    setSubmitted(true)
  }

  useEffect(() => {
    if (submitted) {
      const hasErrors = Object.values(errors).some((error) => error !== '')

      if (hasErrors) {
        handleSubmitError()
      } else {
        fetchData(mapDataToAPIObject())
      }
      return () => {
        setSubmitted(false)
      }
    }
    /* eslint-disable-next-line */
  }, [submitted, data, errors])

  const stepOperation = {
    next,
    back,
    handleSubmit,
    setActiveStep
  }

  return {
    validTabs,
    activeStep,
    isFirstStep,
    isLastStep,
    stepOperation,
    loading
  }
}

export default useSteps
