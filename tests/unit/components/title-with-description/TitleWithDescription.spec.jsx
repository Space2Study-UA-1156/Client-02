import { render } from '@testing-library/react'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

describe('TitleWithDescription test', () => {
  it('should render TitleWithDescription component with title and description', () => {
    const title = 'Test Title'
    const description = 'Test Description'
    const { getByText } = render(
      <TitleWithDescription description={description} title={title} />
    )

    expect(getByText(title)).toBeInTheDocument()
    expect(getByText(description)).toBeInTheDocument()
  })
})
