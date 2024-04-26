import FindOffers from '~/pages/find-offers/FindOffers.jsx'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect } from 'vitest'

describe('FindOffers page', () => {
  beforeEach(() => {
    render(<FindOffers />)
  })

  it('renders the page', () => {
    const findOffers = screen.getByText('Find offers')

    expect(findOffers).toBeInTheDocument()
  })

  it('displays text on the page', () => {
    const pageText = screen.getByText('Find offers')

    expect(pageText).toBeInTheDocument()
  })
})
