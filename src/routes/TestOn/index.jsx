import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import { TYPE_MYPAGE } from '../../constants/constant';
// import { decodeToken } from '../../util/util';
import styles from './index.module.css';
import QuestionAndAnswer from '../../components/QestionAndAnswer';

export default function TestOn() {
  // const navigate = useNavigate();
  let [testData, setTestData] = useState({
    q_idx: 0,
    q_str: '당신은 알에서 막 깨어난 응애 물고기! 뭐부터 할까?',
    a_str_1: '"이건 뭐지? 저건 뭐지? 넘모 신기행!" 눈에 보이는 대로 일단 탐험',
    a_str_2: '"여긴 어디? 나는 누구? 안전한가?”상황파악부터',
  });

  // useEffect(() => {
  //   if (!decodeToken().state) {
  //     sessionStorage.setItem('ngb', true);
  //     navigate('/login');
  //   }
  // }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>
      <QuestionAndAnswer
        q_idx={testData.q_idx}
        q_str={testData.q_str}
        a_str_1={testData.a_str_1}
        a_str_2={testData.a_str_2}
      />
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer type={TYPE_MYPAGE} />
      </div>
    </div>
  );
}
