import {
  requiredSelect,
  requiredInput,
  textField
} from '~/utils/validations/common'

export const maxLengthTextField = 999

export const validations = {
  newSubject: requiredInput,
  newCategory: requiredSelect,
  additionalInformation: textField(0, maxLengthTextField)
}
