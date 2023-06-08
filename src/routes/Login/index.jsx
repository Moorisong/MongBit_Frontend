import axios from "axios"
import { useEffect, useState } from "react";
import { doGet } from "../../util/api";
import NavigationBar from "../../components/NavigationBar";

export default function Login() {
  const [redirectUri, setRedirectUri] = useState(null);


  const url = 'https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=https://mongbit-frontend-moorisong.koyeb.app/login/oauth2/kakao/code&response_type=code'

  return (
    <>
      <NavigationBar />

    </>
  )
}
