import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('@mui/material/Box', () => ({
  default: ({ sx, children }) => (
    <div data-testid='mock-box' style={sx}>
      {children}
    </div>
  )
}))

describe('Test "GeneralInfoStep" container', () => {
  const btnsBox = (
    <>
      <button data-testid='test-button'>Test Button 1</button>
      <button data-testid='test-button'>Test Button 2</button>
      <button data-testid='test-button'>Test Button 3</button>
      <button data-testid='test-button'>Test Button 4</button>
    </>
  )

  beforeEach(() => {
    renderWithProviders(<GeneralInfoStep btnsBox={btnsBox} />)
  })

  it('should render MUI Box properly', () => {
    const boxElement = screen.getByTestId('mock-box')
    expect(boxElement).toBeInTheDocument()
    expect(getComputedStyle(boxElement).display).toEqual('flex')
  })

  it('should render container on the page', () => {
    expect(screen.getByText('GeneralInfo step')).toBeInTheDocument()
  })

  it('should render the buttons passed in props', () => {
    const buttons = screen.getAllByTestId('test-button')
    expect(buttons.length).toBe(4)
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument()
    })
  })
})
