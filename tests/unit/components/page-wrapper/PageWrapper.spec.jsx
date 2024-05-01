import { ModalProvider } from '~/context/modal-context'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe } from 'vitest'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

const childrenText = 'I am a children'

describe('PageWrapper test', () => {
  beforeEach(() => {
    render(
      <ModalProvider>
        <PageWrapper>
          <p>{childrenText}</p>
        </PageWrapper>
      </ModalProvider>
    )
  })

  it('should render with children', () => {
    const children = screen.getByText(childrenText)
    expect(children).toBeInTheDocument()
  })
})
