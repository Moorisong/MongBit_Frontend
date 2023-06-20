import axios from 'axios';
import { useEffect, useState } from 'react';

import { decodeToken } from '../../util/util';
import TestPreview from '../../components/TestPreview';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import styles from './index.module.css';

export default function RandomTest() {
  const [thumbnailStr, setThumbnailStr] = useState('');
  const [playCnt, setPlayCnt] = useState(0);
  const [description, setDescription] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [testId, setTestId] = useState('');

  useEffect(() => {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', true);
    }

    axios
      .get(`https://mongbit-willneiman.koyeb.app/api/v1/tests/random`)
      .then((res) => {
        setThumbnailStr(res.data.title);
        setPlayCnt(res.data.playCount);
        setDescription(res.data.content);
        setThumbnailUri(res.data.imageUrl);
        setTestId(res.data.id);
      });
  }, []);

  return (
    <div className={styles.wrap}>
      <NavigationBar />

      {description && (
        <TestPreview
          testId={testId}
          thumbnailStr={thumbnailStr}
          playCnt={playCnt}
          description={description}
          thumbnailUri={thumbnailUri}
        />
      )}
      <Footer />
    </div>
  );
}
