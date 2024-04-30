import Button from '@mui/material/Button'
import { render, screen, fireEvent } from '@testing-library/react'

import Tab from '~/components/tab/Tab'

const children = 'Test text'
const handleTab = vi.fn()

vi.mock('@mui/material/Button', () => {
  return {
    __deModule: true,
    default: vi.fn(() => {
      return <Button>Looks like it does not work</Button>
    })
  }
})

describe('Tab component test', () => {
  test('should render Tab component with children', () => {
    render(<Tab>{children}</Tab>)
    expect(screen.getByText(children)).toBeInTheDocument()
  })
  test('should render Tab component with onClick', () => {
    render(<Tab onClick={handleTab}>{children}</Tab>)
    const tabButton = screen.getByRole('button')

    fireEvent.click(tabButton)
    expect(handleTab).toHaveBeenCalled()
  })
})
