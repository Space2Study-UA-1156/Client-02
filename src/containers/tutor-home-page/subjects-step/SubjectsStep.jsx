import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import SubjectsStepImage from '~/assets/img/subjects-step/image.svg'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppButton from '~/components/app-button/AppButton'



import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import { categoriesMock, languagesMock } from '~/containers/tutor-home-page/subjects-step/constants'
import { useStepContext } from '~/context/step-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useTranslation } from 'react-i18next'

const SubjectsStep = ({ btnsBox, userRole }) => {
  const { t } = useTranslation()
  const { isMobile, isTablet, isLaptopAndAbove } = useBreakpoints()
  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState(null)
  const { stepData, handleStepData } = useStepContext()
  const subjectLabel = userRole === 'student' ? 'interests' : 'subjects'
  const selectedSubjects = stepData[subjectLabel] ?? []

  const handleChangeCategory = (e, categoryValue) => {
    setCategory(categoryValue)
  }

  const handleChangeSubject = (e, subjectValue) => {
    setSubject(subjectValue)
  }

  const handleAddSubject = () => {
    if (selectedSubjects.find((item) => item.name === subject.name)) {
      setSubject(null)
      return
    }
    handleStepData(subjectLabel, [...selectedSubjects, subject])
    setSubject(null)
  }

  const handleDeleteSubject = (subjectName) => {
    handleStepData(
      subjectLabel,
      selectedSubjects.filter((subject) => subject.name !== subjectName)
    )
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
          <Typography>
            {t('becomeTutor.categories.title')}
          </Typography>
          {isMobile && image}

          <Box component='form' sx={styles.form}>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              getOptionLabel={(option) => option.name}
              options={categoriesMock}
              onChange={handleChangeCategory}
              renderInput={(params) => (
                <TextField {...params} label={t('becomeTutor.categories.mainSubjectsLabel')} />
              )}
              sx={styles.inputField}
            />
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              getOptionLabel={(option) => option.name}
              options={languagesMock}
              onChange={handleChangeSubject}
              renderInput={(params) => (
                <TextField {...params} label={t('becomeTutor.categories.subjectLabel')} />
              )}
              sx={styles.inputField}
            />
            <AppButton 
              disabled={subject === null ? true : false}
              onClick={handleAddSubject} 
              variant={'tonal'}
            >
              {t('becomeTutor.categories.btnText')}
            </AppButton>

            <AppChipList
              defaultQuantity={2}
              handleChipDelete={handleDeleteSubject}
              items={selectedSubjects.map((subject) => subject.name)}
            />
          </Box>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
