import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

vi.mock('~/utils/img', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    createObjectURL: (obj) => `https://test.com/${obj.name}`
  }
})

const useBreakpointsMock = vi.hoisted(() => {
  return vi.fn(() => ({
    isMobile: true
  }))
})
vi.mock('~/hooks/use-breakpoints', () => ({
  default: useBreakpointsMock
}))

vi.mock(
  '~/containers/tutor-home-page/add-photo-step/constants',
  async (importOriginal) => {
    const mod = await importOriginal()
    return {
      ...mod,
      validationData: 'validation rules'
    }
  }
)

vi.mock('@mui/material/Box', () => ({
  default: (props) => {
    const testId = props.src ? `box-img-${props.src}` : 'test-box'
    return (
      <div data-testid={testId} {...props}>
        {props.children}
      </div>
    )
  }
}))

vi.mock('@mui/material/Typography', () => ({
  default: (props) => {
    return <p {...props}>{props.children}</p>
  }
}))

vi.mock('~/components/file-uploader/FileUploader', () => ({
  default: (props) => {
    return (
      <div data-testid='mock-fileUploader' {...props}>
        {props.children}
      </div>
    )
  }
}))

vi.mock('@mui/icons-material/DoneRounded', () => ({
  default: (props) => {
    return (
      <div data-testid='mock-successDoneRoundedIcon' {...props}>
        {props.children}
      </div>
    )
  }
}))

const stepDataMock = Object.defineProperty({}, 'photo', {
  get: vi.fn()
})
Object.getOwnPropertyDescriptor(stepDataMock, 'photo').get.mockReturnValue([])
const handleStepDataMock = vi.fn()
vi.mock('~/context/step-context', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    useStepContext: vi.fn(() => ({
      stepData: stepDataMock,
      handleStepData: handleStepDataMock
    }))
  }
})

let emitterDataMock = vi.fn(() => ({ error: null, files: [] }))
vi.mock('~/components/drag-and-drop/DragAndDrop', () => ({
  default: (props) => {
    const { emitter } = props
    emitter(emitterDataMock())
    return (
      <div data-testid='mock-dragAndDrop' {...props}>
        {props.children}
      </div>
    )
  }
}))

describe('Test "AddPhotoStep" container - [ main test cases ]:', () => {
  const btnsBox = (
    <>
      <button data-testid='test-button'>Back</button>
      <button data-testid='test-button'>Finish</button>
    </>
  )

  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(<AddPhotoStep btnsBox={btnsBox} />)
  })

  it('should render the buttons passed in props', () => {
    const buttons = screen.getAllByTestId('test-button')
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Finish')).toBeInTheDocument()
    expect(buttons.length).toBe(2)
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument()
    })
  })

  it('should render MUI Typography properly', () => {
    expect(
      screen.getByText('becomeTutor.photo.description')
    ).toBeInTheDocument()
  })

  it('should render FileUploader properly [ when the screen is in Mobile view & no photo has been added ]', () => {
    const fileUploaderElement = screen.getByTestId('mock-fileUploader')
    expect(fileUploaderElement).toBeInTheDocument()
    expect(fileUploaderElement.getAttribute('buttontext')).toBe(
      'becomeTutor.photo.button'
    )
    expect(fileUploaderElement.getAttribute('initialerror')).toBe('')
    expect(fileUploaderElement.getAttribute('validationdata')).toBe(
      'validation rules'
    )
    expect(handleStepDataMock).not.toHaveBeenCalled()
  })

  it('should render DragAndDrop properly [ when the screen is in Mobile view & no photo has been added ]', () => {
    const dragAndDropElement = screen.getByTestId('mock-dragAndDrop')
    expect(dragAndDropElement).toBeInTheDocument()
    expect(dragAndDropElement.getAttribute('validationdata')).toBe(
      'validation rules'
    )
    expect(
      screen.getByText('becomeTutor.photo.placeholder')
    ).toBeInTheDocument()
    expect(handleStepDataMock).not.toHaveBeenCalled()
  })
})

