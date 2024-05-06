import { screen, render, fireEvent } from '@testing-library/react'
import { beforeEach, describe } from 'vitest'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

vi.mock('@mui/material/Switch', () => ({
  default: ({ onChange }) => {
    return <input data-testid='switch' onChange={onChange} type='radio' />
  }
}))

vi.mock('@mui/material/Tooltip', () => ({
  default: ({ title, children }) => {
    return (
      <div data-testid='tooltip'>
        <span>{title}</span>
        {children}
      </div>
    )
  }
}))

vi.mock('@mui/material/', () => ({
  Typography: ({ children }) => {
    return <div>{children}</div>
  }
}))

describe('AppContentSwitcher test', () => {
  const change = vi.fn()
  const props = {
    active: false,
    onChange: change,
    switchOptions: {
      left: {
        text: 'left',
        tooltip: 'left tooltip'
      },
      right: {
        text: 'right',
        tooltip: 'right tooltip'
      }
    },
    typographyVariant: 'h6'
  }
  beforeEach(() => {
    render(<AppContentSwitcher {...props} />)
  })

  it('should render correctly with props', () => {
    const leftSwitch = screen.getByText(props.switchOptions.left.text)
    const rightSwitch = screen.getByText(props.switchOptions.right.text)

    expect(leftSwitch).toBeInTheDocument()
    expect(rightSwitch).toBeInTheDocument()
  })

  it('should call the function "onChange" when it was clicked on the switch', () => {
    const switchEl = screen.getByTestId('switch')
    fireEvent.click(switchEl)

    expect(change).toBeCalled()
  })

  it('should render tooltips if the tooltips props are passed', () => {
    const leftTooltip = screen.getByText(props.switchOptions.left.tooltip)
    const rightTooltip = screen.getByText(props.switchOptions.right.tooltip)

    expect(leftTooltip).toBeInTheDocument()
    expect(rightTooltip).toBeInTheDocument()
  })
})
