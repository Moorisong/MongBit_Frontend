import { TestCard } from '../../components/TestCard'
import { CardButton, Stroke, GoRandomStartBtn, TestButton, AddCommentButton, Comment } from '../../components/ButtonSets'
import { TYPE_ON_TEST } from '../../constants/constant'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import styles from './index.module.css'

export default function Test() {
  //right 플레이버튼 오른쪽, buttonsets css ksh
  return (
    <div className={styles.wrap}>

      {/* 네비게이션 바 */}
      <NavigationBar />

      {/* 테스트  */}
      <div>
        <TestCard thumbnailStr='나와 잘 맞는 MBTI' thumbnailClass='normal_thumbnail' titleBoxClass='normal_titleBox' />
        <CardButton btnType='playCnt' moveClass='button_onTest_right' />
        <Stroke moveClass='stroke_onTest_top' />
        <p className={styles.contentTextWrap}>
          대충 심리테스트에 대한 설명을 적는 공간 <br />
          대충 심리테스트에 대한 설명을 적는 공간<br />
          <br />
          대충 심리테스트에 대한 설명을 적는 공간<br />
          대충 심리테스트에 대한 설간대충 심리테스트에 대한 설명을 적는 공간<br />
          대충 심리테스트에심리테스트에 대한 설명을 적는 공간
        </p>
        <GoRandomStartBtn url='ksh' str='테스트 시작' />
        <div className={styles.buttonSet}>
          <TestButton btnType='bookMark' str='북마크' />
          <TestButton btnType='like' str='재밌당' />
          <TestButton btnType='share' str='공유하기' />
        </div>
        <div className={styles.likeCntNumWrap}>
          <p className={styles.likeCntNum}>326</p>
        </div>
        <Stroke moveClass='stroke_onTest_bottom' />
      </div>

      {/* 댓글 */}
      <CardButton btnType='comment' moveClass='comment_onTest' />
      <input type="text" className={styles.commentInput} placeholder='나쁜말 하면 신고합니다 ㅇㅅㅇ' />
      <AddCommentButton />
      <div className={styles.commentWrap}>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <Footer type={TYPE_ON_TEST} />
    </div>
  )
}
