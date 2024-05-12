import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Typography,
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import { LocationService } from '~/services/location-service'
import { useStepContext } from '~/context/step-context'

import image from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { generalLabel, stepData, handleStepData } = useStepContext()

  const {
    firstName = '',
    lastName = '',
    country = '',
    city = '',
    professionalSummary = '',
    legalAge = false
  } = stepData?.generalInfo?.data || {}

  const countriesOptions = useMemo(
    () => ({
      label: t('becomeTutor.generalInfo.selectCountry')
    }),
    [t]
  )

  const citiesOptions = useMemo(
    () => ({
      label: t('becomeTutor.generalInfo.selectCity')
    }),
    [t]
  )

  const getCities = useCallback(
    (country) => () => LocationService.getCities(country),
    []
  )

  const handleInputChange = useCallback(
    (fieldName) =>
      ({ target: { value } }) => {
        handleStepData(generalLabel, {
          ...stepData.generalInfo.data,
          [fieldName]: value
        })
      },
    [generalLabel, handleStepData, stepData.generalInfo.data]
  )

  const handleSelectedValue = useCallback(
    (fieldName) => (event, selectedValue) => {
      handleStepData(generalLabel, {
        ...stepData.generalInfo.data,
        [fieldName]: selectedValue
      })
    },
    [generalLabel, handleStepData, stepData.generalInfo.data]
  )

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
            label={t('becomeTutor.generalInfo.inputFirstName')}
            onChange={handleInputChange('firstName')}
            required
            value={firstName ?? ''}
          />
          <TextField
            label={t('becomeTutor.generalInfo.inputLastName')}
            onChange={handleInputChange('lastName')}
            required
            value={lastName ?? ''}
          />
          <FormControl>
            <AsyncAutocomplete
              fetchOnFocus={!country}
              onChange={handleSelectedValue('country')}
              service={LocationService.getCountries}
              textFieldProps={countriesOptions}
              value={country}
            />
          </FormControl>
          <FormControl>
            <AsyncAutocomplete
              fetchOnFocus={!city}
              onChange={handleSelectedValue('city')}
              service={getCities(country)}
              textFieldProps={citiesOptions}
              value={city}
            />
          </FormControl>
        </Box>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          multiline
          onChange={handleInputChange('professionalSummary')}
          placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
          rows={4}
          value={professionalSummary ?? ''}
        />
        <Typography
          sx={styles.summaryLength}
        >{`${professionalSummary?.length}/100`}</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={legalAge}
              onChange={handleSelectedValue('legalAge')}
            />
          }
          label={t('becomeTutor.generalInfo.checkboxAgeVerification')}
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
