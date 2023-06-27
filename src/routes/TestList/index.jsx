import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cx from 'classnames';

import { TitleWithText } from '../../components/Titles';
import { TestSetComplete } from '../../components/TestSets';
import NavigationBar from '../../components/NavigationBar';
import styles from './index.module.css';
import {
  TYPE_TEST_LIST,
  TITLE_WITH_CONTENT,
  DOMAIN_BE_PROD,
  DOMAIN_BE_DEV,
} from '../../constants/constant';

export default function TestList() {
  const [data, setData] = useState([]);
  const [slideIn, setSlideIn] = useState(false);
  const titleStr = '💛  몽빗 심테';
  const contentStr = '몽빗에 있는 모든 테스트는 이곳에!';
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${DOMAIN_BE_DEV}/api/v1/tests`).then((res) => {
      setData(res.data);
    });
    const timer = setTimeout(() => {
      setSlideIn(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.containerWrap}>
      <NavigationBar />

      <div className={styles.titleTextWrap}>
        <TitleWithText
          className={styles.titleWithText}
          title={titleStr}
          content={contentStr}
          type_1={TITLE_WITH_CONTENT}
          type_2={TYPE_TEST_LIST}
        />
      </div>

      {data.map((d, i) => (
        <TestSetComplete
          key={i}
          type={TYPE_TEST_LIST}
          thumbnailStr={d.title}
          playCount={d.playCount}
          likeCount={d.likeCount}
          commentCount={d.commentCount}
          imageUrl={d.imageUrl}
          testId={d.id}
        />
      ))}

      <div
        className={cx(styles.goRandomBtnWrap, {
          [styles.slideIn]: slideIn,
        })}
        onClick={() => {
          navigate('/test-random');
        }}
      >
        <Link className={styles.goRandomStartBtn} to="/test-random">
          아무거나 시작
        </Link>
        <img src="/images/test/nextIcon.svg" alt="next_icon" />
      </div>
    </div>
  );
}
