import { render } from '@testing-library/react'

import Subjects from '~/pages/subjects/Subjects'

describe('Subjects render test', () => {
  test('should render Subjects page', () => {
    render(<Subjects />)
  })
})
