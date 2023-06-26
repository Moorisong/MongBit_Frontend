import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { TitleWithText } from '../../components/Titles';
import { TestSetComplete } from '../../components/TestSets';
import NavigationBar from '../../components/NavigationBar';
import styels from './index.module.css';
import {
  TYPE_TEST_LIST,
  TITLE_WITH_CONTENT,
  DOMAIN_BE_PROD,
  DOMAIN_BE_DEV,
} from '../../constants/constant';

export default function TestList() {
  const [data, setData] = useState([]);
  const titleStr = '💛  몽빗 심테';
  const contentStr = '몽빗에 있는 모든 테스트는 이곳에!';
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${DOMAIN_BE_PROD}/api/v1/tests`).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className={styels.containerWrap}>
      <NavigationBar />

      {/* <input type="file" name="file" onChange={handleFileChange}/> */}

      <div className={styels.titleTextWrap}>
        <TitleWithText
          className={styels.titleWithText}
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
        className={styels.goRandomBtnWrap}
        onClick={() => {
          navigate('/test-random');
        }}
      >
        <Link className={styels.goRandomStartBtn} to="/test-random">
          아무거나 시작
        </Link>
        <img src="/images/test/nextIcon.svg" alt="next_icon" />
      </div>
    </div>
  );
}
