export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  },
  title: {
    fontSize: '32px',
    fontWeight: '500',
    mb: '8px'
  },
  showOffers: {
    textDecoration: 'none',
    color: '#607D8B',
    alignItems: 'center',
    my: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    fontWeight: '500'
  },
  links: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    my: '20px',
    mx: '40px'
  },
  link: {
    margin: '0px',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    textTransform: 'initial',
    fontFamily: 'Rubik, -apple-system, Arial, sans-serif',
    color: 'rgb(96, 125, 139)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: '500',
    textDecoration: 'none'
  },
  searchIcon: {
    display: { xs: 'none', sm: 'flex' }
  },
  searchBox: {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  autocompleteBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: 'rgba(144, 164, 174, 0.12) 0px 3px 16px 2px',
    borderRadius: '50px',
    py: '25px',
    px: '45px',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: { sm: 'space-between' }
  },
  categoriesAutocomplete: {
    maxWidth: { xs: '100%', sm: '220px' },
    width: '100%',
    mr: { xs: 'none', sm: '30px' }
  },
  subjectsAutocomplete: {
    width: '100%',
    flex: 1,
    '& fieldset': { border: 'none' }
  },
  isMobile: {
    display: { xs: 'block', sm: 'none' }
  },
  gridBox: {
    maxWidth: '1128px',
    margin: '0 auto',
    marginBottom: '30px',
    display: 'grid',
    gridTemplateColumns: {
      lg: 'repeat(3, 1fr)',
      md: 'repeat(2, 1fr)',
      sm: 'repeat(1, 1fr)'
    },
    gap: '24px'
  },
  viewMoreButton: {
    width: '154px',
    margin: '0 auto',
    color: 'primary.900',
    backgroundColor: 'primary.100',
    '&:hover': {
      color: 'primary.100'
    }
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center'
  },
  underSearchBoxText: {
    display: 'flex',
    justifyContent: 'center',
    my: '30px',
    textAlign: 'center'
  },
  underlineText: {
    color: 'primary.900',
    mx: '5px',
    textDecoration: 'underline',
    fontWeight: '500'
  }
}
