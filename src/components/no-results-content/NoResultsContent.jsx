import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AppButton from '~/components/app-button/AppButton'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { useModalContext } from '~/context/modal-context'
import MagnifierIcon from '~/assets/img/app-icon/magnifier-icon.svg'
import { styles } from '~/components/no-results-content/NoResultsContent.styles'

const NoResultsContent = ({ contentName, actionModal }) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const handleButtonClick = () => {
    openModal({ component: actionModal })
  }

  return (
    <Box sx={styles.root}>
      <ImgTitleDescription
        description={t('constant.tryAgainText', { name: contentName })}
        img={MagnifierIcon}
        style={styles.imgTitleDescription}
        title={t('constant.resultsNotFound')}
      />
      <AppButton onClick={handleButtonClick} sx={styles.button} variant='tonal'>
        {t('constant.buttonRequest', { name: contentName })}
      </AppButton>
    </Box>
  )
}

export default NoResultsContent
