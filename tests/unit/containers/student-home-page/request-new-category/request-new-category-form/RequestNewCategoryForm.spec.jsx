import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import RequestNewCategoryForm from '~/containers/student-home-page/request-new-category/request-new-category-form/RequestNewCategoryForm'

const errorsMock = { subject: '', category: '', addInformation: '' }
const dataMock = {
  subject: 'new subject',
  category: 'new category',
  addInformation: 'some additional information'
}

vi.mock('@mui/material/Box', () => ({
  default: (props) => {
    return (
      <div data-testid='mock-box' {...props}>
        {props.children}
      </div>
    )
  }
}))

vi.mock('@mui/material/Typography', () => ({
  default: (props) => {
    return (
      <p data-testid='mock-typography' {...props}>
        {props.children}
      </p>
    )
  }
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: (props) => {
    return (
      <button data-testid='mock-appButton' {...props}>
        {props.children}
      </button>
    )
  }
}))

vi.mock('~/components/app-text-area/AppTextArea', () => ({
  default: (props) => {
    return (
      <textarea data-testid='mock-appTextArea' {...props}>
        {props.children}
      </textarea>
    )
  }
}))

vi.mock('~/components/app-text-field/AppTextField', () => ({
  default: (props) => {
    return (
      <textarea data-testid='mock-appTextField' {...props}>
        {props.children}
      </textarea>
    )
  }
}))

vi.mock('~/components/async-autocomplete/AsyncAutocomplete', () => ({
  default: (props) => {
    return (
      <textarea data-testid='mock-asyncAutocomplete' {...props}>
        {props.children}
      </textarea>
    )
  }
}))

const getCategoriesNamesMock = vi.hoisted(() => {
  return vi.fn(() =>
    Promise.resolve([
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' }
    ])
  )
})

vi.mock('~/services/category-service', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    categoryService: getCategoriesNamesMock
  }
})

vi.mock(
  '~/containers/student-home-page/request-new-category/request-new-category-dialog/constants',
  () => ({
    __esModule: true,
    maxLengthTextField: 100
  })
)

const handleInputChangeMock = vi.fn()
const handleSelectChangeMock = vi.fn()
const handleSubmitMock = vi.fn((event) => event.preventDefault())
const handleBlurMock = vi.fn()

describe('Test "RequestNewCategoryForm" container - [test on render all necessary components] :', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <RequestNewCategoryForm
        data={{}}
        errors={{}}
        handleBlur={handleBlurMock}
        handleInputChange={handleInputChangeMock}
        handleSelectChange={handleSelectChangeMock}
        handleSubmit={handleSubmitMock}
      />
    )
  })

  it('should render "AppTextField" properly', () => {
    const mockAppTextFieldElement = screen.getByTestId('mock-appTextField')
    expect(mockAppTextFieldElement).toBeInTheDocument()
    expect(mockAppTextFieldElement.getAttribute('label')).toBe(
      'studentHomePage.requestNewCategory.newSubjectPlaceholder'
    )
  })

  it('should render "AppTextArea" properly', () => {
    const mockAppTextAreaElement = screen.getByTestId('mock-appTextArea')
    expect(mockAppTextAreaElement).toBeInTheDocument()
    expect(mockAppTextAreaElement.getAttribute('placeholder')).toBe(
      'studentHomePage.requestNewCategory.addInformationPlaceholder'
    )
    expect(mockAppTextAreaElement.getAttribute('maxlength')).toBe('101')
  })

  it('should render "AppButton" and "AsyncAutocomplete" properly', () => {
    const mockAsyncAutocompleteElement = screen.getByTestId(
      'mock-asyncAutocomplete'
    )
    expect(mockAsyncAutocompleteElement).toBeInTheDocument()
    const mockAppButtonElement = screen.getByTestId('mock-appButton')
    expect(mockAppButtonElement).toBeInTheDocument()
    expect(
      screen.getByText('studentHomePage.requestNewCategory.btnSendRequest')
    ).toBeInTheDocument()
  })

  it('should render the component with correct labels', async () => {
    expect(
      screen.getByText(
        'studentHomePage.requestNewCategory.createNewSubjectTitle'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'studentHomePage.requestNewCategory.createNewCategoryTitle'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText('studentHomePage.requestNewCategory.addInformationTitle')
    ).toBeInTheDocument()
  })
})

