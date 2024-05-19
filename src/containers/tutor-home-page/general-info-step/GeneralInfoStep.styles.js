import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: { md: '40px', lg: '43px' },
    height: { sm: '520px' },
    ...fadeAnimation
  },
  imgContainer: {
    maxHeight: 'auto',
    display: { xs: 'none', md: 'flex' }
  },
  imgMobile: {
    display: { xs: 'block', sm: 'none' },
    width: '60%',
    margin: 'auto',
    marginBottom: '20px'
  },
  img: {
    width: '100%'
  },
  formWrapper: {
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
  form: {
    display: 'grid',
    gridTemplateColumns: { sm: '1fr 1fr' },
    columnGap: { xs: '0px', sm: '20px' },
    rowGap: { xs: '10px', sm: '0px' },
    marginBottom: '20px'
  },
  requiredLabel: {
    fontSize: '12px'
  },
  summaryLength: {
    marginTop: '5px',
    fontSize: '14px'
  },
  checkbox: {
    '&.Mui-checked': {
      color: 'default'
    }
  },
  errorCheckbox: {
    color: 'red',
    '&.Mui-checked': {
      color: 'red'
    }
  },
  formControlLabel: {
    marginBottom: 0
  },
  errorHelperText: {
    color: 'red',
    marginTop: '0px'
  }
}
