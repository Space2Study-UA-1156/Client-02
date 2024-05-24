import { styles } from '~/components/tutor-card/TutorCardMobile.styles'
import Box from '@mui/material/Box'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import LanguageIcon from '@mui/icons-material/Language'
import StarRateIcon from '@mui/icons-material/StarRate'
import { Typography } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'

import AppCard from '~/components/app-card/AppCard'
import HashLink from '~/components/hash-link/HashLink'
import AppButton from '../app-button/AppButton'

const TutorCardMobile = (props) => {
  return (
    <AppCard sx={styles.container}>
      <Box sx={styles.userBlock}>
        {props.favourite ? (
          <BookmarkIcon
            onClick={() => props.addToFavourite(props.favourite)}
            sx={styles.actionIcon}
          />
        ) : (
          <BookmarkBorderIcon
            onClick={() => props.addToFavourite(props.favourite)}
            sx={styles.actionIcon}
          />
        )}
        <Box component={HashLink} to={'/user-icon'}>
          <LanguageIcon sx={styles.userImage} />
        </Box>
        <Typography
          component={HashLink}
          sx={styles.userTitle}
          to={'/user-name'}
        >
          Jennifer W.
        </Typography>
      </Box>

      <Typography sx={styles.userDescription}>
        Advanced Quantum Mechanics: Theoretical Concepts, Mathematical
        Formulations in Modern Physics {props.index}
      </Typography>
      <Box sx={styles.userLangBlock}>
        <LanguageIcon />
        <Typography sx={styles.userLanguages}>Ukrainian, English</Typography>
      </Box>
      <Box sx={styles.infoFeatureWrapper}>
        <Typography sx={styles.infoFeature}>japanese japanese</Typography>
        <Typography sx={styles.infoFeature}>beginner</Typography>
        <Typography sx={styles.infoFeature}>beginner - advanced</Typography>
      </Box>
      <Box sx={styles.priceWrapper}>
        <Box>
          <Typography sx={styles.priceTitle}>75 UAH</Typography>
          <Typography sx={styles.hour}>/Hour</Typography>
        </Box>
        <Box sx={styles.ratingWrap}>
          <StarRateIcon sx={styles.ratingStar} />
          <Typography sx={styles.ratingCount}>5.0</Typography>
          <Typography sx={styles.hour}>23 reviews</Typography>
        </Box>
      </Box>
      <Box sx={styles.actionButtons}>
        <AppButton onClick={() => props.showDetails()} sx={styles.actionShow}>
          Show details
        </AppButton>
        <AppButton onClick={() => props.sendMessage()} sx={styles.actioSend}>
          Send message
        </AppButton>
      </Box>
    </AppCard>
  )
}

export default TutorCardMobile
