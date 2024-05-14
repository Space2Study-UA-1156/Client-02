import * as common from '~/utils/validations/common'
import {
  confirmPassword,
  email,
  firstName,
  lastName,
  password
} from '~/utils/validations/login'

vi.spyOn(common, 'helperTextHandler')
vi.spyOn(common, 'nameField')
vi.spyOn(common, 'emptyField')

describe('Test login validations', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('email', () => {
    email('value')
    expect(common.helperTextHandler).toHaveBeenCalled()
  })
  it('password', () => {
    password('value')
    expect(common.helperTextHandler).toHaveBeenCalled()
  })
  it('firstName', () => {
    firstName('value')
    expect(common.nameField).toHaveBeenCalled()
  })
  it('lastName', () => {
    lastName('value')
    expect(common.nameField).toHaveBeenCalled()
  })
  it('confirmPassword', () => {
    confirmPassword('password', 'data')
    expect(common.emptyField).toHaveBeenCalled()
  })

  describe('expanded "confirmPassword" testing suite:', () => {
    afterEach(() => {
      vi.clearAllMocks()
      vi.resetAllMocks()
    })
    it('returns "emptyField" func with the third parameter as helperText with error message [when input password and confirmPassword are different]', () => {
      const password = ''
      const data = { password: 'testPassword' }
      confirmPassword(password, data)
      expect(common.emptyField).toHaveBeenCalledWith(
        '',
        'common.errorMessages.passwordsDontMatch',
        'common.errorMessages.passwordsDontMatch'
      )
    })
    it('returns "emptyField" func with the third parameter as helperText with an empty string [when input password and confirmPassword are equal]', () => {
      const password = 'testPassword'
      const data = { password: 'testPassword' }
      confirmPassword(password, data)
      expect(common.emptyField).toHaveBeenCalledWith(
        'testPassword',
        'common.errorMessages.passwordsDontMatch',
        ''
      )
    })
  })
})
