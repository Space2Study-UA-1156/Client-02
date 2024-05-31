import { useState, useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AsyncAutocomplete from '~/components/async-autocomplete/AsyncAutocomplete'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppButton from '~/components/app-button/AppButton'

import SubjectsStepImage from '~/assets/img/subjects-step/image.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

import useBreakpoints from '~/hooks/use-breakpoints'
import { useStepContext } from '~/context/step-context'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

const SubjectsStep = ({ btnsBox, userRole }) => {
  const { t } = useTranslation()
  const { isMobile, isLaptopAndAbove } = useBreakpoints()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const isTutor = userRole === 'tutor'

  const {
    subjectLabel,
    data,
    handleStepData,
    handleNonInputValueChange,
    handleBlur,
    errors
  } = useStepContext()

  useEffect(() => {
    setSelectedSubject(null)
  }, [selectedCategory])

  const getOptionLabel = useCallback((option) => option.name, [])
  const categoriesOptions = useMemo(
    () => ({
      label: isTutor
        ? t('becomeTutor.categories.mainSubjectsLabel')
        : t('becomeStudent.categories.mainSubjectsLabel')
    }),
    /* eslint-disable-next-line */
    [isTutor]
  )

  const subjectsOptions = useMemo(
    () => ({
      label: isTutor
        ? t('becomeTutor.categories.subjectLabel')
        : t('becomeStudent.categories.subjectLabel'),
      required: true,
      error: Boolean(errors.subject) && !!selectedCategory,
      helperText: selectedCategory ? t(errors.subject) : ''
    }),
    /* eslint-disable-next-line */
    [isTutor, errors.subjects]
  )

  const handleSelectedValue = useCallback(
    (func) => (event, selectedValue) => {
      func(selectedValue)
    },
    []
  )

  const getSubjects = useCallback(
    (categoryId) => () => {
      return subjectService.getSubjectsNames(categoryId)
    },
    []
  )

  const handleAddSubject = () => {
    const updatedSubjects = [...data.subjects, selectedSubject]
    handleNonInputValueChange('subjects', updatedSubjects)
    handleStepData(subjectLabel, updatedSubjects, errors)
    setSelectedSubject(null)
  }

  const handleDeleteSubject = (itemName) => {
    const updatedSubjects = data.subjects.filter(
      (subject) => subject.name !== itemName
    )
    handleNonInputValueChange('subjects', updatedSubjects)
    handleStepData(subjectLabel, updatedSubjects, null)
  }

  const image = (
    <Box sx={styles.imgContainer}>
      <Box
        alt='Girl studying'
        component='img'
        src={SubjectsStepImage}
        sx={styles.img}
      />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && image}
      <Box id='formContainer' sx={styles.formContainer}>
        <Box>
          <Typography sx={styles.title}>
            {isTutor
              ? t('becomeTutor.categories.title')
              : t('becomeStudent.categories.title')}
          </Typography>
          {isMobile && image}
          <Box component='form'>
            <AsyncAutocomplete
              fetchOnFocus
              getOptionLabel={getOptionLabel}
              onChange={handleSelectedValue(setSelectedCategory)}
              service={categoryService.getCategoriesNames}
              sx={styles.autocomplete}
              textFieldProps={categoriesOptions}
              value={selectedCategory}
            />
            <AsyncAutocomplete
              disabled={selectedCategory ? false : true}
              fetchCondition={selectedCategory}
              fetchOnFocus
              getOptionLabel={getOptionLabel}
              onBlur={handleBlur('subjects')}
              onChange={handleSelectedValue(setSelectedSubject)}
              service={getSubjects(selectedCategory?._id)}
              sx={styles.autocomplete}
              textFieldProps={subjectsOptions}
              value={selectedSubject}
            />
            <AppButton
              disabled={
                selectedCategory === null ||
                selectedSubject === null ||
                data.subjects.some((item) => item._id === selectedSubject._id)
              }
              onClick={handleAddSubject}
              sx={styles?.button}
              variant={'tonal'}
            >
              {isTutor
                ? t('becomeTutor.categories.btnText')
                : t('becomeStudent.categories.btnText')}
            </AppButton>
            <AppChipList
              defaultQuantity={3}
              handleChipDelete={handleDeleteSubject}
              items={data.subjects.map((subject) => subject.name)}
            />
          </Box>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
