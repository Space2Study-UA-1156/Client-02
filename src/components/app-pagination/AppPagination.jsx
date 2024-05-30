import { Link } from 'react-router-dom'
import { PaginationItem, Box } from '@mui/material'
import { Pagination } from '@mui/material'

import { styles } from '~/components/app-pagination/AppPagination.styles'

const AppPagination = ({ totalPages, handlePageChange, page }) => {
  return (
    <Box sx={styles.wrapper}>
      <Pagination
        count={totalPages}
        onChange={handlePageChange}
        page={page}
        renderItem={(item) => {
          return <PaginationItem component={Link} {...item} />
        }}
      />
    </Box>
  )
}

export default AppPagination
