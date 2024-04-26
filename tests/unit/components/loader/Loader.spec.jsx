import Loader from '~/components/loader/Loader.jsx'
import { screen, render } from '@testing-library/react'

import { beforeEach, expect } from 'vitest'

describe('Loader component', () => {
  beforeEach(() => {
    render(<Loader />)
  })

  it('should be in the document ', () => {
    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})
