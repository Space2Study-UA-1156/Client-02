import FindOffers from '~/pages/find-offers/FindOffers.jsx'
import { screen } from '@testing-library/react'
import { describe, expect } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'

describe('FindOffers page', () => {
  vi.mock('~/components/page-wrapper/PageWrapper', () => {
    return {
      __esModule: true,
      default: vi.fn(({ children }) => (
        <div data-testid='page-wrapper'>{children}</div>
      ))
    }
  })

  it('renders the page', () => {
    renderWithProviders(<FindOffers />)
    const pageWrapper = screen.getByTestId('page-wrapper')

    expect(pageWrapper).toBeInTheDocument()
  })

  it('displays text on the page', () => {
    renderWithProviders(<FindOffers />)
    const pageText = screen.getByText('Find offers')

    expect(pageText).toBeInTheDocument()
  })
})
