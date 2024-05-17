import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: { sm: 'flex' },
    justifyContent: 'space-between',
    gap: { sm: '30px', md: '30px', lg: '77px' },
    height: { sm: '485px' },
    paddingBottom: { sm: '10px', md: '0px' },
    ...fadeAnimation
  },
  placeholder: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '400px',
    fontSize: '14px',
    lineHeight: '16.41px',
    color: 'primary.900'
  },
  title: {
    marginBottom: { xs: '22px', md: '20px' },
    fontSize: '16px',
    lineHeight: '18.96px',
    letterSpacing: '0.15px'
  },
  previewImg: {
    position: 'absolute',
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  dragAndDrop: {
    root: {
      marginTop: { xs: '22px', sm: '15px', md: '0px' },
      marginBottom: '10px',
      width: { sm: '100%', md: '440px' },
      height: { xs: '270px', sm: '280px', md: '440px' },
      maxWidth: { sm: '280px', md: '440px' },
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '20px'
    },
    uploadBox: {
      height: 'inherit',
      boxSizing: 'border-box',
      border: '1px dashed',
      borderRadius: '20px',
      borderColor: 'primary.400',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    activeDrag: {
      border: '2px dashed',
      borderColor: '#607d8b'
    }
  },
  fileUploader: {
    root: {
      display: 'flex',
      flexDirection: 'row',
      gap: { xs: '10px', md: '19px', lg: '0px' },
      maxWidth: { sm: '335px', md: '380px', lg: '330px' },
      height: '80px'
    },
    containerBtn: {
      flex: { xs: '3', sm: '1' }
    }
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: { sm: '100%', md: '430px' },
    margin: { sm: '0 auto', md: '0' }
  }
}
