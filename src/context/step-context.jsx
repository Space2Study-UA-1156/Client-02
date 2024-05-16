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

const StepContext = createContext()

const StepProvider = ({ children, initialValues, validations, stepLabels }) => {
  const { setNeedConfirmation } = useConfirm()
  const {
    handleInputChange,
    handleSelectChange,
    handleBlur,
    errors,
    data,
    isDirty
  } = useForm({
    initialValues,
    validations
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const [generalData, setGeneralData] = useState({
    data: initialValues,
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
          setGeneralData({ data, errors })
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
      handleBlur,
      errors
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
      handleBlur,
      errors
    ]
  )

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
