import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: { md: '40px', lg: '43px' },
    height: { sm: '520px' },
    ...fadeAnimation
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: { sm: '100%', md: '430px' },
    margin: { sm: '0 auto', md: '0' }
  },
  placeholder: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '400px',
    fontSize: '14px',
    lineHeight: '16.41px',
    color: 'primary.900'
  },
  title: {
    marginBottom: '20px',
    width: { sm: '100%', md: '430px' }
  },
  previewImg: {
    position: 'absolute',
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  dragAndDrop: {
    root: {
      marginTop: { xs: '25px', sm: '25px', md: '0px' },
      marginBottom: '10px',
      width: { sm: '270px', md: 'auto' },
      height: { xs: '350px', sm: '260px', md: 'auto' },
      maxWidth: '480px',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '20px',
      marginLeft: { md: '30px' }
    },
    uploadBox: {
      aspectRatio: { md: '1 / 1' },
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
      gap: { xs: '10px', md: '19px', lg: '10px' },
      maxWidth: { sm: '335px', md: '380px', lg: '330px' },
      height: '80px'
    },
    containerBtn: {
      flex: { xs: '3', sm: '3' }
    }
  }
}
