import { nameField, textField } from '~/utils/validations/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  professionalSummary: '',
  legalAge: false
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  professionalSummary: textField(0, 100)
}

export const tutorStepLabels = ['generalInfo', 'subjects', 'language', 'photo']
export const studentStepLabels = [
  'generalInfo',
  'interests',
  'language',
  'photo'
]
