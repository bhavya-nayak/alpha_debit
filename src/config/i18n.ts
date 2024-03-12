import i18n from 'i18n'
import path from 'path'

i18n.configure({
  locales: ['en'],
  defaultLocale: 'en',
  directory: path.join(__dirname, '/../resources/', 'locales'),
  objectNotation: true,
})

export default i18n
