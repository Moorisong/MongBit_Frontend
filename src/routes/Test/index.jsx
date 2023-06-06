import { TestCard } from '../../components/TestCard'
import { CardButton } from '../../components/ButtonSets'
import NavigationBar from '../../components/NavigationBar'
import styles from './index.module.css'

export default function Test() {
  //right 플레이버튼 오른쪽, buttonsets css ksh
  return (
    <div className={styles.wrap}>
      <NavigationBar />
      <div>
        <TestCard thumbnailStr='나와 잘 맞는 MBTI' thumbnailClass='normal_thumbnail' titleBoxClass='normal_titleBox' />
        <CardButton btnType='playCnt' moveRightClass='right' />
      </div>
    </div>
  )
}
