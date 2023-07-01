import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './index.module.css';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';

export default function ExeptionPage() {
  const navigate = useNavigate();
  useEffect(() => {
    window.onpopstate = handlePopstate;
  }, []);

  function handlePopstate() {
    navigate('/main');
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.bgWhite}>
        <NavigationBar />
      </div>

      <div className={styles.textBox}>
        <p>세션이 만료되었습니다.</p>
      </div>

      <div className={styles.logoImgWrap}>
        <img src="/images/logIn/loginLogo.svg" alt="Logo_image" />
        <p className={styles.logoText}>
          © 2023 MongMoongCrew. All rights reserved
        </p>
      </div>

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}
