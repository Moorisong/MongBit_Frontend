import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import styles from './index.module.css'
import { TitleWithText } from "../../components/Titles";
import { TITLE_WITH_CONTENT, TYPE_MYPAGE } from "../../constants/constant";
import { Stroke } from "../../components/ButtonSets";
import { TestSetMyPage } from "../../components/TestSets";


export default function MyPage(props) {

  return (
    <div className={styles.wrap}>
      <NavigationBar />
      <TitleWithText type_1={TITLE_WITH_CONTENT} title='🦁 마이페이지' />

      <div className={styles.userInfoWrap}>
        <img src="/images/test/userSampleImg.svg" alt="user_img" className={styles.userImg} />
        <div className={styles.spanWrap}>
          <span><p>관악구여신</p></span>
          <span><p>2023.03.04 가입</p></span>
        </div>
      </div>
      <Stroke type_1={TYPE_MYPAGE} type_2='1' />
      <TitleWithText type_1={TITLE_WITH_CONTENT} type_2={TYPE_MYPAGE} title=' 🐭 최근 테스트 결과(10개)' />
      <TestSetMyPage title='물고기로 알아보는 레알 지옥 파티 인성...' content={{ description: '내게 3초만 줘. 다 잊어줄테니. 붕어!', date: '2023.06.28' }} type={TYPE_MYPAGE} />
      <Stroke type_1={TYPE_MYPAGE} type_2='2' />
      <TestSetMyPage title='아오 컴포넌트 열라 짜기 귀찮아 죽겠..' content={{ description: '내게 3초만 줘. 다 잊어줄테니. 붕어!', date: '2023.06.28' }} type={TYPE_MYPAGE} />
      <Stroke type_1={TYPE_MYPAGE} type_2='2' />
      <TestSetMyPage title='물고기로 알아보는 레알 지옥 파티 인성...' content={{ description: '내게 3초만 줘. 다 잊어줄테니. 붕어!', date: '2023.06.28' }} type={TYPE_MYPAGE} />
      <Stroke type_1={TYPE_MYPAGE} type_2='2' />
      <TestSetMyPage title='물고기로 알아보는 레알 지옥 파티 인성...' content={{ description: '내게 3초만 줘. 다 잊어줄테니. 붕어!', date: '2023.06.28' }} type={TYPE_MYPAGE} />
      <Stroke type_1={TYPE_MYPAGE} type_2='2' />
      <TestSetMyPage title='물고기로 알아보는 레알 지옥 파티 인성...' content={{ description: '내게 3초만 줘. 다 잊어줄테니. 붕어!', date: '2023.06.28' }} type={TYPE_MYPAGE} />
      <Stroke type_1={TYPE_MYPAGE} type_2='2' />
      <Footer type={TYPE_MYPAGE}/>
    </div>
  )
}
