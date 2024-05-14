import { render, screen } from '@testing-library/react'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

describe('ImgTitleDescription component', () => {
  it('renders image', () => {
    const imgSrc = 'test.jpg'

    render(<ImgTitleDescription img={imgSrc} />)

    const imgElement = screen.getByAltText('info')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', imgSrc)
  })

  it('renders title', () => {
    const title = 'Test Title'

    render(<ImgTitleDescription title={title} />)

    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('renders description', () => {
    const description = 'Test Description'

    render(<ImgTitleDescription description={description} />)

    expect(screen.getByText(description)).toBeInTheDocument()
  })
})
