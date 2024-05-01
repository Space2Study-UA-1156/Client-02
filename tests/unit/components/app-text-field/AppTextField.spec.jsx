import { render, screen, fireEvent } from '@testing-library/react'

import AppTextArea from '~/components/app-text-field/AppTextField'

describe('app-text-field test', () => {
  test('renders without errors', () => {
    render(<AppTextArea />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('displays error message when errorMsg prop is provided', () => {
    const errorMsg = 'This is an error message'
    render(<AppTextArea errorMsg={errorMsg} />)
    expect(screen.getByText(errorMsg)).toBeInTheDocument()
  })

  test('does not display error message when errorMsg prop is not provided', () => {
    render(<AppTextArea />)
    expect(screen.queryByText(/error message/i)).toBeNull()
  })

  test('shows tooltip when errorMsg is provided', () => {
    const errorMsg = 'This is an error message'
    render(<AppTextArea errorMsg={errorMsg} />)
    fireEvent.mouseOver(screen.getByRole('textbox'))
    expect(screen.getByText(errorMsg)).toBeInTheDocument()
  })
})
