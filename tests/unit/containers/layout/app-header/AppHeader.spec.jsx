import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import AppHeader from '~/containers/layout/app-header/AppHeader'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('@mui/material/AppBar', () => ({
  default: ({ sx, children }) => {
    return (
      <div data-testid='appBar' style={sx}>
        {children}
      </div>
    )
  }
}))

vi.mock('@mui/material/Toolbar', () => ({
  default: ({ sx, children }) => (
    <div data-testid='toolbar' style={sx}>
      {children}
    </div>
  )
}))

vi.mock('~/containers/layout/navbar/NavBar', () => {
  return {
    __esModule: true,
    default: vi.fn(() => <div data-testid='navBar'></div>)
  }
})

describe('Test "AppHeader" container', () => {
  beforeEach(() => {
    renderWithProviders(<AppHeader />)
  })

  it('should render MUI AppBar properly', () => {
    const appBarElement = screen.getByTestId('appBar')
    expect(appBarElement).toBeInTheDocument()
  })

  it('should render MUI Toolbar properly', () => {
    const toolBarElement = screen.getByTestId('toolbar')
    expect(toolBarElement).toBeInTheDocument()
  })

  it('should render NavBar properly', () => {
    const navBarElement = screen.getByTestId('navBar')
    expect(navBarElement).toBeInTheDocument()
  })
})
