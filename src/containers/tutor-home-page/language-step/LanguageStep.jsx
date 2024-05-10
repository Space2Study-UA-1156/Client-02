import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import image from '~/assets/img/language-step/image.svg'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useStepContext } from '~/context/step-context'
import { languages } from '~/containers/tutor-home-page/language-step/constants'
import LanguageStepStudentContent from '~/containers/student-home-page/language-step/LanguageStepContent'
import { useTranslation } from 'react-i18next'

const LanguageStep = ({ btnsBox, userRole }) => {
  const { t } = useTranslation()

  const { stepData, handleStepData } = useStepContext()
  const { language } = stepData

  const isTutor = userRole === 'tutor'

  const handleLanguageChange = (event, value) => {
    handleStepData('language', value, null)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='languages' component='img' src={image} sx={styles.img} />
      </Box>
      <Box id='formContainer' sx={styles.formContainer}>
        {isTutor ? (
          <Box>
            <Typography id='title' sx={styles.title}>
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
              onChange={handleLanguageChange}
              options={languages}
              renderInput={(params) => (
                <TextField {...params} label='Your native language' />
              )}
              sx={{ width: '100%' }}
              value={language}
            />
          </Box>
        ) : (
          <LanguageStepStudentContent />
        )}

        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default LanguageStep
