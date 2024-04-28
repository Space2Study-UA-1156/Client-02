import PopupDialog from '~/components/popup-dialog/PopupDialog.jsx'
import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { beforeEach, expect } from 'vitest'

describe('PopupDialog component', () => {
  const close = vi.fn()
  const props = {
    content: 'content',
    closeModal: close
  }
  beforeEach(() => {
    vi.mock('~/hooks/use-confirm', () => ({
      useConfirm: () => ({
        checkConfirmation: async () => true
      })
    }))

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

  it('closes popup with a delay', () => {
    const popupContent = screen.getByTestId('popupContent')
    setTimeout(() => {
      fireEvent.click(popupContent)
    }, 1000)

    expect(close).toHaveBeenCalled()
  })
})
