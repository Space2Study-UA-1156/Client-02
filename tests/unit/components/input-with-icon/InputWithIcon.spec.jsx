import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import { renderWithProviders } from '~tests/test-utils'

const propsSpy = vi.fn()
const propsCustom = {
  value: 'some value',
  onClear: vi.fn(),
  startIcon: 'startIconName.svg',
  sx: {}
}

vi.mock('@mui/icons-material/ClearRounded', () => ({
  default: (props) => {
    propsSpy(props)
    return (
      <div data-testid='mock-clearRounded-icon' {...props}>
        {props.children}
      </div>
    )
  }
}))

vi.mock('@mui/material/Box', () => ({
  default: (props) => {
    propsSpy(props)
    return (
      <div data-testid='mock-box' {...props}>
        {props.children}
      </div>
    )
  }
}))

vi.mock('@mui/material/IconButton', () => ({
  default: (props) => {
    propsSpy(props)
    return <button {...props}>{props.children}</button>
  }
}))

vi.mock('@mui/material/InputBase', () => ({
  default: (props) => {
    propsSpy(props)
    return (
      <div data-testid='mock-inputBase' {...props}>
        {props.children}
      </div>
    )
  }
}))

describe('Test "InputWithIcon" component', () => {
  describe('should render "Box" and "InputBase" components [if the "value" of input is empty]', () => {
    beforeEach(() => {
      propsSpy.mockReset()
      renderWithProviders(<InputWithIcon />)
    })

    it('should render MUI Box properly', () => {
      const boxElement = screen.getByTestId('mock-box')
      expect(boxElement).toBeInTheDocument()
    })

    it('should render MUI InputBase properly', () => {
      const inputBaseElement = screen.getByTestId('mock-inputBase')
      expect(inputBaseElement).toBeInTheDocument()
      expect(propsSpy).toHaveBeenCalledWith({
        sx: {
          flex: 1
        }
      })
    })
  })

  describe('should render "IconButton" and "ClearRoundedIcon" components [if the value of input is not empty]', () => {
    beforeEach(() => {
      propsSpy.mockReset()
      renderWithProviders(<InputWithIcon {...propsCustom} />)
    })

    it('should render MUI InputBase with props "value" that is not empty', () => {
      const inputBaseElement = screen.getByTestId('mock-inputBase')
      expect(inputBaseElement).toBeInTheDocument()
      expect(propsSpy).toHaveBeenCalledWith({
        value: 'some value',
        sx: {
          flex: 1
        }
      })
    })

    it('should render MUI IconButton properly', () => {
      const iconButtonElement = screen.getByTestId('clearIcon')
      expect(iconButtonElement).toBeInTheDocument()
      expect(propsSpy).toHaveBeenCalledWith({
        sx: {
          color: 'primary.700'
        }
      })
    })

    it('should render MUI ClearRoundedIcon properly', () => {
      const clearRoundedElement = screen.getByTestId('mock-clearRounded-icon')
      expect(clearRoundedElement).toBeInTheDocument()
      expect(propsSpy).toHaveBeenCalledWith({
        sx: {
          color: 'primary.700'
        }
      })
    })
  })

  describe('should render "InputWithIcon" properly', () => {
    beforeEach(() => {
      propsSpy.mockReset()
      propsCustom.onClear.mockReset()
      renderWithProviders(<InputWithIcon {...propsCustom} />)
    })

    it('should render the "start" icon that was passed in props', () => {
      const startIconElement = screen.getByText(propsCustom.startIcon)
      expect(startIconElement).toBeInTheDocument()
    })

    it('should render the "clear" icon when the value of input is not empty', () => {
      const clearIconElement = screen.getByTestId('mock-clearRounded-icon')
      expect(clearIconElement).toBeInTheDocument()
    })

    it('should trigger action on IconButton click', () => {
      const iconButtonElement = screen.getByTestId('clearIcon')
      fireEvent.click(iconButtonElement)
      expect(propsCustom.onClear).toHaveBeenCalled()
    })
  })
})
