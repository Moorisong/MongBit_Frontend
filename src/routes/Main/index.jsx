import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './index.module.css';
import { TitleWithText } from '../../components/Titles';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { TestCard } from '../../components/TestCard';
import { GoRandomStartBtn } from '../../components/ButtonSets';
import {
  TITLE_WITH_CONTENT,
  TYPE_LATEST_MAIN,
  DOMAIN_BE_PROD,
  DOMAIN_BE_DEV,
} from '../../constants/constant';

export default function Main() {
  // Test 삭제
  // useEffect(()=>{
  //   axios.delete(`${DOMAIN_BE_DEV}/api/v1/tests/test/649b8a80a5c2e650640a1a40`)
  //   .then((res)=>{
  //     console.log('r--> ', res)
  //   })
  // }, [])

  const [latestTestData, setLatestTestData] = useState({
    testArr: [],
  });

  useEffect(() => {
    sessionStorage.getItem('mbResult') === '' &&
      sessionStorage.removeItem('mbResult');
    sessionStorage.getItem('mbTest') === '' &&
      sessionStorage.removeItem('mbTest');

    axios.get(`${DOMAIN_BE_DEV}/api/v1/tests/0/3`).then((res) => {
      setLatestTestData((prev) => ({ ...prev, testArr: res.data }));
    });
  }, []);
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
        <TestCard
          thumbnailStr="겁나 빠르게 끝내는 퀵 MBTI"
          testId="649a7bccaa04db61384808c5"
          thumbnailUri="https://i.ibb.co/pwj20tf/cover.png"
        />

        <div className={styles.miniTestWrap}>
          <TitleWithText title="💙 최신 심테" />
          <div className={styles.latesCardWrap}>
            {latestTestData.testArr.length > 0 &&
              latestTestData.testArr.map((t, i) => (
                <TestCard
                  key={i}
                  thumbnailStr={t.title}
                  type={TYPE_LATEST_MAIN}
                  testId={t.id}
                  thumbnailUri={t.imageUrl}
                  playCnt={t.playCount}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
