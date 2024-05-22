import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useModalContext } from '~/context/modal-context'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

import { styles } from '~/pages/tutor-home/TutorHome.styles'

const TutorHome = () => {
  const { openModal } = useModalContext()
  const { isRegistrationCompleted, userRole } = useSelector(
    (state) => state.appMain
  )

  useEffect(() => {
    if (!isRegistrationCompleted) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: styles.modal
        }
      })
    }
  }, [openModal, isRegistrationCompleted, userRole])

  return <PageWrapper data-testid='tutorHome'>TutorHome Page</PageWrapper>
}

export default TutorHome
