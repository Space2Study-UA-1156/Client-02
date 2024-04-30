import PopupDialog from '~/components/popup-dialog/PopupDialog.jsx'
import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { beforeEach, expect } from 'vitest'

describe('PopupDialog component', () => {
  const close = vi.fn()
  const closeAfterDelay = vi.fn((delay) => {
    const timerId = setTimeout(close, delay ?? 5000)
    return timerId
  })
  const props = {
    content: 'content',
    closeModal: close,
    timerId: 123,
    closeModalAfterDelay: closeAfterDelay
  }
  beforeEach(() => {
    vi.mock('~/hooks/use-confirm', () => ({
      useConfirm: () => ({
        checkConfirmation: async () => true
      })
    }))

    vi.mock('~/hooks/use-breakpoints', () => ({
      useBreakpoints: () => ({
        isMobile: false
      })
    }))

    vi.mock('~mui/material/Box', () => {
      return {
        __esModule: true,
        default: vi.fn(() => <div data-testid='mock-box'>Mocked Box</div>)
      }
    })

    vi.mock('~mui/material/IconButton', () => {
      return {
        __esModule: true,
        deafult: vi.fn(() => (
          <button data-testid='mock-icon-button'>Mocked IconButton</button>
        ))
      }
    })

    render(<PopupDialog {...props} />)
  })

  it('shows content text', () => {
    const content = screen.getByText(props.content)

    expect(content).toBeInTheDocument()
  })

  it('closes popup by clicking the Close button', async () => {
    const button = screen.getByRole('button')
    await fireEvent.click(button)

    expect(close).toHaveBeenCalled()
  })

  it('closes popup with a delay on mouse leave', async () => {
    const popupContent = screen.getByTestId('popupContent')

    vi.useFakeTimers()
    fireEvent.mouseLeave(popupContent)
    vi.advanceTimersByTime(5000)

    expect(closeAfterDelay).toHaveBeenCalled()

    vi.useRealTimers()
  })
})
