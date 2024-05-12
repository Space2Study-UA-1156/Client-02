import {
  createContext,
  useCallback,
  useMemo,
  useContext,
  useEffect,
  useState
} from 'react'
import useConfirm from '~/hooks/use-confirm'

const StepContext = createContext()

const StepProvider = ({ children, initialValues, stepLabels }) => {
  const { setNeedConfirmation } = useConfirm()
  const [generalData, setGeneralData] = useState({
    data: initialValues,
    errors: {}
  })
  const [subject, setSubject] = useState([])
  const [language, setLanguage] = useState(null)
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

  useEffect(() => {
    setNeedConfirmation(
      Object.keys(generalData.data).some((key) => generalData.data[key]) ||
        subject.length !== 0 ||
        language !== null ||
        photo.length !== 0
    )
  }, [generalData, subject, language, photo, setNeedConfirmation])

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
    () => ({ generalLabel, stepData, handleStepData }),
    [generalLabel, stepData, handleStepData]
  )

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
