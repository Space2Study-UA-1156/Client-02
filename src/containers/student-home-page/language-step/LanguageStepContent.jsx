import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { styles } from '~/containers/student-home-page/language-step/LanguageStepContent.styles'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useStepContext } from '~/context/step-context'
import { languages } from '~/containers/tutor-home-page/language-step/constants'
import AppButton from '~/components/app-button/AppButton'
import { useSelector } from 'react-redux'
import AppChipList from '~/components/app-chips-list/AppChipList'
import { useState } from 'react'

const LanguageStepStudentContent = () => {
  const { stepData, handleStepData } = useStepContext()
  const { authLoading } = useSelector((state) => state.appMain)
  const [chosenLanguage, setChosenLanguage] = useState(null)

  const languageLabel = 'language'
  const selectedLanguages = stepData[languageLabel] ?? []

  const handleChangeLanguage = (event, value) => {
    setChosenLanguage(value)
  }

  const handleAddLanguage = () => {
    handleStepData(languageLabel, [...selectedLanguages, chosenLanguage])
    setChosenLanguage(null)
  }

  const handleDeleteLanguage = (languageToDelete) => {
    handleStepData(
      languageLabel,
      selectedLanguages.filter((language) => language !== languageToDelete),
      null
    )
  }

  console.log('selectedLanguages', selectedLanguages, chosenLanguage)

  return (
    <Box>
      <Typography sx={styles.title}>
        Velit officia consequat duis enim velit mollit. Other categories you can
        add in your account settings later.
      </Typography>
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
        disabled={!chosenLanguage}
        loading={authLoading}
        onClick={handleAddLanguage}
        sx={styles.button}
        variant='tonal'
      >
        Add one more language
      </AppButton>
      <Typography sx={styles.subtitle}>
        Inputs with the * sign are required
      </Typography>
      <AppChipList
        defaultQuantity={3}
        handleChipDelete={handleDeleteLanguage}
        items={selectedLanguages}
      />
    </Box>
  )
}

export default LanguageStepStudentContent
