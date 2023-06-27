import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import lottie from 'lottie-web';

import animationData from './loadingIcon.json';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import TestPreview from '../../components/TestPreview';
import styles from './index.module.css';
import { DOMAIN_BE_PROD, DOMAIN_BE_DEV } from '../../constants/constant';

export default function PreviewTest() {
  const { testId } = useParams();
  const [data, setData] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    axios.get(`${DOMAIN_BE_PROD}/api/v1/tests/test/${testId}`).then((res) => {
      setData(res.data);
    });
  }, []);

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
  }, [data.imageUrl]);
  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>

      {data.imageUrl ? (
        <TestPreview
          testId={testId}
          thumbnailStr={data.title}
          playCnt={data.playCount}
          description={data.content}
          thumbnailUri={data.imageUrl}
        />
      ) : (
        <div className={styles.loadImgWrap}>
          <div ref={containerRef}></div>
        </div>
      )}

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}
