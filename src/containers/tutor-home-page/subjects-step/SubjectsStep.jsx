import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import SubjectsStepImage from '~/assets/img/subjects-step/image.svg'
const SubjectsStep = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      <Box
        alt='Girl studying'
        component='img'
        src={SubjectsStepImage}
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 }
        }}
      />
      <Box sx={styles.rigthBox}>
        Subjects step
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
