import {
  emptyField,
  nameField,
  numberField,
  textField,
  helperTextHandler
} from '~/utils/validations/common'

describe('Test common validations', () => {
  describe('Test const "validations":', () => {
    describe('nameField', () => {
      it('returns validation error message when input value is shorter than 2 and longer than 15 characters', () => {
        const value = 'o'
        const result = nameField(value)
        expect(result).toBe('common.errorMessages.nameLength')
      })
      it('returns validation error message when input value contain not alphabetic characters', () => {
        const value = 'o7'
        const result = nameField(value)
        expect(result).toBe('common.errorMessages.nameAlphabeticOnly')
      })
      it('returns validation error message when value is empty', () => {
        const value = ''
        const result = nameField(value)
        expect(result).toBe('common.errorMessages.emptyField')
      })
      it('returns empty string when value is valid', () => {
        const value = 'John Smith'
        const result = nameField(value)
        expect(result).toBe('')
      })
    })

    describe('numberField', () => {
      it('returns validation error message when input value contain alphabetic characters', () => {
        const value = '67879s'
        const result = numberField(value)
        expect(result).toBe('common.errorMessages.numbersOnly')
      })
      it('returns validation error message when input value contain negative numbers', () => {
        const value = '-6'
        const result = numberField(value)
        expect(result).toBe('common.errorMessages.positiveNumbersOnly')
      })
      it('returns validation error message when value is empty', () => {
        const value = ''
        const result = numberField(value)
        expect(result).toBe('common.errorMessages.emptyField')
      })
      it('returns empty string when value is valid', () => {
        const value = '123'
        const result = numberField(value)
        expect(result).toBe('')
      })
    })

    describe('password', () => {
      it('returns validation error message when input value is shorter than 8 and longer than 25 characters', () => {
        const value = 'ghT6'
        const result = helperTextHandler(value, 'password')
        expect(result).toBe('common.errorMessages.passwordLength')
      })
      it('returns validation error message when input value not contain at least one alphabetic and one numeric character', () => {
        const value = 'ghTfabytr'
        const result = helperTextHandler(value, 'password')
        expect(result).toBe('common.errorMessages.passwordValid')
      })
      it('returns validation error message when value is empty', () => {
        const value = ''
        const result = helperTextHandler(value, 'password')
        expect(result).toBe('common.errorMessages.emptyField')
      })
      it('returns empty string when value is valid', () => {
        const value = 'fhlt6nHeqd'
        const result = helperTextHandler(value, 'password')
        expect(result).toBe('')
      })
    })

    describe('email', () => {
      it('returns validation error message when input value not in valid format', () => {
        const value = 'johnDoe.com'
        const result = helperTextHandler(value, 'email')
        expect(result).toBe('common.errorMessages.emailValid')
      })
      it('returns validation error message when value is empty', () => {
        const value = ''
        const result = helperTextHandler(value, 'email')
        expect(result).toBe('common.errorMessages.emptyField')
      })
      it('returns empty string when value is valid', () => {
        const value = 'john777@gmail.com'
        const result = helperTextHandler(value, 'email')
        expect(result).toBe('')
      })
    })
  })

  describe('Test const "emptyField":', () => {
    it('returns empty message when value is empty', () => {
      const emptyMessage = 'This field is required'
      const value = ''
      const result = emptyField(value, emptyMessage)
      expect(result).toBe(emptyMessage)
    })

    it('returns helper text when value is not empty', () => {
      const helperText = 'Helper text'
      const value = 'Test Value'
      const result = emptyField(value, '', helperText)
      expect(result).toBe(helperText)
    })
  })

  describe('Test const "textField":', () => {
    it('returns short text message when text length is less than minimum', () => {
      const min = 2
      const max = 10
      const value = 'a'
      const result = textField(min, max)(value)
      expect(result).toBe('common.errorMessages.shortText')
    })

    it('returns long text message when text length is greater than maximum', () => {
      const min = 2
      const max = 5
      const value = 'This is a long text'
      const result = textField(min, max)(value)
      expect(result).toBe('common.errorMessages.longText')
    })
  })

  describe('Test const "helperTextHandler":', () => {
    it('returns empty message when value is empty', () => {
      const value = ''
      const marker = 'nameField'
      const result = helperTextHandler(value, marker)
      expect(result).toBe('common.errorMessages.emptyField')
    })

    it('returns validation error message when value is invalid', () => {
      const value = 'a'
      const marker = 'nameField'
      const result = helperTextHandler(value, marker)
      expect(result).not.toBe('')
    })

    it('returns empty string when value is valid', () => {
      const value = 'John Doe'
      const marker = 'nameField'
      const result = helperTextHandler(value, marker)
      expect(result).toBe('')
    })
  })
})
