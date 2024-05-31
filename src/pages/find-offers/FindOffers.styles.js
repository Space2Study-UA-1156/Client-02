export const styles = {
  mainWrapper: {
    maxWidth: '1128px',
    margin: '0 auto'
  },
  filter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1128px',
    width: '100%',
    margin: 'auto'
  },
  switch: {
    display: { sm: 'flex', xs: 'none' }
  },
  popularTitle: {
    fontWeight: '500',
    fontSize: '35px',
    lineHeight: '53px',
    margin: '30px auto',
    maxWidth: '1128px',
    width: '100%'
  },
  gridWrapper: {
    display: 'grid',
    gap: '20px',
    maxWidth: '1128px',
    width: '100%',
    margin: '0 auto',
    marginBottom: '100px',
    gridTemplateColumns: {
      lg: '1fr 1fr 1fr',
      sm: '1fr 1fr',
      xs: '1fr'
    }
  }
}
