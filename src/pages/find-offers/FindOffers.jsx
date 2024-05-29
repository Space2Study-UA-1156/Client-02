import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
// import { styles } from '~/pages/find-offers/FindOffers.styles'
import { student, tutor } from '~/constants'
import OffersBlock from '~/containers/offers-block/OffersBlock'
import ToggleLayoutView from '~/components/toggle-layout-view/ToggleLayoutView'

const FindOffers = () => {
  const { userRole } = useSelector((state) => state.appMain)
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const view = searchParams.get('view') || 'list'
  const [role, setRole] = useState(() => searchParams.get('role') || userRole)
  const [gridLayout, setGridLayout] = useState(false)

  const switchOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests')
    }
  }

  const changeRole = () => {
    setRole((prev) => (prev === tutor ? student : tutor))
  }

  useEffect(() => {
    setSearchParams({ view, role })
  }, [view, role, setSearchParams])

  return (
    <PageWrapper>
      <Box>
        <Stack>
          <AppContentSwitcher
            active={role === student}
            onChange={changeRole}
            // styles={styles.switch}
            switchOptions={switchOptions}
            typographyVariant={'h6'}
          />
        </Stack>
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
