export const styles = {
  container: {
    flexDirection: 'column',
    padding: '24px 20px'
  },
  userBlock: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  userImage: {
    height: '100px',
    width: '100px',
    color: '#263238',
    marginRight: '20px'
  },
  actionIcon: {
    position: 'absolute',
    cursor: 'pointer',
    right: '0'
  },
  userTitle: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '0.15px',
    margin: '8px 0',
    color: '#607D8B',
    textDecoration: 'none',
    display: 'block'
  },
  userDescription: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25%',
    marginBottom: '6px',
    color: '#263238',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  userLangBlock: {
    display: 'flex',
    margin: '8px 0'
  },
  userLanguages: {
    margin: '0 8px',
    marginBottom: '10px',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '27px',
    color: '#78909C'
  },
  infoFeatureWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px'
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
  priceWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '7px 0 14px'
  },
  price: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: '#263238'
  },
  hour: {
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '15px',
    letterSpacing: '1.5px',
    padding: '2px 0',
    color: '#607D8B'
  },
  ratingWrap: {
    position: 'relative'
  },
  ratingStar: {
    position: 'absolute',
    left: '-4px',
    color: '#FFB000'
  },
  ratingCount: {
    paddingLeft: '24px',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: '#263238'
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  actionShow: {
    width: '100%',
    marginBottom: '16px',
    maxWidth: '425px'
  },
  actioSend: {
    width: '100%',
    maxWidth: '425px',
    color: 'primary.900',
    backgroundColor: 'primary.100',
    '&:hover': {
      color: 'primary.100'
    }
  }
}
