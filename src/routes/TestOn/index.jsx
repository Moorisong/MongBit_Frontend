import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import { TYPE_MYPAGE } from '../../constants/constant';
import styles from './index.module.css';
import QuestionAndAnswer from '../../components/QestionAndAnswer';

export default function TestOn() {
  const { testId } = useParams();

  let [testData, setTestData] = useState({});
  let [qstStageIdx, setQstStageIdx] = useState(1);

  useEffect(() => {
    axios
      .get(`https://mongbit-willneiman.koyeb.app/api/v1/tests/test/${testId}`)
      .then((res) => {
        setTestData(res.data);
      });
  }, []);

  function clickAnswer() {
    if (qstStageIdx === 12) return;
    setQstStageIdx(qstStageIdx + 1);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>
      {testData.questions &&
        testData.questions.map(
          (q, i) =>
            qstStageIdx === q.index && (
              <QuestionAndAnswer
                key={i}
                q_idx={q.index}
                q_str={q.question}
                a_str_1={q.answerPlus}
                a_str_2={q.answerMinus}
                clickAnswer={clickAnswer}
              />
            )
        )}
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer type={TYPE_MYPAGE} />
      </div>
    </div>
  );
}
