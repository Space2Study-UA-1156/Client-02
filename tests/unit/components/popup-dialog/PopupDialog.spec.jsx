import PopupDialog from '~/components/popup-dialog/PopupDialog.jsx'
import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { beforeEach, expect } from 'vitest'

vi.mock('~/hooks/use-confirm', () => ({
  default: () => ({
    checkConfirmation: async () => true
  })
}))

vi.mock('~/hooks/use-breakpoints', () => ({
  default: () => ({
    isMobile: false
  })
}))

describe('PopupDialog component', () => {
  const close = vi.fn()
  let timeout = setTimeout(close, 5000)
  const closeAfterDelay = vi.fn(() => {
    const timerId = timeout
    return timerId
  })
  const props = {
    content: 'content',
    closeModal: close,
    timerId: timeout,
    closeModalAfterDelay: closeAfterDelay
  }
  beforeEach(() => {
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

  it('clears popup timeout on mouse over', () => {
    const popupContent = screen.getByTestId('popupContent')
    fireEvent.mouseOver(popupContent)
    expect(timeout._idleTimeout).toBe(-1)
  })
})
