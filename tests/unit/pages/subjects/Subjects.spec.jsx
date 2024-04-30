import { renderWithProviders } from '~tests/test-utils'
import { render, screen } from '@testing-library/react'

import Subjects from '~/pages/subjects/Subjects'

describe('Subjects render test', () => {
  test('should render Subjects page', () => {
    renderWithProviders(<Subjects />)
  })

  test('Check text on the Subjects page', () => {
    render(<Subjects />)
    const textElement = screen.getByText('Subjects')
    expect(textElement).toBeInTheDocument()
  })
})
