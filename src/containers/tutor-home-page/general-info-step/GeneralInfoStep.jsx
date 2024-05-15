import { useCallback, useMemo, useEffect, memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppTextField from '~/components/app-text-field/AppTextField'

import { LocationService } from '~/services/location-service'
import { useStepContext } from '~/context/step-context'
import { maxLengthTextField } from '~/components/user-steps-wrapper/constants'

import image from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const {
    handleInputChange,
    handleSelectChange,
    handleBlur,
    errors,
    data,
    handleStepData
  } = useStepContext()

  useEffect(() => {
    handleStepData('generalInfo', data, errors)
  }, [handleStepData, data, errors])

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
          <AppTextField
            errorMsg={t(errors.firstName)}
            label={t('becomeTutor.generalInfo.inputFirstName')}
            onBlur={handleBlur('firstName')}
            onChange={handleInputChange('firstName')}
            required
            type='text'
            value={data.firstName}
          />
          <AppTextField
            errorMsg={t(errors.lastName)}
            label={t('becomeTutor.generalInfo.inputLastName')}
            onBlur={handleBlur('lastName')}
            onChange={handleInputChange('lastName')}
            required
            type='text'
            value={data.lastName}
          />
          <FormControl>
            <AsyncAutocomplete
              fetchOnFocus={!data.country}
              onBlur={handleBlur('country')}
              onChange={handleSelectChange('country')}
              service={LocationService.getCountries}
              textFieldProps={countriesOptions}
              value={data.country}
            />
          </FormControl>
          <FormControl>
            <AsyncAutocomplete
              fetchOnFocus={!data.city}
              onBlur={handleBlur('city')}
              onChange={handleSelectChange('city')}
              service={getCities(data.country)}
              textFieldProps={citiesOptions}
              value={data.city}
            />
          </FormControl>
        </Box>
        <AppTextField
          errorMsg={t(errors.professionalSummary)}
          fullWidth
          inputProps={{ maxLength: maxLengthTextField + 1 }}
          multiline
          onBlur={handleBlur('professionalSummary')}
          onChange={handleInputChange('professionalSummary')}
          placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
          rows={4}
          type='text'
          value={data.professionalSummary}
        />
        <Typography
          sx={styles.summaryLength}
        >{`${data.professionalSummary?.length}/${maxLengthTextField}`}</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={data.legalAge}
              onBlur={handleBlur('legalAge')}
              onChange={handleInputChange('legalAge')}
              type='checkbox'
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

export default memo(GeneralInfoStep)
