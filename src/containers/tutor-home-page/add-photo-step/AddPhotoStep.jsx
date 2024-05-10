import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'

import { useStepContext } from '~/context/step-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'
import { createObjectURL } from '~/utils/img'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isMobile, isTablet, isLaptopAndAbove } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()
  const { photo } = stepData
  const initialState = []
  const [uploadPhotoError, setUploadPhotoError] = useState('')

  const emitter = ({ files, error }) => {
    if (!error && files.length) {
      handleStepData('photo', files[0], null)
      setUploadPhotoError('')
    }
    if (error) {
      setUploadPhotoError(error)
    }
  }

  const photoPreviewContainer = (testId) => (
    <Box data-testId={testId}>
      <DragAndDrop
        emitter={emitter}
        initialState={initialState}
        style={style.dragAndDrop}
        validationData={validationData}
      >
        {photo.size ? (
          <Box
            alt={t('becomeTutor.photo.imageAlt')}
            component={'img'}
            src={createObjectURL(photo)}
            sx={style.previewImg}
          />
        ) : (
          <Typography sx={style.placeholder}>
            {t('becomeTutor.photo.placeholder')}
          </Typography>
        )}
      </DragAndDrop>
    </Box>
  )

  return (
    <Box sx={style.root}>
      {isLaptopAndAbove && photoPreviewContainer('photo-preview-large')}
      <Box>
        <Typography sx={style.title}>
          {t('becomeTutor.photo.description')}
        </Typography>
        <Box sx={style.fileUploader.root}>
          <Box sx={style.fileUploader.containerBtn}>
            <FileUploader
              buttonText={t('becomeTutor.photo.button')}
              emitter={emitter}
              initialError={t(uploadPhotoError)}
              initialState={initialState}
              validationData={validationData}
            ></FileUploader>
          </Box>
          {photo.size && !uploadPhotoError && (
            <DoneRoundedIcon color='success' sx={{ mt: '10px' }} />
          )}
        </Box>
        {(isMobile || isTablet) && photoPreviewContainer('photo-preview-small')}
        <Box sx={style.navigationBtn}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default AddPhotoStep
