import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import ResultLoading from '../ResultLoading';
import styles from './index.module.css';
import { CardButton, CommentReadOnly } from '../ButtonSets';
import { getHeaders } from '../../util/util';
import {
  DOMAIN_BE_PROD,
  DOMAIN_BE_DEV,
  TYPE_COMMENT,
} from '../../constants/constant';

export default function CoupangClick(props) {
  const { testId } = useParams();
  const [showLoading, setShowLoading] = useState(false);
  const [data, setData] = useState({
    testId: testId,
    comment: [],
    memberId: props.memberId,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const headers = getHeaders();
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/test/comments/${data.testId}/page/0`, {
        headers,
      })
      .then((res) => {
        setData((prev) => ({ ...prev, comment: res.data.commentDTOList }));
      })
      .catch((err) => {
        alert(err.response.data);
        navigate('/login');
      });
  }, []);

  useEffect(() => {
    let timer;
    const handleWindowFocus = () => {
      // 몽빗 페이지로 돌아왔을 경우
      const timer = setTimeout(() => {
        if(sessionStorage.getItem('mbAdvClicked')){
          setShowLoading(false);
          navigate(`/result/${testId}`);
        }, 3000);
      }
    };

    document.addEventListener('visibilitychange', handleWindowFocus);

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  function clickLink() {
    const link = 'https://link.coupang.com/a/2s6aq';
    sessionStorage.setItem('mbAdvClicked', true);
    setShowLoading(true);
    window.open(link, '_blank');
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>

      {showLoading && <ResultLoading />}

      {showLoading || (
        <div className={styles.content} onClick={clickLink}>
          <div>
            <button>쿠팡 보고 와서 결과 확인</button>
            <p>솔직하게 말할게요. 서버비 때문이예요ㅜㅜ </p>
          </div>
        </div>
      )}

      {showLoading || (
        <div className={styles.commentWrap}>
          <CardButton type={TYPE_COMMENT} />
          {data.comment.map((com, i) => (
            <div key={i} className={styles.commentContentWrap}>
              <CommentReadOnly
                data={com}
                memberId={data.memberId}
                testId={data.testId}
                id={com.id}
              />
            </div>
          ))}
        </div>
      )}

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}
