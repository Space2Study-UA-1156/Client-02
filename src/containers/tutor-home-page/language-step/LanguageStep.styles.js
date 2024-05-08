import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'colum',
    gap: { md: '40px', lg: '63px' },
    height: { sm: '485px' },
    ...fadeAnimation
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '432px'
  },
  title: {
    mb: '20px'
  },
  // imgContainer: {
  //   width: '100%',
  //   maxWidth: { sm: '300', md: '380px', lg: '472px' },
  //   maxHeight: 'inherit',
  //   display: { xs: 'none', md: 'flex' }
  // },
  imgContainer: {
    width: '100%',
    maxWidth: { md: '370px', lg: '472px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  }
}
