import { render, screen } from '@testing-library/react'
import { describe, vi } from 'vitest'
import AppTextArea from '~/components/app-text-area/AppTextArea'

vi.mock('@mui/material/Typography', () => ({
  default: ({ sx, color, children }) => {
    return (
      <div data-testid='typography' style={sx}>
        {children}
        <div>{color}</div>
      </div>
    )
  }
}))

describe('AppTextArea test', () => {
  const titleValue = 'test title'

  it('should render title if props title are passed', () => {
    render(<AppTextArea title={titleValue} />)
    const title = screen.getByText(titleValue)
    expect(title).toBeInTheDocument()
  })

  it("shouldn't be rendered title if props title is not passed", () => {
    render(<AppTextArea />)
    const title = screen.queryByText(titleValue)
    expect(title).not.toBeInTheDocument()
  })

  it('should render value', () => {
    const props = {
      value: 'test value',
      maxLength: 2
    }
    render(<AppTextArea {...props} />)
    const value = screen.getByText(
      `${Number(props.value.length)}/${props.maxLength}`
    )
    expect(value).toBeInTheDocument()
  })

  it("shouldn't render value", () => {
    const props = {
      value: 'test value',
      maxLength: 0
    }
    render(<AppTextArea {...props} />)
    const value = screen.queryByText(
      `${Number(props.value.length)}/${props.maxLength}`
    )
    expect(value).not.toBeInTheDocument()
  })

  it('should render color error', () => {
    const props = {
      value: 'test value',
      maxLength: 10
    }
    render(<AppTextArea {...props} />)
    const value = screen.getByText('error')
    expect(value).toBeInTheDocument()
  })
})