describe('Test "AddPhotoStep" container - [ when photo has been successfully added ]:', () => {
  let file
  beforeEach(() => {
    vi.clearAllMocks()
    file = new File(['photo'], 'photo.jpg', { type: 'image/jpeg' })
    emitterDataMock.mockReturnValue({ error: null, files: [file] })
    Object.getOwnPropertyDescriptor(stepDataMock, 'photo').get.mockReturnValue(
      file
    )
    renderWithProviders(<AddPhotoStep />)
  })

  it('should render FileUploader properly [ when the screen is in Mobile view & photo has been successfully added ]', () => {
    const fileUploaderElement = screen.getByTestId('mock-fileUploader')
    expect(fileUploaderElement).toBeInTheDocument()
    expect(fileUploaderElement.getAttribute('initialerror')).toBe('')
    expect(handleStepDataMock).toHaveBeenCalledWith('photo', file, null)
  })

  it('should render icon DoneRounded properly [ when the screen is in Mobile view & photo has been successfully added ]', () => {
    const iconDoneRoundedElement = screen.getByTestId(
      'mock-successDoneRoundedIcon'
    )
    expect(iconDoneRoundedElement).toBeInTheDocument()
    expect(iconDoneRoundedElement.getAttribute('color')).toBe('success')
  })

  it('should render DragAndDrop properly [ when the screen is in Mobile view & photo has been successfully added ]', () => {
    const uploadedImage = screen.getByTestId(
      'box-img-https://test.com/photo.jpg'
    )
    expect(uploadedImage.getAttribute('src')).toBe('https://test.com/photo.jpg')
    expect(uploadedImage.getAttribute('component')).toBe('img')
    expect(
      screen.queryByText('becomeTutor.photo.placeholder')
    ).not.toBeInTheDocument()
    expect(handleStepDataMock).toHaveBeenCalledWith('photo', file, null)
  })
})

describe('Test "AddPhotoStep" container - [ when an error occurs while adding a photo ]:', () => {
  let file
  beforeEach(() => {
    vi.clearAllMocks()
    file = new File(['photo'], 'photo.webp', { type: 'webp' })
    emitterDataMock.mockReturnValue({
      error: 'becomeTutor.photo.typeError',
      files: [file]
    })
    Object.getOwnPropertyDescriptor(stepDataMock, 'photo').get.mockReturnValue(
      []
    )
    renderWithProviders(<AddPhotoStep />)
  })

  it('should render FileUploader properly [ when the screen is in Mobile view & photo has been added incorrectly or with errors ]', () => {
    const fileUploaderElement = screen.getByTestId('mock-fileUploader')
    expect(fileUploaderElement).toBeInTheDocument()
    expect(fileUploaderElement.getAttribute('initialerror')).toBe(
      'becomeTutor.photo.typeError'
    )
    expect(handleStepDataMock).not.toHaveBeenCalled()
  })

  it('should not render icon DoneRounded [ when the screen is in Mobile view & photo has been added incorrectly or with errors ]', () => {
    const iconDoneRoundedElement = screen.queryByTestId(
      'mock-successDoneRoundedIcon'
    )
    expect(iconDoneRoundedElement).not.toBeInTheDocument()
  })

  it('should render DragAndDrop properly [ when the screen is in Mobile view & photo has been added incorrectly or with errors ]', () => {
    expect(
      screen.getByText('becomeTutor.photo.placeholder')
    ).toBeInTheDocument()
    expect(handleStepDataMock).not.toHaveBeenCalled()
  })
})

describe('Test "AddPhotoStep" container - [ when the screen view is neither Tablet nor Mobile ]:', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useBreakpointsMock.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isLaptopAndAbove: true
    })
    renderWithProviders(<AddPhotoStep />)
  })

  it('should not render container when the screen view is neither Tablet nor Mobile', () => {
    expect(screen.queryByTestId('photo-preview-large')).toBeInTheDocument()
    expect(screen.queryByTestId('photo-preview-small')).not.toBeInTheDocument()
  })
})
