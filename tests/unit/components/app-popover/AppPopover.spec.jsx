import AppPopover from '~/components/app-popover/AppPopover'
import { expect } from 'vitest'
import { fireEvent, screen, render } from '@testing-library/react'

describe('AppPopover', () => {
  it('imitates click on the button and opens popover', () => {
    render(<AppPopover showMoreElem={<button>More</button>} />)

    const moreButton = screen.getByText('More')
    fireEvent.click(moreButton)
    const popover = screen.getByTestId('app-popover')

    expect(popover).toBeInTheDocument()
  })

  it('hides button after click', () => {
    render(<AppPopover hideElem showMoreElem={<button>More</button>} />)

    const moreButton = screen.getByText('More')

    expect(moreButton).toBeInTheDocument()
    fireEvent.click(moreButton)
    expect(moreButton).not.toBeVisible()
  })

  it('shows button after click', () => {
    render(<AppPopover showMoreElem={<button>More</button>} />)

    const moreButton = screen.getByText('More')

    expect(moreButton).toBeInTheDocument()
    fireEvent.click(moreButton)
    expect(moreButton).toBeVisible()
  })
})
