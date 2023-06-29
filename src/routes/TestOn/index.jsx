import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cx from 'classnames';

import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import {
  DOMAIN_BE_PROD,
  TYPE_MYPAGE,
  DOMAIN_BE_DEV,
} from '../../constants/constant';
import styles from './index.module.css';
import QuestionAndAnswer from '../../components/QestionAndAnswer';
import { getHeaders } from '../../util/util';

export default function TestOn() {
  const navigate = useNavigate();
  const { testId } = useParams();

  let [testData, setTestData] = useState({});
  let [qstStageIdx, setQstStageIdx] = useState(1);
  let [score, setScore] = useState([0, 0, 0, 0]);
  let [testDone, setTestDone] = useState({
    state: false,
    lastClick: false,
  });

  const barClassName = styles[`gaugeBar_${qstStageIdx}`];

  useEffect(() => {
    const headers = getHeaders();
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/tests/test/${testId}`, { headers })
      .then((res) => {
        setTestData(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
        navigate('/login');
      });
  }, []);

  useEffect(() => {
    let timer;
    if (testDone.lastClick) {
      timer = setTimeout(() => {
        setTestDone((prev) => ({ ...prev, state: true }));
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [testDone.lastClick]);

  useEffect(() => {
    if (testDone.state) {
      sessionStorage.setItem('mbScore', JSON.stringify(score));
      return navigate(`/result/${testId}`);
    }
  }, [testDone.state]);

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
      setTestDone((prev) => ({ ...prev, lastClick: true }));
      let copy = [...score];
      copy[3] += 1;
      setScore(copy);
    }
    if (qstStageIdx !== 12) setQstStageIdx(qstStageIdx + 1);
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
      setTestDone((prev) => ({ ...prev, lastClick: true }));
      let copy = [...score];
      copy[3] -= 1;
      setScore(copy);
    }
    if (qstStageIdx !== 12) setQstStageIdx(qstStageIdx + 1);
  }

  return (
    <div
      className={cx(styles.wrap, {
        [styles.noClick]: testDone.lastClick,
      })}
    >
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>

      <div className={styles.progressContentWrap}>
        <div className={styles.progressWrap}>
          <div className={styles.barWrap}>
            <div></div>
            <div
              className={cx(barClassName, {
                [styles.gaugeBar_13]: testDone.lastClick,
              })}
            ></div>
          </div>
          <span>{`질문 ${qstStageIdx} /`}</span>
          <span>12</span>
        </div>
      </div>

      {testData.questions &&
        testData.questions.map(
          (q, i) =>
            qstStageIdx === q.index + 1 && (
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
