import styles from './index.module.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import TestAdd from '../../components/TestAdd';

export default function Admin() {
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