describe('Test "RequestNewCategoryForm" container - [test main functionality] :', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <RequestNewCategoryForm
        data={dataMock}
        errors={errorsMock}
        handleBlur={handleBlurMock}
        handleInputChange={handleInputChangeMock}
        handleSelectChange={handleSelectChangeMock}
        handleSubmit={handleSubmitMock}
      />
    )
  })

  it('should call "handleInputChange" function when input fields change', () => {
    const inputNewSubject = screen.getByTestId('mock-appTextField')
    fireEvent.change(inputNewSubject, { target: { value: 'new subject' } })
    expect(inputNewSubject.value).toBe('new subject')
    const inputAddInformation = screen.getByTestId('mock-appTextArea')
    fireEvent.change(inputAddInformation, {
      target: { value: 'new additional information' }
    })
    expect(inputAddInformation.value).toBe('new additional information')
    expect(handleInputChangeMock).toHaveBeenCalledTimes(2)
  })

  it('should call "handleSelectChange" function when select fields change', () => {
    const inputNewCategory = screen.getByTestId('mock-asyncAutocomplete')
    fireEvent.select(inputNewCategory, { target: { value: 'new category' } })
    expect(inputNewCategory.value).toBe('new category')
    expect(handleSelectChangeMock).toHaveBeenCalled()
  })

  it('should call "handleBlur" function when input fields lose focus', () => {
    fireEvent.blur(screen.getByTestId('mock-appTextField'))
    fireEvent.blur(screen.getByTestId('mock-appTextArea'))
    fireEvent.blur(screen.getByTestId('mock-asyncAutocomplete'))
    expect(handleBlurMock).toHaveBeenCalledTimes(3)
  })
})

describe('Test "RequestNewCategoryForm" container - [test button disabled state] :', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should disable the submit button when required fields are empty', () => {
    renderWithProviders(
      <RequestNewCategoryForm
        data={{ newSubject: '', newCategory: '', additionalInformation: '' }}
        errors={errorsMock}
        handleBlur={handleBlurMock}
        handleInputChange={handleInputChangeMock}
        handleSelectChange={handleSelectChangeMock}
        handleSubmit={handleSubmitMock}
      />
    )
    const buttonElement = screen.getByTestId('mock-appButton')
    expect(buttonElement).toBeDisabled()
  })

  it('should enable the submit button when all required fields are filled', async () => {
    renderWithProviders(
      <RequestNewCategoryForm
        data={{
          newSubject: 'subject',
          newCategory: 'category',
          additionalInformation: ''
        }}
        errors={errorsMock}
        handleBlur={handleBlurMock}
        handleInputChange={handleInputChangeMock}
        handleSelectChange={handleSelectChangeMock}
        handleSubmit={handleSubmitMock}
      />
    )

    const buttonElement = screen.getByTestId('mock-appButton')
    expect(buttonElement).toBeEnabled()
  })

  it('should disable the submit button when there are validation errors', () => {
    const errorsWithValuesMock = {
      newSubject: 'Error',
      newCategory: '',
      additionalInformation: ''
    }
    renderWithProviders(
      <RequestNewCategoryForm
        data={dataMock}
        errors={errorsWithValuesMock}
        handleBlur={handleBlurMock}
        handleInputChange={handleInputChangeMock}
        handleSelectChange={handleSelectChangeMock}
        handleSubmit={handleSubmitMock}
      />
    )
    const buttonElement = screen.getByTestId('mock-appButton')
    expect(buttonElement).toBeDisabled()
  })
})

describe('Test "RequestNewCategoryForm" container - [test button disabled state] :', () => {
  it('should submit form', async () => {
    vi.clearAllMocks()
    renderWithProviders(
      <RequestNewCategoryForm
        data={{
          newSubject: 'subject',
          newCategory: 'category',
          additionalInformation: ''
        }}
        errors={errorsMock}
        handleBlur={handleBlurMock}
        handleInputChange={handleInputChangeMock}
        handleSelectChange={handleSelectChangeMock}
        handleSubmit={handleSubmitMock}
      />
    )
    const buttonElement = screen.getByTestId('mock-appButton')
    fireEvent.submit(buttonElement)

    expect(handleSubmitMock).toHaveBeenCalled()
  })
})
