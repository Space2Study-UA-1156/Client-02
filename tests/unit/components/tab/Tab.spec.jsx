import { render, screen, fireEvent } from '@testing-library/react'

import Tab from '~/components/tab/Tab'

const children = 'Test text'
const handleTab = vi.fn()

vi.mock('@mui/material/Button', () => ({
  default: ({ sx, children }) => {
    return (
      <button data-testid='button' onClick={handleTab} style={sx}>
        {children}
        <div>{sx[1] ? 'tab-active' : 'disactive'}</div>
      </button>
    )
  }
}))

describe('Tab component test', () => {
  it('should render Tab component with children', () => {
    render(<Tab>{children}</Tab>)
    expect(screen.getByText(children)).toBeInTheDocument()
  })
  it('should render Tab component with onClick', () => {
    render(<Tab onClick={handleTab}>{children}</Tab>)
    const tabButton = screen.getByRole('button')

    fireEvent.click(tabButton)
    expect(handleTab).toHaveBeenCalled()
  })
  it('should render Tab component with activeTab styles if activeTab prop is true', () => {
    render(<Tab activeTab>{children}</Tab>)
    expect(screen.getByText('tab-active')).toBeInTheDocument()
  })
  it('should render Tab component with activeTab styles if activeTab prop is false', () => {
    render(<Tab>{children}</Tab>)
    expect(screen.getByText('disactive')).toBeInTheDocument()
  })
  it('should render MUI AppButton properly', () => {
    render(<Tab onClick={handleTab}>{children}</Tab>)

    const appButton = screen.getByTestId('button')
    expect(appButton).toBeInTheDocument()
  })
})
