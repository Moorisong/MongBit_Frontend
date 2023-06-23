import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import lottie from 'lottie-web';

import animationData from './loading_2.json';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import styles from './index.module.css';
import { TestSetMyPage } from '../../components/TestSets';
import { TitleWithText } from '../../components/Titles';
import {
  TITLE_WITH_CONTENT,
  TYPE_MYPAGE,
  USER_INFO,
} from '../../constants/constant';
import { Stroke } from '../../components/ButtonSets';
import { decodeToken } from '../../util/util';

export default function MyPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [testData, setTestData] = useState({
    resultArr: [],
    hasNextPage: false,
  });
  const [loading, setLoading] = useState(true);

  if (!sessionStorage.getItem(USER_INFO + 'registDate')) navigate('/login');
  const dateParts = sessionStorage
    .getItem(USER_INFO + 'registDate')
    .split('T')[0]
    .split('-');
  const registerDate = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      animationData: animationData,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  useEffect(() => {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', true);
      return navigate('/login');
    }
    const memberId = sessionStorage.getItem('mongBitmemeberId');
    const params = {
      page: 0,
      size: 10,
    };
    axios
      .get(
        `https://mongbit-willneiman.koyeb.app/api/v1/member-test-result/${memberId}`,
        { params }
      )
      .then((res) => {
        setTestData((prev) => ({
          ...prev,
          resultArr: res.data.memberTestResultDTOList,
          hasNextPage: res.data.hasNextPage,
        }));
        setLoading(false);
      });
  }, []);
  return (
    <div className={styles.wrap}>
      <NavigationBar />
      <TitleWithText type_1={TITLE_WITH_CONTENT} title="🦁 마이페이지" />

      <div className={styles.userInfoWrap}>
        <img
          src={sessionStorage.getItem(USER_INFO + 'thumbnail')}
          alt="user_img"
          className={styles.userImg}
        />
        <div className={styles.spanWrap}>
          <p>{sessionStorage.getItem(USER_INFO + 'username')}</p>
          <p>{registerDate} 가입</p>
        </div>
      </div>
      <Stroke type_1={TYPE_MYPAGE} type_2="1" />
      <TitleWithText
        type_1={TITLE_WITH_CONTENT}
        type_2={TYPE_MYPAGE}
        title=" 🐭 최근 테스트 결과(10개)"
      />
      {loading && (
        <div>
          <div ref={containerRef} className={styles.loadImg}></div>
        </div>
      )}
      {loading ||
        testData.resultArr.map((t, i) => (
          <TestSetMyPage
            key={i}
            title={t.title}
            testId={t.testId}
            testResultId={t.testResultId}
            content={{
              description: t.content,
              date: t.testData,
            }}
            type={TYPE_MYPAGE}
            imgUri={t.imageUrl}
            hasNextPage={testData.hasNextPage}
          />
        ))}

      <div className={styles.seeMoreWrap}>
        <button>더보기</button>
        <img src="/images/test/seeMoreIcon.svg" alt="see_more" />
      </div>
      <Footer type={TYPE_MYPAGE} />
    </div>
  );
}
