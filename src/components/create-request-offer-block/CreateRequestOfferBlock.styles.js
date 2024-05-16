import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  box: {
    display: { md: 'flex' },
    flexWrap: { md: 'no-wrap' },
    justifyContent: { md: 'space-between' },
    backgroundColor: 'companyBlue',
    borderRadius: '16px',
    padding: { lg: '60px 50px', md: '40px 35px', xs: '20px' }
  },
  title: {
    typography: { md: '32px', sm: 'h5', xs: 'h6' },
    marginBottom: { md: '14px', xs: '8px' }
  },
  paragraph: {
    typography: { sm: 'body1', xs: 'body2' },
    marginBottom: { md: '20px', xs: '14px' },
    maxWidth: { lg: '750px', md: '600px' }
  },
  btn: {
    width: { md: 'fit-content', xs: '100%' },
    py: { lg: '14px', xs: '10px' },
    px: { lg: '24px', xs: '32px' },
    boxShadow: mainShadow
  },
  image: {
    display: { md: 'block', xs: 'none' },
    width: '168px',
    height: '168px'
  }
}
