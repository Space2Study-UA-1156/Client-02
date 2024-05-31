import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SubjectsSearch from '~/components/subjects-search-section/SubjectsSearch'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { capitalize } from '~/components/subjects-search-section/SubjectsSearch'
import { authRoutes } from '~/router/constants/authRoutes'
import { useNavigate } from 'react-router-dom'
import { styles } from '~/components/subjects-search-section/SubjectsSearch.styles.js'
import { Box, CircularProgress } from '@mui/material'
import SubjectsItemCard from '~/components/subjects-item-card/SubjectsItemCard'
import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import AppButton from '~/components/app-button/AppButton'
import { useTranslation } from 'react-i18next'
import NoResultsContent from '~/components/no-results-content/NoResultsContent'
import RequestNewCategoryForm from '~/containers/student-home-page/request-new-category/request-new-category-form/RequestNewCategoryForm.jsx'
import { useModalContext } from '~/context/modal-context'
import RequestNewCategoryDialog from '~/containers/student-home-page/request-new-category/request-new-category-dialog/RequestNewCategoryDialog'

const Subjects = () => {
  const [inputValue, setInputValue] = useState('')
  const [inputSubjectValue, setInputSubjectValue] = useState('')
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [subjectsData, setSubjectsData] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [showMore, setShowMore] = useState(6)
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false)
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  const query = useQuery()
  const categoryName = query.get('category-name') || ''
  const categoryId = query.get('id')
  const navigateTo = useNavigate()

  const { t } = useTranslation()

  const { openModal } = useModalContext()

  const addSubjects = 6

  const { categories, subjects, findOffers } = authRoutes

  const handleInputChange = (e, newValue) => {
    setInputValue(newValue)
  }

  const handleShowMore = () => {
    setShowMore((prev) => prev + addSubjects)
  }
  const openCreateNewUserRequestDialog = () => {
    openModal({ component: <RequestNewCategoryDialog /> })
  }

  const searchedSubjects = useMemo(() => {
    if (!selectedSubject) return subjectsData

    return subjectsData.filter((subject) => subject._id === selectedSubject)
  }, [subjectsData, selectedSubject])

  const filteredSubjects = useMemo(() => {
    return subjectsData.filter((subject) =>
      subject.name
        .toLowerCase()
        .includes(inputSubjectValue.toLowerCase().trim())
    )
  }, [subjectsData, inputSubjectValue])

  const getSubjectIcon = useCallback(
    (categoryId) => {
      const found = categoriesData.find((item) => item._id === categoryId)

      if (!found)
        return {
          icon: 'languages.svg',
          bg: '#7BB362'
        }

      return {
        icon: found.appearance.icon_path,
        bg: found.appearance.color
      }
    },
    [categoriesData]
  )

  // Initial values
  useEffect(() => {
    setInputValue(capitalize(categoryName))
    setSelectedCategory(categoryId)
  }, [categoryName, categoryId])

  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoadingSubjects(true)
      try {
        const response = await subjectService.getSubjects({}, categoryId)
        setSubjectsData(
          [...response.data.items].sort(
            (a, b) =>
              a.category.localeCompare(b.category) ||
              a.name.localeCompare(b.name)
          )
        )
      } catch (error) {
        console.error('Error fetching subjects:', error)
      } finally {
        setIsLoadingSubjects(false)
      }
    }

    fetchSubjects()
  }, [categoryId])

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true)

      try {
        const responseCategories = await categoryService.getCategories()
        setCategoriesData(responseCategories.data.items)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category?._id || null)
    setInputValue(category?.name || '')

    if (!category) {
      const link = `${authRoutes.subjects.path}`
      navigateTo(link, { replace: true })
      return
    }

    const link = `${
      authRoutes.subjects.path
    }?category-name=${category.name.toLowerCase()}&id=${category._id}`
    navigateTo(link, { replace: true })
  }

  function handleSubjectChange(subject) {
    setSelectedSubject(subject?._id || null)
    setInputSubjectValue(subject?.name || '')
  }

  return (
    <PageWrapper>
      <SubjectsSearch
        categoriesPath={categories.path}
        categoryId={categoryId}
        categoryName={categoryName}
        findOffers={findOffers}
        handleCategoryChange={handleCategoryChange}
        handleInputChange={handleInputChange}
        handleSubjectChange={handleSubjectChange}
        inputSubjectValue={inputSubjectValue}
        inputValue={inputValue}
        openCreateNewUserRequestDialog={openCreateNewUserRequestDialog}
        selectedCategory={selectedCategory}
        selectedSubject={selectedSubject}
        setInputSubjectValue={setInputSubjectValue}
        setInputValue={setInputValue}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubject={setSelectedSubject}
        subjectsPath={subjects.path}
      />

      {isLoadingSubjects || isLoadingCategories ? (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredSubjects.length > 0 ? (
            <Box sx={styles.gridBox}>
              {filteredSubjects
                .filter((_, i) => i < showMore)
                .map((subject, index) => {
                  const { icon, bg } = getSubjectIcon(subject.category)
                  return (
                    <SubjectsItemCard
                      bg={bg}
                      id={subject._id}
                      image={icon}
                      key={`${subject.id}-${index}`}
                      offers={subject?.totalOffers.student}
                      subject={subject}
                    />
                  )
                })}
            </Box>
          ) : (
            <NoResultsContent
              actionModal={RequestNewCategoryForm}
              contentName={t('categoriesPage.category')}
            />
          )}
        </>
      )}
      {showMore < searchedSubjects.length && (
        <AppButton onClick={handleShowMore} sx={styles.viewMoreButton}>
          {t('subjectsPage.subjects.viewMore')}
        </AppButton>
      )}
    </PageWrapper>
  )
}

export default Subjects
