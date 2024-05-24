export const styles = {
  container: {
    gap: { xs: '20px', md: '50px' },
    padding: '31px 20px',
    maxWidth: '1128px',
    margin: '0 auto'
  },
  userBlock: {
    width: { xs: '99px', md: '112' }
  },
  userImage: {
    width: { xs: '80px', md: '92px' },
    height: { xs: '80px', md: '92px' },
    color: 'black'
  },
  userName: {
    color: { xs: '#263238', md: '#607D8B' },
    fontSize: { xs: '20px', md: '16px' },
    fontWeight: '500',
    margin: '14px 0 4px',
    lineHeight: '24px !important',
    letterSpacing: '0.5px !important',
    textDecoration: 'none',
    display: 'block'
  },
  userRating: {
    display: 'flex',
    alignItems: 'center',
    background: '#ECEFF1',
    width: { xs: '96px', md: '106px' },
    marginBottom: '4px',
    padding: '3.5px',
    borderRadius: '3.5px'
  },
  userRatingStar: {
    color: '#FFB000',
    width: { xs: '14px', md: '16px' }
  },
  userRatingCurrent: {
    marginLeft: '5px',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px'
  },
  userReviews: {
    color: '#607D8B',
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0.4px'
  },
  infoBlock: { width: '64%' },
  infoTitle: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: { xs: '400', md: '600' },
    lineHeight: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical'
  },
  infoFeature: {
    padding: '7px 8px 7px 8px',
    marginRight: '4px',
    borderRadius: '10px',
    background: '#79B260',
    textTransform: 'uppercase',
    fontSize: '10px',
    lineHeight: '15px',
    letterSpacing: '1.5px',
    '&:not(:first-of-type)': {
      background: '#79B26033'
    }
  },
  infoDescription: {
    color: '#546E7A',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25%',
    marginBottom: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: { xs: 3, md: 6 },
    WebkitBoxOrient: 'vertical'
  },
  infoLang: {
    color: '#78909C',
    fontSize: '14px',
    margin: '0 4px',
    lineHeight: '25px !important',
    letterSpacing: '0.25% !important'
  },

  flexBlock: { display: 'flex', marginBottom: '10px' },
  actionPriceWrap: {
    position: 'relative',
    marginBottom: '30px'
  },
  actionPrice: {
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '28px'
  },
  actionHours: {
    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '15px',
    color: '#263238'
  },
  actionBlock: {
    width: { xs: '166px', md: '200px' }
  },
  actionIcon: {
    position: 'absolute',
    cursor: 'pointer',
    right: '0'
  },
  actionShow: {
    width: '100%',
    minWidth: '166px',
    marginBottom: '16px'
  },
  actioSend: {
    width: '100%',
    minWidth: '166px',
    color: 'primary.900',
    backgroundColor: 'primary.100',
    '&:hover': {
      color: 'primary.100'
    }
  }
}
