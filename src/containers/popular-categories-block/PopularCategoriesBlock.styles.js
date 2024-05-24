export const styles = {
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
  }
}
