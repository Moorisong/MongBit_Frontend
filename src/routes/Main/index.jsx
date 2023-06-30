import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { getHeaders } from '../../util/util';

export default function Main() {
  // Test 삭제
  // useEffect(()=>{
  //   const headers = getHeaders()
  //   axios.delete(`${DOMAIN_BE_PROD}/api/v1/tests/test/649e4baa11bc25457a51f534`, {headers})
  //   .then((res)=>{
  //     console.log('r--> ', res)
  //   })
  // }, [])

  const navigate = useNavigate();
  const [latestTestData, setLatestTestData] = useState({
    testArr: [],
  });

  useEffect(() => {
    sessionStorage.getItem('mbResult') === '' &&
      sessionStorage.removeItem('mbResult');
    sessionStorage.getItem('mbTest') === '' &&
      sessionStorage.removeItem('mbTest');

    const headers = getHeaders();
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/tests/0/3`, { headers })
      .then((res) => {
        setLatestTestData((prev) => ({ ...prev, testArr: res.data }));
      })
      .catch((err) => {
        alert(err.response.data);
        navigate('/login');
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
