import { useTranslation } from 'react-i18next'
import { useCallback, useMemo } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomplete/AsyncAutocomplete'

import { categoryService } from '~/services/category-service'
import { maxLengthTextField } from '~/containers/student-home-page/request-new-category/request-new-category-dialog/constants'

import { style } from '~/containers/student-home-page/request-new-category/request-new-category-form/RequestNewCategoryForm.style'

const RequestNewCategoryForm = ({
  data,
  errors,
  handleSubmit,
  handleInputChange,
  handleSelectChange,
  handleBlur
}) => {
  const { t } = useTranslation()

  const getOptionLabel = useCallback((option) => option.name, [])
  const categoriesOptions = useMemo(
    () => ({
      label: t('studentHomePage.requestNewCategory.newCategoryPlaceholder'),
      required: true,
      error: Boolean(errors.newCategory),
      helperText: t(errors.newCategory)
    }),
    /* eslint-disable-next-line */
    [errors.newCategory]
  )

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Typography sx={style.label} variant='body2'>
        {t('studentHomePage.requestNewCategory.createNewSubjectTitle')}
      </Typography>
      <AppTextField
        errorMsg={t(errors.newSubject)}
        fullWidth
        label={t('studentHomePage.requestNewCategory.newSubjectPlaceholder')}
        onBlur={handleBlur('newSubject')}
        onChange={handleInputChange('newSubject')}
        required
        sx={{ mb: '5px' }}
        type='text'
        value={data.newSubject}
      />
      <Typography sx={style.label} variant='body2'>
        {t('studentHomePage.requestNewCategory.createNewCategoryTitle')}
      </Typography>
      <Box sx={{ mb: '5px', height: '71px' }}>
        <AsyncAutocomplete
          fetchOnFocus
          freeSolo
          getOptionLabel={getOptionLabel}
          onBlur={handleBlur('newCategory', true)}
          onChange={handleSelectChange('newCategory')}
          service={categoryService.getCategoriesNames}
          textFieldProps={categoriesOptions}
          value={data.newCategory}
        />
      </Box>
      <Typography sx={style.label} variant='body2'>
        {t('studentHomePage.requestNewCategory.addInformationTitle')}
      </Typography>
      <AppTextArea
        errorMsg={t(errors.additionalInformation)}
        fullWidth
        maxLength={maxLengthTextField + 1}
        minRows={4}
        onBlur={handleBlur('additionalInformation')}
        onChange={handleInputChange('additionalInformation')}
        placeholder={t(
          'studentHomePage.requestNewCategory.addInformationPlaceholder'
        )}
        type='text'
        value={data.additionalInformation}
      />
      <AppButton
        disabled={
          Object.values(errors).some((error) => Boolean(error)) ||
          !data.newSubject ||
          !data.newCategory
        }
        sx={style.btnSendRequest}
        type='submit'
      >
        {t('studentHomePage.requestNewCategory.btnSendRequest')}
      </AppButton>
    </Box>
  )
}

export default RequestNewCategoryForm
