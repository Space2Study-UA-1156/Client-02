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
