import { useRecoilValue } from 'recoil';

import styles from './index.module.css';
import { TitleWithText } from '../../components/Titles';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { TestCard } from '../../components/TestCard';
import { GoRandomStartBtn } from '../../components/ButtonSets';
import { logInInfo } from '../../atom';
import { TITLE_WITH_CONTENT, TYPE_LATEST_MAIN } from '../../constants/constant';

export default function Main() {
  return (
    <div className={styles.containerWrap}>
      <NavigationBar />
      <TitleWithText
        title="👀 랜덤 심리테스트"
        content="고민할 틈은 안줄테니 일단 플레이하고 생각하기"
        type_1={TITLE_WITH_CONTENT}
      />

      <GoRandomStartBtn url="/test-random" str="아무거나 시작" />
      <div className={styles.testWrap}>
        <TitleWithText title="🌟 심테의 근본, MBTI 검사" />
        <TestCard thumbnailStr="전생에서 내가 공룡이었다면?" />

        <div className={styles.miniTestWrap}>
          <TitleWithText title="💙 최신 심테" />
          <div className={styles.latesCardWrap}>
            <TestCard thumbnailStr="전생 테스트" type={TYPE_LATEST_MAIN} />
            <TestCard thumbnailStr="이세계에서.." type={TYPE_LATEST_MAIN} />
            <TestCard thumbnailStr="장난 유형으.." type={TYPE_LATEST_MAIN} />
          </div>
        </div>

        <div className={styles.miniTestWrap}>
          <TitleWithText title="💚 기타 등등" />
          <div className={styles.latesCardWrap}>
            <TestCard thumbnailStr="살다보면.." type={TYPE_LATEST_MAIN} />
            <TestCard thumbnailStr="낙서 유형.." type={TYPE_LATEST_MAIN} />
            <TestCard thumbnailStr="기억 속에서.." type={TYPE_LATEST_MAIN} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
