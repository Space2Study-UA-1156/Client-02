import { useState, useLayoutEffect } from 'react'

import AppPagination from '~/components/app-pagination/AppPagination'
import { Stack, Box } from '@mui/material'

import TutorCard from '~/components/tutor-card/TutorCard'

import { styles } from '~/containers/offers-block/OffersBlock.styles'

const OffersBlock = ({ gridLayout }) => {
  const [page, setPage] = useState(1)

  const itemsPerPage = gridLayout ? 9 : 4
  const totalItems = 200
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (_, value) => {
    setPage(value)
  }

  const tutorCards = Array.from({ length: totalItems }, (_, index) => (
    <TutorCard gridLayout={gridLayout} index={index} key={index} />
  ))

  const startIndex = (page - 1) * itemsPerPage
  const currentTutorCards = tutorCards.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  useLayoutEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const pageParam = +urlParams.get('page')
    if (pageParam) {
      setPage(pageParam + 1)
    }
  }, [])

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
