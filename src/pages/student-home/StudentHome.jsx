import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

import { useSelector } from 'react-redux'
import Faq from '~/containers/student-home-page/faq/Faq'
import { useModalContext } from '~/context/modal-context'

const StudentHome = () => {
  const { openModal } = useModalContext()
  const { isRegistrationCompleted, userRole } = useSelector(
    (state) => state.appMain
  )

  useEffect(() => {
    if (!isRegistrationCompleted) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: {
            maxHeight: { sm: '670px', lg: '690px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        }
      })
    }
  }, [openModal, isRegistrationCompleted, userRole])

  return (
    <Box
      sx={{ backgroundColor: 'backgroundColor', flex: 1, overflowY: 'auto' }}
    >
      <Container data-testid='studentHome' sx={{ pt: 6 }}>
        {/*implement here*/}
        <Faq />
      </Container>
    </Box>
  )
}

export default StudentHome
