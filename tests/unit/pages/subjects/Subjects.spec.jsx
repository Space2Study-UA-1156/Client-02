import { render, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import Subjects from '~/pages/subjects/Subjects'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => (
    <div data-testid='page-subject'>{children}</div>
  ))
}))

describe('Subjects render test', () => {
  it('should render Subjects page', () => {
    renderWithProviders(<Subjects />)
    const pageTitle = screen.getByTestId('page-subject')
    expect(pageTitle).toBeInTheDocument()
  })

  it('Check text on the Subjects page', () => {
    render(<Subjects />)
    const textElement = screen.getByText('Subjects')
    expect(textElement).toBeInTheDocument()
  })
})
