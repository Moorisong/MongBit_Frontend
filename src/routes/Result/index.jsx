import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './index.module.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import ResultLoading from '../../components/ResultLoading';
import TestResult from '../../components/TestResult';

export default function Result() {
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, SetResultData] = useState({
    titleStr: '',
    contentStrArr: [],
    imgUri: '',
  });
  const [likeCnt, setLikeCnt] = useState(null)

  const { testId } = useParams();
  const memberId = sessionStorage.getItem('mongBitmemeberId');

  useEffect(() => {
    axios.get(`https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/like/count`)
    .then((res)=> setLikeCnt(res.data))
  }, [])

  useEffect(() => {
    const score = JSON.parse(sessionStorage.getItem('mbScore'));

    axios
      .get(
        `https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/like/count`
      )
      .then((res) => SetResultData((prev) => ({ ...prev, likeCnt: res.data })));

    axios
      .post(
        `https://mongbit-willneiman.koyeb.app/api/v1/member-test-result/${testId}/${memberId}`,
        score
      )
      .then((res) => {
        const contentArray = res.data.content.split('<br>')

        SetResultData((prev) => ({
          ...prev,
          titleStr: res.data.title,
          contentStrArr: contentArray,
          imgUri: res.data.imggeUrl,
        }));
        setIsLoading(false);
      });
  }, []);
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
          />
        ))}

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        {isLoading && <Footer />}
      </div>
    </div>
  );
}
