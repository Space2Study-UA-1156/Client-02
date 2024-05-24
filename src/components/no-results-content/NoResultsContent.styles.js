export const styles = {
  root: {
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: { xs: '395px', sm: '347px', md: '500px' },
    marginTop: '20px',
    paddingTop: { xs: '32px', md: '100px' }
  },
  imgTitleDescription: {
    titleWithDescription: {
      wrapper: {
        paddingLeft: { xs: '24px' },
        paddingRight: { xs: '24px' },
        maxWidth: { xs: '350px', sm: '488px' }
      },
      title: {
        typography: 'h5',
        marginBottom: '16px'
      }
    },
    img: {
      marginBottom: '24px'
    },
    root: {
      textAlign: 'center',
      mb: { xs: '24px', md: '33px' }
    }
  }
}
