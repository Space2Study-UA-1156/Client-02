import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage.jsx'
import { screen, render, fireEvent } from '@testing-library/react'
import { expect } from 'vitest'

describe('PopupDialog component', () => {
  it('should show the mock data on click on the title', () => {
    const items = [
      {
        image: 'test/image1',
        title: 'Test Title1',
        description: 'Test description1'
      },
      {
        image: 'test/image2',
        title: 'Test Title2',
        description: 'Test description2'
      }
    ]
    render(<AccordionWithImage items={items} />)

    const titleElement = screen.getByText(items[0].title)

    fireEvent.click(titleElement)

    const subtitleElement = screen.getByText(items[0].description)

    expect(subtitleElement).toBeInTheDocument()
  })
})
