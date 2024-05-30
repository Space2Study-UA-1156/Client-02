const style = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: '0' },
    // mt: '-16px',
    // mb: '-16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: { lg: '122px', md: '40px' }
    // maxHeight: '100vh',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: { sm: 'sm', md: 'md', lg: '644px' },
    height: '100%',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: { xs: '24px' },
    pl: { xs: '36px' },
    pr: { xs: '24px' },
    pb: { xs: '36px' }
  }
}

export default style
