import { render } from '@testing-library/react'

import Categories from '~/pages/categories/Categories'

describe('Categories render test', () => {
  test('should render categories page', () => {
    render(<Categories />)
  })
})
