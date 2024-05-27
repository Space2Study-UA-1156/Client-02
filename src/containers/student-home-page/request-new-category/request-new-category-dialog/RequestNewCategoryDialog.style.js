export const style = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: { lg: '63px', md: '40px' },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }
  },
  imgContainer: {
    width: '100%',
    maxWidth: { md: '370px', lg: '472px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' },
    pl: '96px'
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: { xs: '24px', sm: '40px', lg: '56px' },
    pl: { xs: '8px', sm: '80px', md: '16px' }
  },
  form: {
    overflow: 'auto',
    maxWidth: { xs: '343px', sm: '580px', md: '1100px' },
    pt: '16px',
    pr: { xs: '8px', sm: '80px', lg: '90px' },
    pb: { xs: '24px', sm: '40px', lg: '56px' }
  },
  titleWithDescription: {
    wrapper: {
      marginBottom: '20px'
    },
    title: {
      color: 'primary.700',
      fontWeight: '500',
      mb: '8px',
      fontSize: { xs: '24px', sm: '35px' },
      lineHeight: { xs: '36px', md: '42px' },
      marginBottom: '16px'
    },
    description: {
      color: 'primary.700'
    }
  }
}
