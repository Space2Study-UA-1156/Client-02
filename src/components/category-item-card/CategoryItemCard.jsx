import { useTranslation } from 'react-i18next'
import AppCard from '~/components/app-card/AppCard'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/components/category-item-card/CategoryItemCard.styles'

const CategoryItemCard = ({ bg, category, id, image = 'test', offers }) => {
  const { t } = useTranslation()

  const subjectPath = `${authRoutes.subjects.path}/${id}`
  const description = `${offers} ${t('categoriesPage.offers')}`
  const urlImg = `/src/assets/img/categories/${image}`
  const bgWithOpacity = `${bg}33`

  const style = {
    ...styles.content,
    img: { ...styles.content.img, background: bgWithOpacity }
  }

  return (
    <AppCard link sx={styles.wrapper} to={subjectPath}>
      <ImgTitleDescription
        altText={category}
        description={description}
        img={urlImg}
        style={style}
        title={category}
      />
    </AppCard>
  )
}

export default CategoryItemCard
