import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from './index.module.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import TestResult from '../../components/TestResult';
import { decodeToken, getHeaders } from '../../util/util';
import { DOMAIN_BE_PROD, DOMAIN_BE_DEV } from '../../constants/constant';
import { COUPANG_VISIT } from '../../constants/constant';

export default function Result() {
  const [resultData, SetResultData] = useState({
    titleStr: '',
    contentStrArr: [],
    imgUri: '',
    testResultId: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { testId } = useParams();
  const memberId = sessionStorage.getItem('mongBitmemeberId');

  useEffect(() => {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', location.pathname);
      return navigate('/need-login');
    }
    checkCoupnagSiteVisit();

    if (!sessionStorage.getItem('mbScore'))
      return navigate(
        `/record/${testId}/${sessionStorage.getItem('mbResultId')}`
      );

    window.onpopstate = handlePopstate;

    const headers = getHeaders();

    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/test/${testId}/like/count`, { headers })
      .then((res) => {
        SetResultData((prev) => ({ ...prev, likeCnt: res.data }));
      })
      .catch((err) => {
        alert(err.response.data);
        navigate('/login');
      });

    const score = JSON.parse(sessionStorage.getItem('mbScore'));
    axios
      .post(
        `${DOMAIN_BE_PROD}/api/v1/member-test-result/${testId}/${memberId}`,
        score,
        { headers }
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
      })
      .catch((err) => {
        alert(err.response.data);
        navigate('/login');
      });

    return () => {
      window.onpopstate = null;
    };
  }, []);

  function handlePopstate() {
    navigate('/exception');
  }

  function isWithin24Hours(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diff = Math.abs(new Date(date1) - new Date(date2));
    return diff < oneDay;
  }

  function checkCoupnagSiteVisit() {
    const coupangVisitDate = localStorage.getItem(COUPANG_VISIT);
    const currentDate = new Date();

    if (!coupangVisitDate || !isWithin24Hours(coupangVisitDate, currentDate))
      navigate(`/before-result/${testId}`);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>
      {resultData.titleStr && (
        <TestResult
          titleStr={resultData.titleStr}
          contentStrArr={resultData.contentStrArr}
          likeCnt={resultData.likeCnt && resultData.likeCnt}
          testId={testId}
          imgUri={resultData.imgUri}
          testResultId={resultData.testResultId}
        />
      )}
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}
