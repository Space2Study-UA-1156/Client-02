import { useTranslation } from 'react-i18next'
import { useState, useMemo, useCallback } from 'react'

import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import AsyncAutocomplete from '~/components/async-autocomplete/AsyncAutocomplete'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'

import { useStepContext } from '~/context/step-context'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

import image from '~/assets/img/language-step/image.svg'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'

const LanguageStep = ({ btnsBox, userRole }) => {
  const { t } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const isTutor = userRole === 'tutor'

  const {
    languageLabel,
    data,
    handleStepData,
    handleNonInputValueChange,
    handleBlur,
    errors
  } = useStepContext()

  const getOptionLabel = useCallback((option) => option.name, [])
  const languageOptions = useMemo(
    () => ({
      label: isTutor
        ? t('becomeTutor.languages.autocompleteLabel')
        : t('becomeStudent.languages.autocompleteLabel'),
      required: true,
      error: Boolean(errors.languages),
      helperText: t(errors.languages)
    }),
    /* eslint-disable-next-line */
    [isTutor, errors.languages]
  )

  const handleSelectedValue = useCallback(
    () => (event, selectedValue) => {
      setSelectedLanguage(selectedValue)
    },
    []
  )

  const getIdLanguageCategory = useCallback(async () => {
    const listCategories = await categoryService.getCategoriesNames()
    const languageCategory = listCategories.data.find(
      (category) => category.name === 'Languages'
    )
    return languageCategory ? languageCategory._id : errors
  }, [errors])

  const getLanguages = useCallback(async () => {
    const idLanguageCategory = await getIdLanguageCategory()
    return subjectService.getSubjectsNames(idLanguageCategory)
  }, [getIdLanguageCategory])

  const handleAddLanguage = () => {
    const updatedLanguages = [...data.languages, selectedLanguage]
    handleNonInputValueChange('languages', updatedLanguages)
    handleStepData(languageLabel, updatedLanguages, errors)
    setSelectedLanguage(null)
  }

  const handleDeleteLanguage = (itemName) => {
    const updatedLanguages = data.languages.filter(
      (language) => language.name !== itemName
    )
    handleNonInputValueChange('languages', updatedLanguages)
    handleStepData(languageLabel, updatedLanguages, null)
  }

  const handleAddTutorLanguage = useCallback(
    () => (event, selectedValue) => {
      handleNonInputValueChange('languages', selectedValue)
      handleStepData(languageLabel, selectedValue, null)
    },
    [languageLabel, handleNonInputValueChange, handleStepData]
  )

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='languages' component='img' src={image} sx={styles.img} />
      </Box>
      <Box id='formContainer' sx={styles.formContainer}>
        <Box>
          <Typography id='title' sx={styles.title}>
            {isTutor
              ? t('becomeTutor.languages.title')
              : t('becomeStudent.languages.title')}
          </Typography>
          <Box
            alt='General Step'
            component='img'
            src={image}
            sx={styles.imgMobile}
          />
          <AsyncAutocomplete
            fetchOnFocus={isTutor ? !data.languages : !selectedLanguage}
            getOptionLabel={getOptionLabel}
            onBlur={handleBlur('languages')}
            onChange={
              isTutor ? handleAddTutorLanguage() : handleSelectedValue()
            }
            service={getLanguages}
            textFieldProps={languageOptions}
            value={isTutor ? data.languages : selectedLanguage}
          />
          {!isTutor && (
            <>
              <AppButton
                disabled={
                  selectedLanguage === null ||
                  data.languages.some(
                    (item) => item._id === selectedLanguage._id
                  )
                }
                onClick={handleAddLanguage}
                sx={styles?.button}
                variant='tonal'
              >
                {isTutor
                  ? t('becomeTutor.languages.btnText')
                  : t('becomeStudent.languages.btnText')}
              </AppButton>
              <AppChipList
                defaultQuantity={3}
                handleChipDelete={handleDeleteLanguage}
                items={data.languages.map((language) => language.name)}
              />
            </>
          )}
        </Box>
        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default LanguageStep
