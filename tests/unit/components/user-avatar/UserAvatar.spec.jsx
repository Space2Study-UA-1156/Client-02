import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import UserAvatar from '~/components/user-avatar/UserAvatar'

vi.mock('@mui/material/Avatar', () => ({
  default: (props) => {
    return (
      <div data-testid='mock-avatar' {...props}>
        {props.children}
      </div>
    )
  }
}))

describe('Test "UserAvatar" component:', () => {
  it('should render the AccountCircleOutlinedIcon when neither firstName nor lastName nor photo are provided', () => {
    const { getByTestId } = renderWithProviders(<UserAvatar />)
    const avatarIcon = getByTestId('AccountCircleOutlinedIcon')
    expect(avatarIcon).toBeInTheDocument()
  })

  it('should render the initials when firstName and lastName are provided but photo is not', () => {
    const { getByTestId } = renderWithProviders(
      <UserAvatar firstName='John' lastName='Doe' />
    )
    const avatarInitials = getByTestId('mock-avatar')
    expect(avatarInitials).toBeInTheDocument()
    expect(avatarInitials.textContent).toBe('JD')
  })

  it('should render the photo when it is provided', () => {
    const photo = 'https://example.com/photo.jpg'
    const { getByTestId } = renderWithProviders(
      <UserAvatar firstName='John' lastName='Doe' photo={photo} />
    )
    const avatarPhoto = getByTestId('mock-avatar')
    expect(avatarPhoto).toHaveAttribute('alt', 'John Doe Avatar')
    expect(avatarPhoto).toHaveAttribute('src', photo)
  })
})
