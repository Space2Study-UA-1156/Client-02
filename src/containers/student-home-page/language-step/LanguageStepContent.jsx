import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { styles } from '~/containers/student-home-page/language-step/LanguageStepContent.styles'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useStepContext } from '~/context/step-context'
import image from '~/assets/img/language-step/image.svg'
import { languages } from '~/containers/tutor-home-page/language-step/constants'
import AppButton from '~/components/app-button/AppButton'
import { useSelector } from 'react-redux'
import AppChipList from '~/components/app-chips-list/AppChipList'
import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageStepStudentContent = () => {
  const { stepData, handleStepData } = useStepContext()
  const { authLoading } = useSelector((state) => state.appMain)
  const [chosenLanguage, setChosenLanguage] = useState(null)

  const { t } = useTranslation()
  const languageLabel = 'language'
  const selectedLanguages = useMemo(
    () => stepData[languageLabel] ?? [],
    [stepData]
  )

  const handleChangeLanguage = (event, value) => {
    setChosenLanguage(value)
  }

  const handleAddLanguage = () => {
    if (!selectedLanguages.includes(chosenLanguage)) {
      handleStepData(languageLabel, [...selectedLanguages, chosenLanguage])
      setChosenLanguage(null)
    }
  }

  const handleDeleteLanguage = (languageToDelete) => {
    handleStepData(
      languageLabel,
      selectedLanguages.filter((language) => language !== languageToDelete)
    )
  }

  const disabled = useMemo(() => {
    if (selectedLanguages.includes(chosenLanguage)) return true

    if (!chosenLanguage) return true
  }, [selectedLanguages, chosenLanguage])

  return (
    <Box>
      <Typography sx={styles.title}>
        {t('becomeTutor.languages.title')}
      </Typography>
      <Box
        alt='General Step'
        component='img'
        src={image}
        sx={styles.imgMobile}
      />
      <Autocomplete
        disablePortal
        onChange={handleChangeLanguage}
        options={languages}
        renderInput={(params) => (
          <TextField {...params} label='Your native language' />
        )}
        sx={{ width: '100%' }}
        value={chosenLanguage}
      />
      <AppButton
        disabled={!chosenLanguage || disabled}
        loading={authLoading}
        onClick={handleAddLanguage}
        sx={styles.button}
        variant='tonal'
      >
        Add one more language
      </AppButton>
      <AppChipList
        defaultQuantity={3}
        handleChipDelete={handleDeleteLanguage}
        items={selectedLanguages}
      />
    </Box>
  )
}

export default LanguageStepStudentContent
