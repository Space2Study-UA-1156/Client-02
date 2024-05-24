import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import GridViewIcon from '@mui/icons-material/GridView'

import AppButton from '~/components/app-button/AppButton'
import { Box } from '@mui/material'

import { styles } from '~/components/toggle-layout-view/ToggleLayoutView.styles'

const ToggleLayoutView = ({ gridLayout, setGridLayout }) => {
  return (
    <Box sx={styles.wrapper}>
      <AppButton
        onClick={() => setGridLayout(false)}
        sx={
          gridLayout
            ? styles.button
            : { ...styles.button, border: 'solid 1px #263238' }
        }
      >
        <FormatListBulletedIcon />
      </AppButton>
      <AppButton
        onClick={() => setGridLayout(true)}
        sx={
          !gridLayout
            ? styles.button
            : { ...styles.button, border: 'solid 1px #263238' }
        }
      >
        <GridViewIcon />
      </AppButton>
    </Box>
  )
}

export default ToggleLayoutView
