import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './index.module.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import TestAdd from '../../components/TestAdd';
import { decodeToken } from '../../util/util';

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (decodeToken().role !== 'ROLE_ADMIN') return navigate('/main');
  }, []);
  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>
      <TestAdd />
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}
