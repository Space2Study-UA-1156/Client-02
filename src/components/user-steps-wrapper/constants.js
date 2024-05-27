import {
  nameField,
  textField,
  requiredSelect,
  is18yo,
  photoUploaded
} from '~/utils/validations/common'

export const generalInfoInitialValues = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  professionalSummary: '',
  legalAge: false
}

export const subjectsInitialValues = {
  subjects: []
}

export const languagesInitialValues = {
  languages: []
}

export const photoInitialValues = {
  photo: null
}

export const initialValues = {
  ...generalInfoInitialValues,
  ...subjectsInitialValues,
  ...languagesInitialValues,
  ...photoInitialValues
}

export const maxLengthTextField = 100

export const validations = (userRole) => {
  const commonValidations = {
    firstName: nameField,
    lastName: nameField,
    country: requiredSelect,
    city: requiredSelect,
    professionalSummary: textField(0, maxLengthTextField),
    legalAge: is18yo,
    subjects: requiredSelect,
    languages: requiredSelect
  }
  if (userRole === 'tutor') {
    return {
      ...commonValidations,
      photo: photoUploaded
    }
  }
  return commonValidations
}

export const tutorStepLabels = ['generalInfo', 'subjects', 'language', 'photo']
export const studentStepLabels = [
  'generalInfo',
  'interests',
  'language',
  'photo'
]
