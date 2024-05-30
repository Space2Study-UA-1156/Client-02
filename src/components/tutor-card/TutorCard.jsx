import { useState } from 'react'
import { useMediaQuery } from '@mui/material'

import TutorCardBlock from '~/components/tutor-card/TutorCardBlock'
import TutorCardMobile from '~/components/tutor-card/TutorCardMobile'
import GridCard from '~/components/tutor-card/GridCard'

const TutorCard = ({ index, gridLayout }) => {
  const [favourite, setFavourite] = useState(false)
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const addToFavourite = (state) => {
    console.log(state)
    setFavourite(!state)
  }
  const showDetails = () => {
    console.log('Show details')
  }
  const sendMessage = () => {
    console.log('Send message')
  }

  const props = {
    addToFavourite: addToFavourite,
    showDetails: showDetails,
    sendMessage: sendMessage,
    favourite,
    index
  }

  return (
    <>
      {isMobile ? (
        <TutorCardMobile {...props} />
      ) : gridLayout ? (
        <GridCard {...props} />
      ) : (
        <TutorCardBlock {...props} />
      )}
    </>
  )
}

export default TutorCard
