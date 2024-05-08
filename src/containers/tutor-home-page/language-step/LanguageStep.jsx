import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import image from '~/assets/img/language-step/image.svg'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const LanguageStep = ({ btnsBox }) => {
  const languageImg = image

  const languages = [
    'English',
    'Ukrainian',
    'Polish',
    'French',
    'Spanish',
    'Arabic'
  ]

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='languages'
          component='img'
          src={languageImg}
          sx={styles.img}
        />
      </Box>
      <Box id='form' sx={styles.formContainer}>
        <Box>
          <Typography sx={styles.title}>
            Please select the language in which you would like to study and
            cooperate.
          </Typography>

          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={languages}
            renderInput={(params) => (
              <TextField {...params} label='Your native language' />
            )}
            sx={{ width: '100%' }}
          />
        </Box>
        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default LanguageStep
