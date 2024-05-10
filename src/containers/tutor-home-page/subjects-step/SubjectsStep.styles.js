import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '432px'
  },
  image: {
    img: {
      margin: '0 auto',
      display: 'block',
      maxWidth: { xs: '180px', sm: '100%' }
    }
  },
  titleWithForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '16px', sm: '20px' },
    maxWidth: '432px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '16px', sm: '20px' }
  },
  inputField: {
    width: '100%'
  }
}
