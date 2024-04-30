import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('@mui/material', () => ({
  Box: ({ sx, children }) => <div style={sx}>{children}</div>
}))

describe('Test "LanguageStep" container', () => {
  const btnsBox = (
    <>
      <button data-testid='test-button'>Test Button 1</button>
      <button data-testid='test-button'>Test Button 2</button>
      <button data-testid='test-button'>Test Button 3</button>
    </>
  )

  beforeEach(() => {
    renderWithProviders(<LanguageStep btnsBox={btnsBox} />)
  })

  it('should render MUI Box properly', () => {
    const boxElement = screen.getByText('Language step')
    expect(boxElement).toHaveClass('MuiBox-root')
    expect(getComputedStyle(boxElement).display).toEqual('flex')
  })

  it('should render container on the page', () => {
    expect(screen.getByText('Language step')).toBeInTheDocument()
  })

  it('should render the buttons passed in props', () => {
    const buttons = screen.getAllByTestId('test-button')
    expect(buttons.length).toBe(3)
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument()
    })
  })
})
