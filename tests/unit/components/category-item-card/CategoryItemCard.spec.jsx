import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import CategoryItemCard from '~/components/category-item-card/CategoryItemCard'
import { vi } from 'vitest'

vi.mock('~/components/img-title-description/ImgTitleDescription', () => ({
  __esModule: true,
  default: (props) => {
    return (
      <div>
        <img alt={props.title} src={props.img} />
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    )
  }
}))

const props = {
  category: 'Music',
  img: 'MusicNoteRounded.svg',
  offers: '10'
}

describe('render with image', () => {
  test('should contain image', () => {
    renderWithProviders(<CategoryItemCard {...props} />)

    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
  })

  test('should have title', () => {
    renderWithProviders(<CategoryItemCard {...props} />)

    const text = screen.getByText(props.category)
    expect(text).toBeInTheDocument()
  })
})
