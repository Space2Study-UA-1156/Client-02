import { useState, useCallback } from 'react'
import { getEmptyValues } from '~/utils/helper-functions'
import { isEqual } from '~/utils/isEqual'

export const useForm = ({
  initialValues,
  initialErrors = getEmptyValues(initialValues, ''),
  validations,
  onSubmit
}) => {
  const [data, setData] = useState(initialValues)
  const [isDirty, setDirty] = useState(false)
  const [errors, setErrors] = useState(initialErrors)
  const [isTouched, setTouched] = useState(getEmptyValues(initialValues, false))

  const validateValue = useCallback(
    (key, value) => {
      if (validations && validations[key]) {
        return validations[key]?.(value, data)
      }
    },
    [data, validations]
  )

  const checkForError = useCallback(
    (key, value) => {
      if (isTouched[key] || errors[key]) {
        const valid = validateValue(key, value)

        setErrors((prev) => ({
          ...prev,
          [key]: valid ?? ''
        }))
      }
    },
    [errors, isTouched, validateValue]
  )

  const handleInputChange = useCallback(
    (key) => (event) => {
      const value =
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      setData((prev) => ({
        ...prev,
        [key]: value
      }))
      checkForError(key, event.target.value)
    },
    [checkForError]
  )

  const handleSelectChange = useCallback(
    (key) => (event, selectedValue) => {
      setData((prev) => ({
        ...prev,
        [key]: selectedValue
      }))
      checkForError(key, event.target.value)
    },
    [checkForError]
  )

  const handleNonInputValueChange = useCallback(
    (key, value) => {
      setData((prev) => {
        const newData = {
          ...prev,
          [key]: value
        }
        setDirty(!isEqual(newData, initialValues))
        return newData
      })
      checkForError(key, value)
    },
    [checkForError, initialValues]
  )

  const handleErrors = useCallback((key, error) => {
    setErrors((prev) => ({
      ...prev,
      [key]: error
    }))
  }, [])

  const handleBlur = useCallback(
    (key, updateValue = false) =>
      (event) => {
        setDirty(!isEqual(data, initialValues))

        const valid = validateValue(key, event.target.value)

        setErrors((prev) => ({
          ...prev,
          [key]: valid ?? ''
        }))
        setTouched((prev) => ({
          ...prev,
          [key]: true
        }))

        if (updateValue) {
          setData((prev) => ({
            ...prev,
            [key]: event.target.value
          }))
        }
      },
    [data, initialValues, validateValue]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    let isValid = true
    const newErrors = { ...errors }

    if (validations) {
      for (const key in validations) {
        const value = data[key]
        const validation = validateValue(key, value)
        if (validation) {
          isValid = false
          newErrors[key] = validation
        }
      }
    }

    isValid ? void onSubmit() : setErrors(newErrors)
  }

  const markAsValidated = (key) => {
    setTouched(true)
    const valid = validateValue(key, data[key])
    setErrors((prev) => ({
      ...prev,
      [key]: valid ?? ''
    }))
  }

  return {
    data,
    isDirty,
    errors,
    handleInputChange,
    handleSelectChange,
    handleNonInputValueChange,
    handleBlur,
    handleErrors,
    handleSubmit,
    markAsValidated
  }
}

export default useForm
