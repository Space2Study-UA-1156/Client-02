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
  image: {
    height: 'inherit',
    width: '450px',
    maxWidth: { md: '50%', lg: '450px' }
  },
  titleWithForm: {
    width: '432px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '30px'
  },
  form: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '20px'
  },
  inputField: {
    width: '100%'
  }
}
