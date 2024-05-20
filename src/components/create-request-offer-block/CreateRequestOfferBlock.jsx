import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useModalContext } from '~/context/modal-context'

import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import CreateOfferDialog from '~/containers/student-home-page/create-offer-dialog/CreateOfferDialog'
import AppButton from '~/components/app-button/AppButton'

import { images } from '~/components/create-request-offer-block/create-request-offer-block.constants'
import { styles } from '~/components/create-request-offer-block/CreateRequestOfferBlock.styles'

const CreateRequestOfferBlock = () => {
  const { openModal } = useModalContext()
  const { t } = useTranslation()
  const { userRole } = useSelector((state) => state.appMain)

  return (
    <Box sx={styles.box}>
      <Box component={'div'}>
        <Typography sx={styles.title} variant='h2'>
          {t(`findOffers.offerRequestBlock.title.${userRole}`)}
        </Typography>
        <Typography sx={styles.paragraph}>
          {t('findOffers.offerRequestBlock.description')}
        </Typography>
        <AppButton
          onClick={() => openModal({ component: <CreateOfferDialog /> })}
          sx={styles.btn}
        >
          {t(`offerPage.createOffer.buttonTitles.${userRole}`)}
        </AppButton>
      </Box>
      <Box
        alt={userRole === 'student' ? images[0].alt : images[1].alt}
        component='img'
        src={userRole === 'student' ? images[0].image : images[1].image}
        sx={styles.image}
      />
    </Box>
  )
}

export default CreateRequestOfferBlock
