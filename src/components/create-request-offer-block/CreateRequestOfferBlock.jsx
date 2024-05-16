import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import AppButton from '~/components/app-button/AppButton'

import { images } from '~/components/create-request-offer-block/create-request-offer-block.constants'
import { styles } from '~/components/create-request-offer-block/CreateRequestOfferBlock.styles'

const CreateRequestOfferBlock = () => {
  const { userRole } = useSelector((state) => state.appMain)

  return (
    <Box sx={styles.box}>
      <Box component={'div'}>
        <Typography sx={styles.title} variant='h2'>
          {userRole === 'tutor'
            ? 'Tutors for private lessons'
            : 'Students for private lessons'}
        </Typography>
        <Typography sx={styles.paragraph}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </Typography>
        <AppButton sx={styles.btn}>
          {userRole === 'tutor' ? 'Create request' : 'Create offer'}
        </AppButton>
      </Box>
      <Box
        alt={userRole === 'tutor' ? images[0].alt : images[1].alt}
        component='img'
        src={userRole === 'tutor' ? images[0].image : images[1].image}
        sx={styles.image}
      />
    </Box>
  )
}

export default CreateRequestOfferBlock
