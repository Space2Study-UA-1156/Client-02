const style = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: { lg: '122px', md: '40px' },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: { xs: '24px', sm: '60px' },
    pl: { xs: '8px', sm: '60px', md: '16px' },
    pr: { xs: '24px', sm: '60px' },
    pb: { xs: '8px', sm: '60px', md: '16px' }
  }
}

export default style
