import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Levels from '~/components/levels/Levels'
import AsyncAutocomplete from '~/components/async-autocomplete/AsyncAutocomplete'

import { Stack, Slider, InputAdornment } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppChipList from '~/components/app-chips-list/AppChipList'

import TitleIcon from '~/assets/img/categories/leak_add.svg'
import StepOneIcon from '~/assets/img/categories/counter_1.svg'
import StepTwoIcon from '~/assets/img/categories/counter_2.svg'
import StepThreeIcon from '~/assets/img/categories/counter_3.svg'
import HryvniaIcon from '~/assets/img/categories/hryvnia.svg'

import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

import styles from '~/components/create-request-offer-form/CreateRequestOfferForm.styles'

const CreateRequestOfferForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  handleNonInputValueChange,
  data,
  errors,
  closeModal
}) => {
  const { t } = useTranslation()
  const { userRole } = useSelector((state) => state.appMain)
  const modalRef = useRef(null)
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const getOptionLabel = useCallback((option) => option.name, [])
  const minPrice = 150
  const maxPrice = 3500
  const textAreaMaxLength = userRole === 'student' ? '2000' : '1000'
  const [priceRangeValue, setPriceRangeValue] = useState([minPrice, maxPrice])
  const [faq, setFaq] = useState(data.FAQ)

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeValue(newValue)
  }
  const handleSelectedValue = useCallback(
    (func) => (event, selectedValue) => {
      func(selectedValue)
    },
    []
  )

  const handleSelectedLanguageValue = useCallback(
    () => (event, selectedValue) => {
      setSelectedLanguage(selectedValue)
    },
    []
  )
  const getSubjects = useCallback(
    (categoryId) => () => {
      return subjectService.getSubjectsNames(categoryId)
    },
    []
  )

  useEffect(() => {
    handleNonInputValueChange('category', selectedCategory)
    setSelectedSubject(null)
    /* eslint-disable-next-line */
  }, [selectedCategory])

  useEffect(() => {
    handleNonInputValueChange('subject', selectedSubject)
    /* eslint-disable-next-line */
  }, [selectedSubject])

  const categoryOptions = useMemo(
    () => ({
      label: t('offerPage.createOffer.labels.category'),
      required: true,
      error: Boolean(errors.category),
      helperText: t(errors.category)
    }),
    /* eslint-disable-next-line */
        [userRole, errors.category]
  )

  const subjectOptions = useMemo(
    () => ({
      label: t('offerPage.createOffer.labels.subject'),
      required: true,
      error: Boolean(errors.subject) && !!selectedCategory,
      helperText: selectedCategory ? t(errors.subject) : ''
    }),
    /* eslint-disable-next-line */
        [userRole, errors.subject, selectedCategory]
  )

  const languageOptions = useMemo(
    () => ({
      label: t('offerPage.createOffer.labels.language'),
      required: true,
      error: Boolean(errors.languages),
      helperText: t(errors.languages)
    }),
    /* eslint-disable-next-line */
        [userRole, errors.languages]
  )

  const getIdLanguageCategory = useCallback(async () => {
    const listCategories = await categoryService.getCategoriesNames()
    const languageCategory = listCategories.data.find(
      (category) => category.name === 'Languages'
    )
    return languageCategory ? languageCategory._id : errors
  }, [errors])

  const getLanguages = useCallback(async () => {
    const idLanguageCategory = await getIdLanguageCategory()
    return subjectService.getSubjectsNames(idLanguageCategory)
  }, [getIdLanguageCategory])

  useEffect(() => {
    if (selectedLanguage) {
      const updatedLanguages = [...selectedLanguages, selectedLanguage]
      setSelectedLanguages(updatedLanguages)
      setTimeout(() => setSelectedLanguage(null), 50)
    }
    /* eslint-disable-next-line */
  }, [selectedLanguage])

  useEffect(() => {
    handleNonInputValueChange(
      'languages',
      selectedLanguages.map((el) => el.name)
    )
    /* eslint-disable-next-line */
  }, [selectedLanguages])

  useEffect(() => {
    handleNonInputValueChange('FAQ', faq)
    /* eslint-disable-next-line */
  }, [faq])

  const handleDeleteLanguage = (itemName) => {
    const updatedLanguages = selectedLanguages.filter(
      (language) => language.name !== itemName
    )
    setSelectedLanguages(updatedLanguages)
  }

  const handleAddQuestion = () => {
    setFaq([...faq, { id: faq.length + 1, question: '', answer: '' }])
  }

  const handleDeleteQuestion = (id) => {
    setFaq(faq.filter((el) => el.id !== id))
  }

  return (
    <Box ref={modalRef}>
      <Typography component='p' sx={styles.title} variant='h5'>
        <Box alt='Leak add' component='img' src={TitleIcon} sx={styles.img} />
        {t(`offerPage.createOffer.title.main.${userRole}`)}
      </Typography>
      <Typography component='p' sx={styles.subtitle} variant='body1'>
        {t(`offerPage.createOffer.description.main.${userRole}`)}
      </Typography>
      <Typography component='p' sx={styles.stepTitle} variant='h6'>
        <Box
          alt='step one icon'
          component='img'
          src={StepOneIcon}
          sx={styles.img}
        />
        {t(`offerPage.createOffer.title.firstStep.${userRole}`)}
      </Typography>
      <Box sx={styles.stepWrapper}>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t(`offerPage.createOffer.description.category.${userRole}`)}
        </Typography>
        <AsyncAutocomplete
          fetchOnFocus
          getOptionLabel={getOptionLabel}
          onChange={handleSelectedValue(setSelectedCategory)}
          service={categoryService.getCategoriesNames}
          sx={styles.select}
          textFieldProps={categoryOptions}
          value={selectedCategory}
        />
        <AsyncAutocomplete
          disabled={selectedCategory ? false : true}
          fetchCondition={selectedCategory}
          fetchOnFocus
          getOptionLabel={getOptionLabel}
          onBlur={handleBlur('subject')}
          onChange={handleSelectedValue(setSelectedSubject)}
          service={getSubjects(selectedCategory?._id)}
          sx={styles.select}
          textFieldProps={subjectOptions}
          value={selectedSubject}
        />
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t(`offerPage.createOffer.description.level.${userRole}`)}
        </Typography>
        <Levels changeFunc={handleNonInputValueChange} />
      </Box>
      <Typography component='p' sx={styles.stepTitle} variant='h6'>
        <Box
          alt='step two icon'
          component='img'
          src={StepTwoIcon}
          sx={styles.img}
        />
        {t(`offerPage.createOffer.title.secondStep.${userRole}`)}
      </Typography>
      <Box sx={styles.stepWrapper}>
        {userRole === 'tutor' && (
          <>
            <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
              {t(`offerPage.createOffer.description.title.${userRole}`)}
            </Typography>
            <AppTextField
              error={Boolean(errors.title)}
              fullWidth
              helperText={t(errors.title)}
              inputProps={{ maxLength: Number(textAreaMaxLength) / 10 }}
              label={`${t(`offerPage.createOffer.labels.title`)}`}
              onBlur={handleBlur('title')}
              onChange={handleChange('title')}
              required
              rows={1}
              type='text'
              value={data.title}
            />
            <Typography sx={styles.summaryLength}>{`${data.title?.length}/${
              textAreaMaxLength / 10
            }`}</Typography>
          </>
        )}
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t(`offerPage.createOffer.description.describe.${userRole}`)}
        </Typography>
        <AppTextField
          error={Boolean(errors.description)}
          fullWidth
          helperText={t(errors.description)}
          inputProps={{ maxLength: Number(textAreaMaxLength) + 1 }}
          label={`${t(`offerPage.createOffer.labels.describe.${userRole}`)}`}
          multiline
          onBlur={handleBlur('description')}
          onChange={handleChange('description')}
          required
          rows={4}
          type='text'
          value={data.professionalSummary}
        />
        <Typography
          sx={styles.summaryLength}
        >{`${data.description?.length}/${textAreaMaxLength}`}</Typography>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t(`offerPage.createOffer.description.languages.${userRole}`)}
        </Typography>
        <AsyncAutocomplete
          fetchOnFocus
          getOptionLabel={getOptionLabel}
          onChange={handleSelectedLanguageValue()}
          service={getLanguages}
          sx={{ mb: '16px' }}
          textFieldProps={languageOptions}
          value={selectedLanguage}
        />
        <AppChipList
          defaultQuantity={3}
          handleChipDelete={handleDeleteLanguage}
          items={selectedLanguages.map((language) => language.name)}
          wrapperStyle={styles.chipsList}
        />
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t(`offerPage.createOffer.description.price.${userRole}`)}
        </Typography>
        {userRole === 'student' ? (
          <>
            <Box
              sx={{
                width: '270px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                component='p'
                sx={{ color: '#455A64', fontSize: '12px', mb: '-10px' }}
                variant='body1'
              >
                {minPrice}
              </Typography>
              <Typography
                component='p'
                sx={{ color: '#455A64', fontSize: '12px', mb: '-10px' }}
                variant='body1'
              >
                {maxPrice}
              </Typography>
            </Box>
            <Slider
              getAriaLabel={() => 'Price range'}
              max={maxPrice}
              min={minPrice}
              onChange={handlePriceRangeChange}
              sx={{ ...styles.sliderStyles, ml: '5px' }}
              value={priceRangeValue}
              valueLabelDisplay='auto'
            />
            <Stack
              alignItems='center'
              direction='row'
              justifyContent='flex-start'
              marginBottom='6px'
            >
              <AppTextField
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Box
                        alt='Hryvnia Icon'
                        component='img'
                        src={HryvniaIcon}
                      ></Box>
                    </InputAdornment>
                  ),
                  style: { fontSize: '14px', color: '#455A64' }
                }}
                helperText=''
                label='min'
                onChange={(e) => {
                  if (/(?!^\d+$)^.+$/.test(e.currentTarget.value)) {
                    return
                  }
                  setPriceRangeValue([
                    Number(e.target.value),
                    priceRangeValue[1]
                  ])
                }}
                sx={{ width: '118px' }}
                type='text'
                value={priceRangeValue[0]}
                variant='outlined'
              />
              <Typography
                sx={{ mx: '9px', fontSize: '30px', color: '#455A64' }}
              >
                -
              </Typography>
              <AppTextField
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Box
                        alt='Hryvnia Icon'
                        component='img'
                        src={HryvniaIcon}
                      ></Box>
                    </InputAdornment>
                  ),
                  style: { fontSize: '14px', color: '#455A64' }
                }}
                helperText=''
                label='max'
                onChange={(e) => {
                  if (/(?!^\d+$)^.+$/.test(e.currentTarget.value)) {
                    return
                  }
                  setPriceRangeValue([
                    priceRangeValue[0],
                    Number(e.target.value)
                  ])
                }}
                sx={{ width: '118px' }}
                type='text'
                value={priceRangeValue[1]}
                variant='outlined'
              />
            </Stack>
            <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
              0 tutors fit your needs
            </Typography>
          </>
        ) : (
          <AppTextField
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Box
                    alt='Hryvnia Icon'
                    component='img'
                    src={HryvniaIcon}
                  ></Box>
                </InputAdornment>
              ),
              style: { fontSize: '14px', color: '#455A64' }
            }}
            error={Boolean(errors.price)}
            helperText={t(errors.price)}
            label={t('offerPage.createOffer.labels.price')}
            onChange={(e) => {
              if (/(?!^\d+$)^.+$/.test(e.currentTarget.value)) {
                return
              }
              handleNonInputValueChange('price', e.currentTarget.value)
            }}
            required
            type='text'
            value={data.price}
            variant='outlined'
          />
        )}
      </Box>
      {userRole === 'tutor' && (
        <>
          <Typography component='p' sx={styles.stepTitle} variant='h6'>
            <Box
              alt='step three icon'
              component='img'
              src={StepThreeIcon}
              sx={styles.img}
            />
            {t(`offerPage.createOffer.title.thirdStep`)}
          </Typography>
          <Box sx={styles.stepWrapper}>
            <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
              {t(`offerPage.createOffer.description.thirdStep.${userRole}`)}
            </Typography>
            {data.FAQ.map((item, index) => (
              <Box key={item.id} sx={{ display: 'flex' }}>
                <Box>
                  <AppTextField
                    error={Boolean(errors.FAQ[index]?.question)}
                    fullWidth
                    helperText={
                      errors.FAQ[index]?.question
                        ? t(errors.FAQ[index].question)
                        : ''
                    }
                    onChange={(e) =>
                      setFaq(
                        [
                          ...faq.filter((el) => el.id !== item.id),
                          {
                            id: item.id,
                            question: e.currentTarget.value,
                            answer: item.answer
                          }
                        ].sort((a, b) => a.id - b.id)
                      )
                    }
                    placeholder={t('offerPage.createOffer.labels.question')}
                    sx={{ mb: '10px' }}
                    type='text'
                    value={item.question}
                  />
                  <AppTextField
                    error={Boolean(errors.FAQ[index]?.answer)}
                    fullWidth
                    helperText={
                      errors.FAQ[index]?.answer
                        ? t(errors.FAQ[index].answer)
                        : ''
                    }
                    inputProps={{
                      maxLength: Math.round(Number(textAreaMaxLength) / 2.5) + 1
                    }}
                    multiline
                    onChange={(e) =>
                      setFaq(
                        [
                          ...faq.filter((el) => el.id !== item.id),
                          {
                            id: item.id,
                            question: item.question,
                            answer: e.currentTarget.value
                          }
                        ].sort((a, b) => a.id - b.id)
                      )
                    }
                    placeholder={t('offerPage.createOffer.labels.answer')}
                    rows={4}
                    type='text'
                    value={item.answer}
                  />
                  <Typography
                    sx={{ ...styles.summaryLength, textAlign: 'left' }}
                  >{`${item.answer?.length}/${Math.round(
                    Number(textAreaMaxLength) / 2.5
                  )}`}</Typography>
                </Box>
                <Box sx={{ ml: '10px' }}>
                  <IconButton
                    onClick={() => handleDeleteQuestion(item.id)}
                    sx={styles.icon}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <AppButton
              onClick={handleAddQuestion}
              sx={{ ...styles.btn, width: 'fit-content' }}
              variant='outlined'
            >
              {t('button.addQuestion')}
            </AppButton>
          </Box>
        </>
      )}
      <Box sx={styles.btnsWrapper}>
        <AppButton
          onClick={(e) => {
            handleSubmit(e)
            setTimeout(() => {
              if (modalRef.current) {
                modalRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            }, 100)
          }}
          sx={styles.btn}
          variant='contained'
        >
          {userRole === 'tutor'
            ? t('button.createOffer')
            : t('button.createRequest')}
        </AppButton>
        <AppButton onClick={closeModal} sx={styles.btn} variant='outlined'>
          {t('button.addToDrafts')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CreateRequestOfferForm
