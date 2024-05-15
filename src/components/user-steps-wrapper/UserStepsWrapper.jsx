import { useEffect, useMemo } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { markFirstLoginComplete } from '~/redux/reducer'

import { StepProvider } from '~/context/step-context'
import { useSelector } from 'react-redux'

import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

import { useDispatch } from 'react-redux'
import {
  initialValues,
  validations,
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

const UserStepsWrapper = ({ userRole }) => {
  const { userId, firstName, lastName } = useSelector((state) => state.appMain)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const defaultValues = useMemo(
    () => ({
      ...initialValues,
      firstName,
      lastName
    }),
    [userId]
  )

  const childrenArr = [
    <GeneralInfoStep key='1' />,
    <SubjectsStep key='2' />,
    <LanguageStep key='3' userRole={userRole} />,
    <AddPhotoStep key='4' />
  ]

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

  return (
    <StepProvider
      initialValues={defaultValues}
      stepLabels={stepLabels}
      validations={validations}
    >
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
