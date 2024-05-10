import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import SubjectsStepImage from '~/assets/img/subjects-step/image.svg'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import { categoriesMock, languagesMock } from '~/containers/tutor-home-page/subjects-step/constants'
import AppButton from '~/components/app-button/AppButton'
import { useStepContext } from '~/context/step-context'
import AppChipList from '~/components/app-chips-list/AppChipList'

const SubjectsStep = ({ btnsBox, userRole }) => {
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

  return (
    <Box sx={styles.container}>
      <Box
        alt='Girl studying'
        component='img'
        src={SubjectsStepImage}
        sx={styles.image}
      />
      <Box sx={styles.rigthBox}>
        <Box sx={styles.titleWithForm}>
          <Typography>
            Velit officia consequat duis enim velit mollit. Other categories you can add in your account settings later.
          </Typography>
          <Box component='form' sx={styles.form}>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              getOptionLabel={(option) => option.name}
              options={categoriesMock}
              onChange={handleChangeCategory}
              renderInput={(params) => (
                <TextField {...params} label='Main Tutoring Category' />
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
                <TextField {...params} label='Subject' />
              )}
              sx={styles.inputField}
            />
            <AppButton 
              disabled={subject === null ? true : false}
              onClick={handleAddSubject} 
              variant={'tonal'}
            >
              Add one more subject
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
