import styles from './index.module.css'
import axios from "axios"
import { useEffect, useState } from "react";
import { doGet } from "../../util/api";
import NavigationBar from "../../components/NavigationBar";
import jwtDecode from "jwt-decode";


export default function Login() {

  // console.log(process.env.REACT_APP_FE_URL);
  // console.log(process.env.NODE_ENV);

  const url = process.env.REACT_APP_FE_URL ?
    `https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=${process.env.REACT_APP_FE_URL}/login/oauth2/kakao/code&response_type=code`
    : `https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=https://mong-bit-frontend.vercel.app/login/oauth2/kakao/code&response_type=code`

  const kakaoLogin = () => {
    window.location.href = url;
  };

  return (
    <div>
      <p className={styles.textSamll}>3초만에 로그인하고</p>
      <div className={styles.textBig}>
        <p>무료로 성격 검사</p>
        <p>친구에게 공유까지</p>
      </div>
      <button className={styles.kakaoLogInBtn} onClick={kakaoLogin}></button>
    </div>
  )
}
