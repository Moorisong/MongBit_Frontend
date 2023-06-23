import axios from 'axios';
import lottie from 'lottie-web';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import styles from './index.module.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import TestResult from '../../components/TestResult';
import animationData from './loading_1.json';

export default function ViewOldResult() {
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { testId } = useParams();
  const { testResultId } = useParams();

  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      animationData: animationData,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://mongbit-willneiman.koyeb.app/api/v1/tests/test/test-result/${testId}/${testResultId}`
      )
      .then((res) => {
        setTestData(res.data);
        setLoading(false);
      });
  }, []);
  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>

      {loading && (
        <div className={styles.loadImgWrap}>
          <div ref={containerRef} className={styles.loadImg}></div>
        </div>
      )}

      {loading || (
        <TestResult
          titleStr={testData.title}
          contentStrArr={[testData.content]}
          likeCnt={testData.likeCnt}
          testId={testId}
          imgUri={testData.imageUrl}
        />
      )}

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}
