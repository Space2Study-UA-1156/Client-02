import { screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import RequestNewCategoryDialog from '~/containers/student-home-page/request-new-category/request-new-category-dialog/RequestNewCategoryDialog'

const propsSpy = vi.fn()

vi.mock(
  '~/containers/student-home-page/request-new-category/request-new-category-dialog/constants',
  async (importOriginal) => {
    const mod = await importOriginal()
    return {
      ...mod,
      validations: 'validation rules'
    }
  }
)

vi.mock('~/constants', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    snackbarVariants: {
      success: 'success',
      error: 'error'
    }
  }
})

const handleSubmitMock = vi.fn(() => Promise.resolve())
const handleInputChangeMock = vi.fn()
const handleSelectChangeMock = vi.fn()
const handleBlurMock = vi.fn()
const dataMock = {
  subject: 'new subject',
  category: 'new category',
  addInfo: 'additional information'
}
let onSubmitMock
const useFormMock = vi.hoisted(() => {
  return vi.fn(({ onSubmit } = {}) => {
    onSubmitMock = onSubmit
    return {
      handleSubmit: handleSubmitMock,
      handleInputChange: handleInputChangeMock,
      handleSelectChange: handleSelectChangeMock,
      handleBlur: handleBlurMock,
      data: dataMock,
      errors: 'errors'
    }
  })
})
vi.mock('~/hooks/use-form', async () => ({
  default: useFormMock
}))

const closeModalMock = vi.fn()
vi.mock('~/context/modal-context', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    useModalContext: () => ({
      closeModal: closeModalMock
    })
  }
})

const setAlertMock = vi.fn()
vi.mock('~/context/snackbar-context', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    useSnackBarContext: () => ({
      setAlert: setAlertMock
    })
  }
})

const createUserRequestMock = vi.hoisted(() => {
  return vi.fn()
})
vi.mock('~/services/user-request-service', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    userRequestService: {
      createUserRequest: createUserRequestMock
    }
  }
})

vi.mock('@mui/material/Box', () => ({
  default: (props) => {
    return (
      <div data-testid='mock-box' {...props}>
        {props.children}
      </div>
    )
  }
}))

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  default: (props) => {
    return (
      <div data-testid='mock-titleWithDescription' {...props}>
        {props.children}
      </div>
    )
  }
}))

vi.mock(
  '~/containers/student-home-page/request-new-category/request-new-category-form/RequestNewCategoryForm',
  () => ({
    default: (props) => {
      propsSpy(props)
      return (
        <div data-testid='mock-requestNewCategoryForm' {...props}>
          {props.children}
        </div>
      )
    }
  })
)

describe('Test "RequestNewCategoryDialog" container:', () => {
  beforeEach(() => {
    propsSpy.mockReset()
    vi.clearAllMocks()
    renderWithProviders(<RequestNewCategoryDialog />)
  })

  it('should render "RequestNewCategoryDialog" main image', () => {
    const mockBoxElements = screen.getAllByTestId('mock-box')
    const imageSrcAttribute = mockBoxElements[2].getAttribute('src')
    expect(imageSrcAttribute).toBeTruthy()
    expect(imageSrcAttribute).toBe(
      '/src/assets/img/student-home-page/requestNewCategory.svg'
    )
  })

  it('should render "TitleWithDescription" properly', () => {
    const titleWithDescriptionElement = screen.getByTestId(
      'mock-titleWithDescription'
    )
    expect(titleWithDescriptionElement).toBeInTheDocument()
    expect(titleWithDescriptionElement.getAttribute('description')).toBe(
      'studentHomePage.requestNewCategory.description'
    )
    expect(titleWithDescriptionElement.getAttribute('title')).toBe(
      'studentHomePage.requestNewCategory.title'
    )
  })

  it('should render "RequestNewCategoryForm" properly', () => {
    const requestNewCategoryFormElement = screen.getByTestId(
      'mock-requestNewCategoryForm'
    )
    expect(requestNewCategoryFormElement).toBeInTheDocument()
    expect(propsSpy).toHaveBeenCalledWith({
      data: dataMock,
      errors: 'errors',
      handleSubmit: handleSubmitMock,
      handleInputChange: handleInputChangeMock,
      handleSelectChange: handleSelectChangeMock,
      handleBlur: handleBlurMock
    })
  })

  it('should call "useForm" hook', () => {
    expect(useFormMock).toHaveBeenCalled()
  })

  it('should invoke handleSubmit when form is submitted', async () => {
    const handleSubmitMock = useFormMock().handleSubmit
    handleSubmitMock()
    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalled()
    })
  })

  it('should call setAlert and closeModal when form is submitted successfully', async () => {
    onSubmitMock()
    await waitFor(() => {
      expect(setAlertMock).toHaveBeenCalledWith({
        severity: 'success',
        message: 'studentHomePage.requestNewCategory.successMessage'
      })
      expect(closeModalMock).toHaveBeenCalled()
    })
  })

  it('should call setAlert with error message when form submission fails', async () => {
    const databaseError = new Error('Database error')
    createUserRequestMock.mockRejectedValue(databaseError)
    onSubmitMock()
    await waitFor(() => {
      expect(setAlertMock).toHaveBeenCalledWith({
        severity: 'error',
        message: `errors.Error: ${databaseError.message}`
      })
      expect(closeModalMock).not.toHaveBeenCalled()
    })
  })
})
