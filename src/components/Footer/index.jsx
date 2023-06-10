import styles from './index.module.css'
import { TYPE_ON_TEST } from '../../constants/constant'

export default function Footer(props) {
  const cn = props.type === TYPE_ON_TEST ? `${styles.wrap} ${styles.moveBottom}` : `${styles.wrap}`
  return (
    <div className={cn}>
      <div className={styles.upper}>
        <p>몽뭉이 크루 &nbsp; | &nbsp; 공동 대표 : 김송현, 임건재, 김정은, 안혜지 &nbsp; | &nbsp; 사업자 없음</p>
        <p>서울 관악구 신림역 인근 카페 3층 스터디존에서 만듦</p>
        <p>채용문의 &nbsp; | &nbsp; 채용되고 싶다.</p>
      </div>
      <div className={styles.under}>
        <img src="/images/footer/gitHub.svg" alt="gitHub_image" />
        <p>© 2023 MongMoongCrew. All rights reserved </p>
      </div>
    </div>
  )
}
