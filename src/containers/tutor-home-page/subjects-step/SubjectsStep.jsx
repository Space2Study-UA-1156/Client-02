import { useState, useMemo, useCallback } from 'react'
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
  const subjectLabel = userRole === 'student' ? 'interests' : 'subjects'

  const { stepData, handleStepData } = useStepContext()
  const getOptionLabel = useCallback((option) => option.name, [])
  const categoriesOptions = useMemo(
    () => ({
      label: t('becomeTutor.categories.mainSubjectsLabel')
    }),
    [t]
  )

  const subjectsOptions = useMemo(
    () => ({
      label: t('becomeTutor.categories.subjectLabel')
    }),
    [t]
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

  const subjectData = stepData[subjectLabel]

  const handleAddSubject = () => {
    handleStepData(subjectLabel, [...subjectData, selectedSubject], null)
    setSelectedSubject(null)
  }

  const handleDeleteSubject = (index) => {
    const updatedSubjects = [...subjectData]
    updatedSubjects.splice(index, 1)
    handleStepData(subjectLabel, updatedSubjects, null)
  }

  const image = (
    <Box
      alt='Girl studying'
      component='img'
      src={SubjectsStepImage}
      sx={styles.image}
    />
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && image}
      <Box sx={styles.rigthBox}>
        <Box sx={styles.titleWithForm}>
          <Typography>{t('becomeTutor.categories.title')}</Typography>
          {isMobile && image}
          <Box component='form' sx={styles.form}>
            <AsyncAutocomplete
              fetchOnFocus
              getOptionLabel={getOptionLabel}
              onChange={handleSelectedValue(setSelectedCategory)}
              service={categoryService.getCategoriesNames}
              textFieldProps={categoriesOptions}
              value={selectedCategory}
            />
            <AsyncAutocomplete
              fetchCondition={selectedCategory}
              fetchOnFocus
              getOptionLabel={getOptionLabel}
              onChange={handleSelectedValue(setSelectedSubject)}
              service={getSubjects(selectedCategory?._id)}
              textFieldProps={subjectsOptions}
              value={selectedSubject}
            />
            <AppButton
              disabled={
                selectedCategory === null ||
                selectedSubject === null ||
                subjectData.some((item) => item._id === selectedSubject._id)
              }
              onClick={handleAddSubject}
              variant={'tonal'}
            >
              {t('becomeTutor.categories.btnText')}
            </AppButton>
            <AppChipList
              defaultQuantity={3}
              handleChipDelete={handleDeleteSubject}
              items={subjectData.map((subject) => subject.name)}
            />
          </Box>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
