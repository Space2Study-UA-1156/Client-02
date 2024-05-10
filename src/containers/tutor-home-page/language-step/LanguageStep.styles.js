import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    height: { sm: '485px' },
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    display: 'flex',
    justifyContent: 'space-between',
    gap: { md: '40px' },
    ...fadeAnimation
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '432px',
    boxSizing: 'border-box'
  },
  title: {
    mb: '20px'
  },
  imgContainer: {
    width: '450px',
    maxWidth: { md: '50%', lg: '450px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' },
    pl: { md: '30px' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  }
}
