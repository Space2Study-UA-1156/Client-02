export const styles = {
  wrapper: {
    margin: '0 auto',
    height: '100%'
  },
  grid: {
    display: 'grid',
    maxWidth: '1128px',
    height: '100%',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)'
    },
    gap: '20px'
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
}
