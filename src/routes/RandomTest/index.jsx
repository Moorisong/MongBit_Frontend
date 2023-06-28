import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TestPreview from '../../components/TestPreview';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import styles from './index.module.css';
import { DOMAIN_BE_PROD, DOMAIN_BE_DEV } from '../../constants/constant';
import { getHeaders } from '../../util/util';

export default function RandomTest() {
  const [thumbnailStr, setThumbnailStr] = useState('');
  const [playCnt, setPlayCnt] = useState(0);
  const [description, setDescription] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [testId, setTestId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const headers = getHeaders();
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/tests/random`, { headers })
      .then((res) => {
        setThumbnailStr(res.data.title);
        setPlayCnt(res.data.playCount);
        setDescription(res.data.content);
        setThumbnailUri(res.data.imageUrl);
        setTestId(res.data.id);
      })
      .catch((err) => {
        alert(err.response.data);
        navigate('/login');
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
