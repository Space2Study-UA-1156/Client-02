import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import { useSearchParams } from 'react-router-dom'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import { student, tutor } from '~/constants'

const FindOffers = () => {
  const { userRole } = useSelector((state) => state.appMain)
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  // eslint-disable-next-line no-unused-vars
  const view = searchParams.get('view') || 'list'
  const [role, setRole] = useState(() => searchParams.get('role') || userRole)

  const switchOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests')
    }
  }

  const changeRole = () => {
    setRole(prev => prev === tutor ? student : tutor)
  }

  useEffect(() => {
    setSearchParams({ view, role })
  }, [view, role, setSearchParams])

  return (
    <PageWrapper>
      Find offers
      <Stack>
        <AppContentSwitcher
          active={role === student}
          onChange={changeRole}
          styles={styles.switch}
          switchOptions={switchOptions}
          typographyVariant={'h6'}
        />
      </Stack>
    </PageWrapper>
  )
}

export default FindOffers
