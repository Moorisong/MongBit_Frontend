import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { TitleWithText } from '../../components/Titles';
import { TestSetComplete } from '../../components/TestSets';
import NavigationBar from '../../components/NavigationBar';
import styels from './index.module.css';
import { TYPE_TEST_LIST, TITLE_WITH_CONTENT } from '../../constants/constant';

export default function TestLatest() {
  const [data, setData] = useState([]);
  const titleStr = '😜 최신 심테';
  const contentStr = '몽빗 최신 심테들 여기 다 모여있어요!';
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://mongbit-willneiman.koyeb.app/api/v1/tests/0/10`)
      .then((res) => {
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
