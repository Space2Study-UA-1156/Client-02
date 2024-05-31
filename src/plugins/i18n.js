import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '~/constants/translations'
import languages from '~/constants/translations/languages'

const languageKeys = Object.keys(languages)

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['translations']
})

i18n.languages = languageKeys

export default i18n
