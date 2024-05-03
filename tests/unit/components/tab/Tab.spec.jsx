import { render, screen, fireEvent } from '@testing-library/react'

import Tab from '~/components/tab/Tab'

const children = 'Test text'
const handleTab = vi.fn()

vi.mock('@mui/material/Button', () => ({
  default: (props) => {
    console.log('aaaaaaa', props.activeTab)
    return (
      <button data-testid='button' onClick={handleTab} style={props.sx}>
        {children}
        <div>{props.activeTab && 'Active'}</div>
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
  it('should render MUI AppButton properly', () => {
    render(<Tab onClick={handleTab}>{children}</Tab>)

    const appButton = screen.getByTestId('button')
    expect(appButton).toBeInTheDocument()
  })
  it('should render active tab', () => {
    const props = {
      activeTab: true
    }
    render(<Tab {...props}>{children}</Tab>)

    const tabButton = screen.getByTestId('button')
    console.log('ssss', tabButton)
    // expect(tabButton).toHaveAttribute('style', 'true')
    expect(screen.getByText('Active')).toBeInTheDocument()
  })
})
