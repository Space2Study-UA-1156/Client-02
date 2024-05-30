import AppPagination from '~/components/app-pagination/AppPagination'
import { Stack, Box } from '@mui/material'

import { styles } from '~/containers/offers-block/OffersBlock.styles'

const OffersBlock = ({
  gridLayout,
  totalPages,
  currentTutorCards,
  handlePageChange,
  page
}) => {
  return (
    <Stack spacing={3} sx={styles.wrapper}>
      <Box sx={gridLayout ? styles.grid : styles.flex}>{currentTutorCards}</Box>
      <AppPagination
        handlePageChange={handlePageChange}
        page={page}
        totalPages={totalPages}
      />
    </Stack>
  )
}

export default OffersBlock
