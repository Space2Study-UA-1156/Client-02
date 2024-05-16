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
  arrowIcon: {
    color: '#607D8B',
    ml: '10px',
    width: '20px',
    height: '20px'
  },
  searchIcon: {
    display: { xs: 'none', sm: 'flex' }
  },
  searchContainer: {
    borderRadius: '50px',
    py: '25px',
    px: '44px'
  },
  searchBox: {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  searchInput: {
    ml: '20px',
    flex: 1
  },
  searchButton: {
    backgroundColor: '#607D8B',
    ml: '24px',
    display: { xs: 'none', sm: 'flex' }
  },
  isMobile: {
    backgroundColor: '#607D8B',
    display: { xs: 'flex', sm: 'none' },
    ml: '24px'
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
