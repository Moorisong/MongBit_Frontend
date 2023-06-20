import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import styles from './index.module.css';
import { TitleWithText } from '../../components/Titles';
import {
  TITLE_WITH_CONTENT,
  TYPE_MYPAGE,
  USER_INFO,
} from '../../constants/constant';
import { Stroke } from '../../components/ButtonSets';
import { TestSetMyPage } from '../../components/TestSets';
import { decodeToken } from '../../util/util';

export default function MyPage() {
  const navigate = useNavigate();
  const dateParts = localStorage
    .getItem(USER_INFO + 'registDate')
    .split('T')[0]
    .split('-');
  const registerDate = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;

  useEffect(() => {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', true);
      return navigate('/login');
    }
  }, []);
  return (
    <div className={styles.wrap}>
      <NavigationBar />
      <TitleWithText type_1={TITLE_WITH_CONTENT} title="🦁 마이페이지" />

      <div className={styles.userInfoWrap}>
        <img
          src={localStorage.getItem(USER_INFO + 'thumbnail')}
          alt="user_img"
          className={styles.userImg}
        />
        <div className={styles.spanWrap}>
          <p>{localStorage.getItem(USER_INFO + 'username')}</p>
          <p>{registerDate} 가입</p>
        </div>
      </div>
      <Stroke type_1={TYPE_MYPAGE} type_2="1" />
      <TitleWithText
        type_1={TITLE_WITH_CONTENT}
        type_2={TYPE_MYPAGE}
        title=" 🐭 최근 테스트 결과(10개)"
      />
      <TestSetMyPage
        title="물고기로 알아보는 레알 지옥 파티 인성..."
        content={{
          description: '내게 3초만 줘. 다 잊어줄테니. 붕어!',
          date: '2023.06.28',
        }}
        type={TYPE_MYPAGE}
      />
      <Stroke type_1={TYPE_MYPAGE} type_2="2" />
      <TestSetMyPage
        title="아오 컴포넌트 열라 짜기 귀찮아 죽겠.."
        content={{
          description: '내게 3초만 줘. 다 잊어줄테니. 붕어!',
          date: '2023.06.28',
        }}
        type={TYPE_MYPAGE}
      />
      <Stroke type_1={TYPE_MYPAGE} type_2="2" />
      <TestSetMyPage
        title="물고기로 알아보는 레알 지옥 파티 인성..."
        content={{
          description: '내게 3초만 줘. 다 잊어줄테니. 붕어!',
          date: '2023.06.28',
        }}
        type={TYPE_MYPAGE}
      />
      <Stroke type_1={TYPE_MYPAGE} type_2="2" />
      <TestSetMyPage
        title="물고기로 알아보는 레알 지옥 파티 인성..."
        content={{
          description: '내게 3초만 줘. 다 잊어줄테니. 붕어!',
          date: '2023.06.28',
        }}
        type={TYPE_MYPAGE}
      />
      <Stroke type_1={TYPE_MYPAGE} type_2="2" />
      <TestSetMyPage
        title="물고기로 알아보는 레알 지옥 파티 인성..."
        content={{
          description: '내게 3초만 줘. 다 잊어줄테니. 붕어!',
          date: '2023.06.28',
        }}
        type={TYPE_MYPAGE}
      />

      <div className={styles.seeMoreWrap}>
        <button>더보기</button>
        <img src="/images/test/seeMoreIcon.svg" alt="see_more" />
      </div>
      <Footer type={TYPE_MYPAGE} />
    </div>
  );
}
