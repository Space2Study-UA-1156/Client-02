export const styles = {
  wrapper: {
    boxSizing: 'border-box',
    width: {
      lg: '360px',
      md: '328px',
      sm: '288px'
    },
    padding: { xs: '20px 30px', lg: '25px 32px' },
    '&:hover': {
      boxShadow: '0px 3px 16px 2px rgba(144, 164, 174, 0.56)',
      cursor: 'pointer'
    }
  },
  content: {
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
    },
    titleWithDescription: {
      title: {
        fontSize: '20px',
        color: '#000',
        letterSpacing: 0.25,
        fontWeight: 600,

        mb: '4px'
      },
      description: {
        fontSize: '14px',
        color: '#607D8B',
        fontWeight: 400
      }
    },
    img: {
      background: 'red',
      display: 'block',
      height: '62px',
      width: '62px',
      borderRadius: '6px',
      padding: '18px',
      boxSizing: 'border-box'
    }
  }
}
