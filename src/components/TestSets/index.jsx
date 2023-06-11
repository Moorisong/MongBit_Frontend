import { CardButton, Stroke } from '../ButtonSets'
import { TestCard } from '../TestCard'
import { TYPE_MYPAGE } from '../../constants/constant';
import styles from './index.module.css'

function TestSetComplete(props) {
  const thumbnailStr = '우리집 묘르신 모색으로 알아보는 성격 파탄 테스트';
  const cn_1 = props.type === 'inTestList' ? `${styles.move_testList}` : null

  return (
    <div className={cn_1}>
      <TestCard thumbnailStr={thumbnailStr} />
      <div className={styles.buttonWrap}>
        <CardButton btnType='playCnt' />
        <CardButton btnType='likeCnt' />
        <CardButton btnType='commentCnt' />
        <Stroke type={props.type} />
      </div>
    </div>
  )
}

function TestSetMyPage(props) {

  return (
    <div className={styles.testCardWrap}>
      <TestCard type={props.type} />
      <div className={styles.testCardTextWrap}>
        <p>{props.title}</p>
        <p>{props.content.description}</p>
        <p>{props.content.date}</p>
      </div>
    </div>
  )
}


export { TestSetComplete, TestSetMyPage }
