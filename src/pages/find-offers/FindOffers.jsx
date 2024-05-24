import { useState } from 'react'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OffersBlock from '~/containers/offers-block/OffersBlock'
import { Box } from '@mui/material'
import ToggleLayoutView from '~/components/toggle-layout-view/ToggleLayoutView'

const FindOffers = () => {
  const [gridLayout, setGridLayout] = useState(false)

  return (
    <PageWrapper>
      <Box>
        <ToggleLayoutView
          gridLayout={gridLayout}
          setGridLayout={setGridLayout}
        />
      </Box>
      <OffersBlock gridLayout={gridLayout} />
    </PageWrapper>
  )
}

export default FindOffers
