import Categories from '~/pages/categories/Categories'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { expect } from 'vitest'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => {
    return <div data-testid='test'>{children}</div>
  })
}))

describe('Categories page test', () => {
  it('should render the categories page', () => {
    renderWithProviders(<Categories />)
    const textElement = screen.getByText('Categories')
    expect(textElement).toBeInTheDocument()
  })

  it('should render the text on the page', () => {
    renderWithProviders(<Categories />)
    const categoriesElement = screen.getByTestId('test')
    expect(categoriesElement).toBeInTheDocument()
  })
})
