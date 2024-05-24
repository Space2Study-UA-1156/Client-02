export const styles = {
  wrapper: {
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
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
