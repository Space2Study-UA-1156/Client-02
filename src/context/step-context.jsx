import {
  createContext,
  useCallback,
  useMemo,
  useContext,
  useState,
  useEffect
} from 'react'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import {
  generalInfoInitialValues,
  subjectsInitialValues,
  languagesInitialValues,
  photoInitialValues
} from '~/components/user-steps-wrapper/constants'

const StepContext = createContext()

const StepProvider = ({ children, initialValues, validations, stepLabels }) => {
  const { setNeedConfirmation } = useConfirm()
  const {
    handleInputChange,
    handleSelectChange,
    handleNonInputValueChange,
    handleBlur,
    errors,
    data,
    isDirty,
    markAsValidated
  } = useForm({
    initialValues,
    validations
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const [generalData, setGeneralData] = useState({
    data: generalInfoInitialValues,
    errors
  })
  const [subject, setSubject] = useState([])
  const [language, setLanguage] = useState([])
  const [photo, setPhoto] = useState([])
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels

  const stepData = useMemo(
    () => ({
      [generalLabel]: generalData,
      [subjectLabel]: subject,
      [languageLabel]: language,
      [photoLabel]: photo
    }),
    [
      generalData,
      subject,
      language,
      photo,
      generalLabel,
      subjectLabel,
      languageLabel,
      photoLabel
    ]
  )

  const handleStepData = useCallback(
    (stepLabel, data, errors) => {
      switch (stepLabel) {
        case generalLabel:
          setGeneralData({
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
              city: data.city,
              country: data.country,
              professionalSummary: data.professionalSummary,
              legalAge: data.legalAge
            },
            errors
          })
          break
        case subjectLabel:
          setSubject(data)
          break
        case languageLabel:
          setLanguage(data)
          break
        case photoLabel:
          setPhoto(data)
          break
        default:
          return
      }
    },
    [generalLabel, subjectLabel, languageLabel, photoLabel]
  )

  const markGeneralInfoAsValidated = useCallback(() => {
    Object.keys(generalInfoInitialValues).forEach((key) => markAsValidated(key))
  }, [markAsValidated])

  const markSubjectsAsValidated = useCallback(() => {
    Object.keys(subjectsInitialValues).forEach((key) => markAsValidated(key))
  }, [markAsValidated])

  const markLanguagesAsValidated = useCallback(() => {
    Object.keys(languagesInitialValues).forEach((key) => markAsValidated(key))
  }, [markAsValidated])

  const markPhotoAsValidated = useCallback(() => {
    Object.keys(photoInitialValues).forEach((key) => markAsValidated(key))
  }, [markAsValidated])

  function hasErrors(fields) {
    return Object.keys(fields).some((field) => errors[field] !== '')
  }

  const validTabs = useMemo(() => {
    return {
      0: hasErrors(generalInfoInitialValues),
      1: hasErrors(subjectsInitialValues),
      2: hasErrors(languagesInitialValues),
      3: hasErrors(photoInitialValues)
    }
    /* eslint-disable-next-line */
  }, [errors])

  const contextValue = useMemo(
    () => ({
      generalLabel,
      subjectLabel,
      languageLabel,
      photoLabel,
      initialValues,
      data,
      stepData,
      handleStepData,
      handleInputChange,
      handleSelectChange,
      handleNonInputValueChange,
      handleBlur,
      validTabs,
      errors,
      markGeneralInfoAsValidated,
      markSubjectsAsValidated,
      markLanguagesAsValidated,
      markPhotoAsValidated
    }),
    [
      generalLabel,
      subjectLabel,
      languageLabel,
      photoLabel,
      initialValues,
      data,
      stepData,
      handleStepData,
      handleInputChange,
      handleSelectChange,
      handleNonInputValueChange,
      handleBlur,
      validTabs,
      errors,
      markGeneralInfoAsValidated,
      markSubjectsAsValidated,
      markLanguagesAsValidated,
      markPhotoAsValidated
    ]
  )

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
