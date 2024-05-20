import { useMemo } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

import {
  initialValues,
  validations,
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { StepProvider } from '~/context/step-context'
import { useSelector } from 'react-redux'
import { student } from '~/constants'

const UserStepsWrapper = ({ userRole }) => {
  const { userId, firstName, lastName } = useSelector((state) => state.appMain)

  const defaultValues = useMemo(
    () => ({
      ...initialValues,
      firstName,
      lastName
    }),
    /* eslint-disable-next-line */
    [userId]
  )

  const childrenArr = [
    <GeneralInfoStep key='1' />,
    <SubjectsStep key='2' userRole={userRole} />,
    <LanguageStep key='3' userRole={userRole} />,
    <AddPhotoStep key='4' />
  ]

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

  return (
    <StepProvider
      initialValues={defaultValues}
      stepLabels={stepLabels}
      validations={validations(userRole)}
    >
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
