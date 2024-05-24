import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'

import NoResultsContent from '~/components/no-results-content/NoResultsContent'

const propsSpy = vi.fn()
const propsCustom = {
  contentName: 'some content',
  actionModal: vi.fn()
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

vi.mock('~/components/app-button/AppButton', () => ({
  default: (props) => {
    return (
      <button data-testid='mock-appButton' {...props}>
        {props.children}
      </button>
    )
  }
}))

vi.mock('~/components/img-title-description/ImgTitleDescription', () => ({
  default: (props) => {
    return (
      <div data-testid='mock-imgTitleDescription' {...props}>
        {props.children}
      </div>
    )
  }
}))

describe('Test "NoResultsContent" component:', () => {
  beforeEach(() => {
    propsSpy.mockReset()
    propsCustom.actionModal.mockReset()
    renderWithProviders(<NoResultsContent {...propsCustom} />)
  })

  it('should render MUI Box properly', () => {
    const boxElement = screen.getByTestId('mock-box')
    expect(boxElement).toBeInTheDocument()
  })

  it('should render AppButton properly', () => {
    const boxElement = screen.getByTestId('mock-appButton')
    expect(boxElement).toBeInTheDocument()
  })

  it('should render ImgTitleDescription properly', () => {
    const boxElement = screen.getByTestId('mock-imgTitleDescription')
    expect(boxElement).toBeInTheDocument()
  })

  it('should trigger action on AppButton click', () => {
    const appButtonElement = screen.getByTestId('mock-appButton')
    fireEvent.click(appButtonElement)
    expect(propsCustom.actionModal).toHaveBeenCalled()
  })
})
