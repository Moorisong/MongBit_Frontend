import styles from './index.module.css'
import NavigationBar from "../../components/NavigationBar";
import Footer from '../../components/Footer';
import { TYPE_LOGIN } from '../../constants/constant';


export default function Login() {

  console.log(process.env.REACT_APP_FE_URL);
  console.log(process.env.NODE_ENV);

  const url = process.env.REACT_APP_FE_URL ?
    `https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=${process.env.REACT_APP_FE_URL}/login/oauth2/kakao/code&response_type=code`
    : `https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=https://mong-bit-frontend.vercel.app/login/oauth2/kakao/code&response_type=code`

  const kakaoLogin = () => {
    window.location.href = url;
  };

  return (
    <div className={styles.wrap}>
      <NavigationBar />
      <p className={styles.textSamll}>3초만에 로그인하고</p>
      <div className={styles.textBig}>
        <p>무료로 성격 검사</p>
        <p>친구에게 공유까지</p>
      </div>
      <img src="/images/logIn/loginLogo.svg" alt="Logo_image" className={styles.logoImg} />
      <p className={styles.logoText}>© 2023 MongMoongCrew. All rights reserved</p>
      <button className={styles.kakaoLogInBtn} onClick={kakaoLogin}></button>
      <div className={styles.docs}>
        <span><p>이용약관</p></span>
        <span><p>개인정보처리방침</p></span>
      </div>
      <Footer type={TYPE_LOGIN} />
    </div>
  )
}
