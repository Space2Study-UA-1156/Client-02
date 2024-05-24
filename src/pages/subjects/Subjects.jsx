import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SubjectsSearch from '~/components/subjects-search-section/SubjectsSearch'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { capitalize } from '~/components/subjects-search-section/SubjectsSearch'
import { authRoutes } from '~/router/constants/authRoutes'
import { useNavigate } from 'react-router-dom'

const Subjects = () => {
  const [inputValue, setInputValue] = useState('')
  const [inputSubjectValue, setInputSubjectValue] = useState('')
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  const query = useQuery()
  const categoryName = query.get('categoryName') || ''
  const categoryId = query.get('id')
  const navigateTo = useNavigate()

  // Initial values
  useEffect(() => {
    setInputValue(capitalize(categoryName))
    setSelectedCategory(categoryId)
  }, [categoryName, categoryId])

  const handleInputChange = (e, newValue) => {
    setInputValue(newValue)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category?._id || null)
    setInputValue(category?.name || '')

    if (!category) return

    // Replace params in URL
    const link = `${
      authRoutes.subjects.path
    }?categoryName=${category.name.toLowerCase()}&id=${category._id}`
    navigateTo(link, { replace: true })
  }

  function handleSubjectChange(subject) {
    setSelectedSubject(subject?._id || null)
    setInputSubjectValue(subject?.name || '')
  }

  return (
    <PageWrapper>
      <SubjectsSearch
        categoryId={categoryId}
        categoryName={categoryName}
        handleCategoryChange={handleCategoryChange}
        handleInputChange={handleInputChange}
        handleSubjectChange={handleSubjectChange}
        inputSubjectValue={inputSubjectValue}
        inputValue={inputValue}
        selectedCategory={selectedCategory}
        selectedSubject={selectedSubject}
        setInputSubjectValue={setInputSubjectValue}
        setInputValue={setInputValue}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubject={setSelectedSubject}
      />
    </PageWrapper>
  )
}

export default Subjects
