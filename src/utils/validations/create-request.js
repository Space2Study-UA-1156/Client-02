export const category = (value) => {
  if (!value) {
    return 'offerPage.createOffer.errorMessages.category'
  }
}

export const subject = (value) => {
  if (!value) {
    return 'offerPage.createOffer.errorMessages.subject'
  }
}

export const title = (value) => {
  if (!value) {
    return 'offerPage.createOffer.errorMessages.title'
  }
}

export const description = (value) => {
  if (!value) {
    return 'offerPage.createOffer.errorMessages.description'
  }
}

export const languages = (value) => {
  if (!value.length) {
    return 'offerPage.createOffer.errorMessages.languages'
  }
}

export const price = (value) => {
  if (!value) {
    return 'offerPage.createOffer.errorMessages.price'
  }
}

export const FAQ = (value) => {
  const errors = []
  value.map((el, index) => {
    if (!el.question.length) {
      errors.push({ question: 'common.errorMessages.emptyField' })
    }
    if (!el.answer.length) {
      errors[index]
        ? (errors[index].answer = 'common.errorMessages.emptyField')
        : errors.push({ answer: 'common.errorMessages.emptyField' })
    }
    if (!errors[index]) errors[index] = ''
  })
  if (errors.filter((el) => el !== '').length) return errors
}
