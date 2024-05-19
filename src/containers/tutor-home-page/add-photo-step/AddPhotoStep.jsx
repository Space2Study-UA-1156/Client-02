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
  const {
    photoLabel,
    data,
    handleStepData,
    handleNonInputValueChange,
    errors
  } = useStepContext()
  const initialState = []
  const [uploadPhotoError, setUploadPhotoError] = useState('')

  const emitter = ({ files, error }) => {
    if (!error && files.length) {
      handleNonInputValueChange('photo', files[0])
      handleStepData(photoLabel, files[0], null)
      setUploadPhotoError('')
    }
    if (error) {
      setUploadPhotoError(error)
    }
  }

  const photoPreviewContainer = (testId) => (
    <Box data-testid={testId} sx={{ flex: '1' }}>
      <DragAndDrop
        emitter={emitter}
        error={Boolean(errors.photo)}
        helperText={t(errors.photo)}
        initialState={initialState}
        required
        style={style.dragAndDrop}
        validationData={validationData}
      >
        {data.photo.size ? (
          <Box
            alt={t('becomeTutor.photo.imageAlt')}
            component={'img'}
            src={createObjectURL(data.photo)}
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
      <Box sx={style.formContainer}>
        <Box>
          <Typography sx={style.title}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <Box sx={style.fileUploader.root}>
            <Box sx={style.fileUploader.containerBtn}>
              <FileUploader
                buttonText={
                  data.photo.size
                    ? data.photo.name
                    : t('becomeTutor.photo.button')
                }
                emitter={emitter}
                initialError={t(uploadPhotoError)}
                initialState={initialState}
                validationData={validationData}
              ></FileUploader>
            </Box>
            {data.photo.size && !uploadPhotoError && (
              <DoneRoundedIcon color='success' sx={{ mt: '10px' }} />
            )}
          </Box>
          {(isMobile || isTablet) &&
            photoPreviewContainer('photo-preview-small')}
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
