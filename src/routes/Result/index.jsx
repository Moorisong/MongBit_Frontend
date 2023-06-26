import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from './index.module.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import ResultLoading from '../../components/ResultLoading';
import TestResult from '../../components/TestResult';
import { decodeToken } from '../../util/util';
import { DOMAIN_BE_PROD, DOMAIN_BE_DEV } from '../../constants/constant';

export default function Result() {
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, SetResultData] = useState({
    titleStr: '',
    contentStrArr: [],
    imgUri: '',
    testResultId: '',
  });
  const [likeCnt, setLikeCnt] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { testId } = useParams();
  const memberId = sessionStorage.getItem('mongBitmemeberId');

  useEffect(() => {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', location.pathname);
      return navigate('/need-login');
    }
    if (!sessionStorage.getItem('mbScore'))
      return navigate(
        `/record/${testId}/${sessionStorage.getItem('mbResultId')}`
      );
    window.onpopstate = handlePopstate;

    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/test/${testId}/like/count`)
      .then((res) => setLikeCnt(res.data));

    const score = JSON.parse(sessionStorage.getItem('mbScore'));

    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/test/${testId}/like/count`)
      .then((res) => SetResultData((prev) => ({ ...prev, likeCnt: res.data })));

    axios
      .post(
        `${DOMAIN_BE_PROD}/api/v1/member-test-result/${testId}/${memberId}`,
        score
      )
      .then((res) => {
        const contentArray = res.data.content.split('<br>');

        SetResultData((prev) => ({
          ...prev,
          titleStr: res.data.title,
          contentStrArr: contentArray,
          imgUri: res.data.imageUrl,
          testResultId: res.data.id,
        }));
        sessionStorage.removeItem('mbScore');
        sessionStorage.setItem('mbResultId', res.data.id);
        setIsLoading(false);
      });

    return () => {
      // 클리어 시켜주기
      window.onpopstate = null;
    };
  }, []);

  function handlePopstate() {
    navigate('/exception');
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>
      {isLoading && <ResultLoading />}
      {isLoading ||
        (resultData.titleStr && (
          <TestResult
            titleStr={resultData.titleStr}
            contentStrArr={resultData.contentStrArr}
            likeCnt={likeCnt && likeCnt}
            testId={testId}
            imgUri={resultData.imgUri}
            testResultId={resultData.testResultId}
          />
        ))}

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        {isLoading && <Footer />}
      </div>
    </div>
  );
}
