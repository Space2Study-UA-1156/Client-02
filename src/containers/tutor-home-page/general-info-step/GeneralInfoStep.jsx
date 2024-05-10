import { useTranslation } from 'react-i18next'
import {
  Typography,
  Box,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import image from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

import { useStepContext } from '~/context/step-context'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  const { generalLabel, stepData, handleStepData } = useStepContext()

  const { t } = useTranslation()

  const handleInputChange = (event, fieldName) => {
    handleStepData(
      generalLabel,
      {
        ...stepData.generalInfo.data,
        [fieldName]: event.target.value
      },
      stepData.generalInfo.isAdult,
      stepData.generalInfo.errors
    )
  }

  const handleCheckboxChange = () => {
    handleStepData(
      generalLabel,
      {
        ...stepData.generalInfo.data
      },
      !stepData.generalInfo.isAdult,
      stepData.generalInfo.errors
    )
  }

  const countries = [
    { label: 'Ukraine', id: 'ua' },
    { label: 'Spain', id: 'es' },
    { label: 'France', id: 'fr' }
  ]

  const cities = [
    { label: 'Lviv', id: 'lv', country: 'ua' },
    { label: 'Kyiv', id: 'kv', country: 'ua' },
    { label: 'Ternopil', id: 'tl', country: 'ua' }
  ]

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='General Step' component='img' src={image} sx={styles.img} />
      </Box>
      <Box sx={styles.formWrapper}>
        <Typography sx={styles.title}>
          {t('becomeTutor.generalInfo.title')}
        </Typography>
        <Box
          alt='General Step'
          component='img'
          src={image}
          sx={styles.imgMobile}
        />
        <Box sx={styles.form}>
          <TextField
            label={'First Name'}
            onChange={() => handleInputChange(event, 'firstName')}
            required
            value={stepData?.generalInfo?.data?.firstName ?? ''}
          />
          <TextField
            label={'Last Name'}
            onChange={() => handleInputChange(event, 'lastName')}
            required
            value={stepData?.generalInfo?.data?.lastName ?? ''}
          />
          <FormControl>
            <InputLabel sx={styles.inputLabel}>Country</InputLabel>
            <Select
              label='Country'
              onChange={(event) => handleInputChange(event, 'country')}
              value={stepData?.generalInfo?.data?.country ?? ''}
            >
              {countries.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel sx={styles.inputLabel}>City</InputLabel>
            <Select
              label='City'
              onChange={(event) => handleInputChange(event, 'city')}
              value={stepData?.generalInfo?.data?.city ?? ''}
            >
              {cities.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField
          fullWidth
          inputProps={{ maxLength: 70 }}
          multiline
          onChange={() => handleInputChange(event, 'professionalSummary')}
          placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
          rows={4}
          value={stepData?.generalInfo?.data?.professionalSummary ?? ''}
        />
        <Typography
          sx={styles.summaryLength}
        >{`${stepData?.generalInfo?.data?.professionalSummary?.length}/70`}</Typography>
        <FormControlLabel
          checked={stepData?.generalInfo?.isAdult}
          control={<Checkbox onChange={handleCheckboxChange} />}
          label='I confirm that I am over 18 years old'
        />
        <Typography sx={styles.requiredLabel}>
          {t('becomeTutor.generalInfo.helperText')}
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
