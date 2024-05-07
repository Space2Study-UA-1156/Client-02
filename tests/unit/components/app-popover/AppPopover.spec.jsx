import AppPopover from '~/components/app-popover/AppPopover'
import { expect } from 'vitest'
import { fireEvent, screen, render, waitFor } from '@testing-library/react'

describe('AppPopover', () => {
  it('imitates click', () => {
    render(<AppPopover showMoreElem={<button>More</button>} />)

    const moreButton = screen.getByText('More')
    fireEvent.click(moreButton)
    const popover = screen.getByTestId('app-popover')

    expect(popover).toBeInTheDocument()
  })

  it('closes popover on click', async () => {
    render(<AppPopover showMoreElem={<button>More</button>} />)
    const moreButton = screen.getByText('More')
    fireEvent.click(moreButton)

    expect(screen.getByTestId('app-popover')).toBeInTheDocument()

    fireEvent.keyDown(screen.getByTestId('app-popover'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    })

    await waitFor(() => expect(screen.queryByTestId('app-popover')).toBeNull())
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
