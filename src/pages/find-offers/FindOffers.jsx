import { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { Stack, Box, Typography } from '@mui/material'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OffersBlock from '~/containers/offers-block/OffersBlock'
import ToggleLayoutView from '~/components/toggle-layout-view/ToggleLayoutView'
import TutorCard from '~/components/tutor-card/TutorCard'
import CategoryItemCard from '~/components/category-item-card/CategoryItemCard'

import { categoryService } from '~/services/category-service'
import { offerRequestService } from '~/services/offers-service'

import { student, tutor } from '~/constants'

import { styles } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const { userRole } = useSelector((state) => state.appMain)
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const view = searchParams.get('view') || 'list'
  const [page, setPage] = useState(() => +searchParams.get('page') || 1)
  const [role, setRole] = useState(() => searchParams.get('role') || userRole)
  const [gridLayout, setGridLayout] = useState(
    () => searchParams.get('layout') === 'grid'
  )
  const [categoriesData, setCategoriesData] = useState([])
  const [offersData, setOffersData] = useState([])

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

  const itemsPerPage = 9
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
    setSearchParams({ view, role, page, layout: gridLayout ? 'grid' : 'flex' })
  }, [view, role, setSearchParams, gridLayout, page])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, offersResponse] = await Promise.all([
          categoryService.getCategories(),
          offerRequestService.getOffers()
        ])

        setCategoriesData(categoriesResponse.data.items)
        setOffersData(offersResponse.data.items)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  console.log(offersData)

  return (
    <PageWrapper sx={styles.mainWrapper}>
      <Box sx={styles.filter}>
        <Box />
        <Stack>
          <AppContentSwitcher
            active={role === student}
            onChange={changeRole}
            styles={styles.switch}
            switchOptions={switchOptions}
            typographyVariant={'h6'}
          />
        </Stack>
        <ToggleLayoutView
          gridLayout={gridLayout}
          setGridLayout={setGridLayout}
        />
      </Box>

      <OffersBlock
        currentTutorCards={currentTutorCards}
        gridLayout={gridLayout}
        handlePageChange={handlePageChange}
        page={page}
        totalPages={totalPages}
      />
      <Typography sx={styles.popularTitle}>Popular Categories</Typography>
      <Box sx={styles.gridWrapper}>
        {categoriesData
          .filter((_, index) => index < 9)
          .sort((a, b) => b.totalOffers.student - a.totalOffers.student)
          .map((category, index) => (
            <CategoryItemCard
              bg={category.appearance.color}
              category={category}
              id={category._id}
              image={category.appearance.icon_path}
              key={`${category.id}-${index}`}
              offers={category?.totalOffers.student}
            />
          ))}
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
