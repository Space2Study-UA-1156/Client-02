import { useTranslation } from 'react-i18next'
import AppCard from '~/components/app-card/AppCard'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import { styles } from '~/components/subjects-item-card/SubjectsItemCard.styles'

const SubjectsItemCard = ({ bg, subject, image = 'test', offers }) => {
  const { t } = useTranslation()

  const subjectName = subject.name
  const description = `${offers} ${t('categoriesPage.offers')}`
  const urlImg = `/src/assets/img/categories/${image}`
  const bgWithOpacity = `${bg}33`

  const style = {
    ...styles.content,
    img: { ...styles.content.img, background: bgWithOpacity }
  }

  return (
    <AppCard sx={styles.wrapper}>
      <ImgTitleDescription
        altText={subjectName}
        description={description}
        img={urlImg}
        style={style}
        title={subjectName}
      />
    </AppCard>
  )
}

export default SubjectsItemCard
