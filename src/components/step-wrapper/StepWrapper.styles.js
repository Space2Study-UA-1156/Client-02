import { fadeAnimation } from '~/styles/app-theme/custom-animations'

const btnStyle = {
  padding: '10px 20px',
  display: 'flex',
  columnGap: 1
}

const baseTab = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: { xs: 'center', sm: 'flex-start' },
  width: { sm: '107px' },
  borderBottom: { sm: '1px solid' },
  cursor: 'pointer',
  p: { xs: '6px 8px', sm: '0 0 14px 0' }
}

export const styles = {
  root: {
    display: { xs: 'flex' },
    flexDirection: { xs: 'column' },
    height: { xs: '100vh', sm: 'auto' },
    p: { lg: '50px 90px', sm: '40px 50px', xs: '40px 15px' }
  },
  defaultTab: {
    ...baseTab,
    borderColor: { sm: 'primary.500' }
  },
  activeTab: {
    color: 'text',
    fontWeight: 600,
    borderBottom: { sm: '3px solid' },
    borderColor: { sm: 'primary.500' },
    p: { xs: '6px 8px', sm: '0 0 14px 0' },
    backgroundColor: { xs: 'basic.grey', sm: 'transparent' },
    borderRadius: { xs: '5px', sm: '0' },
    ...fadeAnimation
  },
  errorTab: {
    ...baseTab,
    color: 'red',
    borderColor: { sm: 'primary.500' }
  },
  activeErrorTab: {
    ...baseTab,
    color: 'red',
    borderColor: { sm: 'red' },
    borderBottom: { sm: '3px solid' }
  },
  steps: {
    display: 'flex',
    justifyContent: { xs: 'center', md: 'end', sm: 'center' },
    flexWrap: 'wrap',
    columnGap: '1px'
  },
  stepContent: {
    display: { xs: 'flex', sm: 'block' },
    justifyContent: 'center',
    flex: 1,
    mt: { xs: '24px', sm: '30px' }
  },
  btnWrapper: {
    display: 'flex',
    mt: '10px',
    maxHeight: '40px'
  },
  btn: btnStyle,
  finishBtn: {
    ...btnStyle,
    minWidth: '96px'
  }
}
