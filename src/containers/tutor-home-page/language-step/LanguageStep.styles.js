import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    height: { sm: '485px' },
    display: 'flex',
    justifyContent: 'space-between',
    gap: { md: '40px', lg: '43px' },
    ...fadeAnimation
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: { sm: '100%', md: '430px' },
    margin: { sm: '0 auto', md: '0' }
  },
  title: {
    mb: '20px',
    width: { sm: '100%', md: '430px' }
  },
  imgContainer: {
    width: '450px',
    maxWidth: { md: '50%', lg: '450px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' },
    pl: { md: '30px' }
  },
  img: {
    width: '100%'
  },
  imgMobile: {
    display: { xs: 'block', sm: 'none' },
    width: '60%',
    margin: 'auto',
    marginBottom: '20px'
  }
}
