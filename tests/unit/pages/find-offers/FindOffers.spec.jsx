import FindOffers from '~/pages/find-offers/FindOffers.jsx'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect } from 'vitest'

describe('FindOffers page', () => {
  beforeEach(() => {
    vi.mock('~mui/material/PageWrapper', () => {
      return {
        __deModule: true,
        default: vi.fn(() => (
          <div data-testid='page-wrapper'>Mocked PageWrapper</div>
        ))
      }
    })
    render(<FindOffers />)
  })

  it('renders the page', () => {
    render(<FindOffers />)
  })

  it('displays text on the page', () => {
    const pageText = screen.getByText('Find offers')

    expect(pageText).toBeInTheDocument()
  })
})
