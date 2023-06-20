// import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import { TYPE_MYPAGE } from '../../constants/constant';
import styles from './index.module.css';

export default function TestOn() {
  // const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <NavigationBar />

      <Footer type={TYPE_MYPAGE} />
    </div>
  );
}
