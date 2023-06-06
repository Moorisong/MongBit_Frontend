import { TestCard } from '../../components/TestCard'
import { CardButton, Stroke } from '../../components/ButtonSets'
import NavigationBar from '../../components/NavigationBar'
import styles from './index.module.css'

export default function Test() {
  //right 플레이버튼 오른쪽, buttonsets css ksh
  return (
    <div className={styles.wrap}>
      <NavigationBar />
      <div>
        <TestCard thumbnailStr='나와 잘 맞는 MBTI' thumbnailClass='normal_thumbnail' titleBoxClass='normal_titleBox' />
        <CardButton btnType='playCnt' moveClass='right' />
        <Stroke moveClass='top' />
        <p>
          대충 심리테스트에 대한 설명을 적는 공간 <br />
          대충 심리테스트에 대한 설명을 적는 공간<br />
          <br />
          대충 심리테스트에 대한 설명을 적는 공간<br />
          대충 심리테스트에 대한 설간대충 심리테스트에 대한 설명을 적는 공간<br />
          대충 심리테스트에심리테스트에 대한 설명을 적는 공간
        </p>
      </div>
    </div>
  )
}
