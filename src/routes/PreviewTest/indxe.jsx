import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import TestPreview from '../../components/TestPreview';
import styles from './index.module.css';

export default function PreviewTest() {
  const { testId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`https://mongbit-willneiman.koyeb.app/api/v1/tests/test/${testId}`)
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>

      {data.imageUrl && (
        <TestPreview
          testId={testId}
          thumbnailStr={data.title}
          playCnt={data.playCount}
          description={data.content}
          thumbnailUri={data.imageUrl}
        />
      )}

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}
