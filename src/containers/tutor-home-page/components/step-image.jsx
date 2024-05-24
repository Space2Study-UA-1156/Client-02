import Box from '@mui/material/Box'

import { styles } from './step-image.styles'

const StepImage = ({ imageUrl = '', imageAlt = 'image' }) => {
  return <Box alt={imageAlt} component='img' src={imageUrl} sx={styles.image} />
}

export default StepImage
