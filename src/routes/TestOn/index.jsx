import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import { TYPE_MYPAGE } from '../../constants/constant';
import styles from './index.module.css';
import QuestionAndAnswer from '../../components/QestionAndAnswer';

export default function TestOn() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const memberId = sessionStorage.getItem('mongBitmemeberId');

  let [testData, setTestData] = useState({});
  let [qstStageIdx, setQstStageIdx] = useState(1);
  let [score, setScore] = useState([0, 0, 0, 0]);
  let [testDone, setTestDone] = useState(false);

  useEffect(() => {
    axios
      .get(`https://mongbit-willneiman.koyeb.app/api/v1/tests/test/${testId}`)
      .then((res) => {
        setTestData(res.data);
      });
  }, []);

  useEffect(() => {
    if (testDone) {
      axios
        .post(
          `https://mongbit-willneiman.koyeb.app/api/v1/member-test-result/${testId}/${memberId}`,
          score
        )
        .then((res) => {
          console.log('res--> ', res);
        });
    }
  }, [testDone]);

  function clickAnswer_plus() {
    if (qstStageIdx === 1 || qstStageIdx === 2 || qstStageIdx === 3) {
      let copy = [...score];
      copy[0] += 1;
      setScore(copy);
    }
    if (qstStageIdx === 4 || qstStageIdx === 5 || qstStageIdx === 6) {
      let copy = [...score];
      copy[1] += 1;
      setScore(copy);
    }

    if (qstStageIdx === 7 || qstStageIdx === 8 || qstStageIdx === 9) {
      let copy = [...score];
      copy[2] += 1;
      setScore(copy);
    }

    if (qstStageIdx === 10 || qstStageIdx === 11) {
      let copy = [...score];
      copy[3] += 1;
      setScore(copy);
    }

    if (qstStageIdx === 12) {
      // return navigate('/result');
      let copy = [...score];
      copy[3] += 1;
      setScore(copy);
      setTestDone(true);
    }
    setQstStageIdx(qstStageIdx + 1);
  }

  function clickAnswer_minus() {
    if (qstStageIdx === 1 || qstStageIdx === 2 || qstStageIdx === 3) {
      let copy = [...score];
      copy[0] -= 1;
      setScore(copy);
    }
    if (qstStageIdx === 4 || qstStageIdx === 5 || qstStageIdx === 6) {
      let copy = [...score];
      copy[1] -= 1;
      setScore(copy);
    }

    if (qstStageIdx === 7 || qstStageIdx === 8 || qstStageIdx === 9) {
      let copy = [...score];
      copy[2] -= 1;
      setScore(copy);
    }

    if (qstStageIdx === 10 || qstStageIdx === 11 || qstStageIdx === 12) {
      let copy = [...score];
      copy[3] -= 1;
      setScore(copy);
    }

    if (qstStageIdx === 12) {
      // return navigate('/result');
      let copy = [...score];
      copy[3] -= 1;
      setScore(copy);
      setTestDone(true);
    }

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
                clickAnswer_plus={clickAnswer_plus}
                clickAnswer_minus={clickAnswer_minus}
              />
            )
        )}
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer type={TYPE_MYPAGE} />
      </div>
    </div>
  );
}
