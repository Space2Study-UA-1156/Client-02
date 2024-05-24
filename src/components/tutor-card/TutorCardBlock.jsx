import { useMediaQuery } from '@mui/material'
import { Fragment } from 'react/jsx-runtime'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import LanguageIcon from '@mui/icons-material/Language'
import StarRateIcon from '@mui/icons-material/StarRate'
import BookmarkIcon from '@mui/icons-material/Bookmark'

import AppCard from '~/components/app-card/AppCard'
import HashLink from '~/components/hash-link/HashLink'

import { styles } from '~/components/tutor-card/TutorCardBlock.styles'
import AppButton from '../app-button/AppButton'

const TutorCardBlock = (props) => {
  const tablet = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const stars = [...Array(5)].map((_, index) => (
    <Fragment key={index}>
      <StarRateIcon sx={styles.userRatingStar} />
      {index === 4 && (
        <Typography sx={styles.userRatingCurrent}>3.5</Typography>
      )}
    </Fragment>
  ))

  return (
    <AppCard sx={styles.container}>
      <Box sx={styles.userBlock}>
        <Box component={HashLink} to={'/user-icon'}>
          <LanguageIcon sx={styles.userImage} />
        </Box>
        {!tablet && (
          <Typography
            component={HashLink}
            sx={styles.userName}
            to={'/user-name'}
          >
            Jennifer W.
          </Typography>
        )}

        <Box sx={styles.userRating}>{stars}</Box>
        <Typography sx={styles.userReviews}>10 reviews</Typography>
      </Box>
      <Box sx={styles.infoBlock}>
        {tablet && (
          <Typography
            component={HashLink}
            sx={styles.userName}
            to={'/user-name'}
          >
            Jennifer W.
          </Typography>
        )}
        <Typography sx={styles.infoTitle}>
          Advanced Quantum Mechanics: Theoretical Concepts, Mathematical
          Formulations in Modern Physics {props.index}
        </Typography>
        <Box sx={styles.flexBlock}>
          <Typography sx={styles.infoFeature}>German</Typography>
          <Typography sx={styles.infoFeature}>beginner - advanced</Typography>
        </Box>
        <Typography sx={styles.infoDescription}>
          Hello. There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by injected
          humour, or randomised words which dont look even slightly believable.
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, but the majority have suffered alteration in some form, by
          injected humour, or randomised words which dont look even slightly
          believable...
        </Typography>
        <Box sx={styles.flexBlock}>
          <LanguageIcon />
          <Typography sx={styles.infoLang}>Ukrainian, English</Typography>
        </Box>
      </Box>
      <Box sx={styles.actionBlock}>
        <Box sx={styles.actionPriceWrap}>
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

          <Typography sx={styles.actionPrice}>75 UAH</Typography>
          <Typography sx={styles.actionHours}>/Hour</Typography>
        </Box>
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

export default TutorCardBlock
