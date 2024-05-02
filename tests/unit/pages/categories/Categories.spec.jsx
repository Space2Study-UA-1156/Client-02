import Categories from '~/pages/categories/Categories'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid='test'>Categories</div>)
}))

describe('Categories page test', () => {
  it('should render the categories page', () => {
    renderWithProviders(<Categories />)
  })

  it('should render the text on the page', () => {
    renderWithProviders(<Categories />)
    const textElement = screen.getByTestId('test')
    expect(textElement).toHaveTextContent('Categories')
  })
})
