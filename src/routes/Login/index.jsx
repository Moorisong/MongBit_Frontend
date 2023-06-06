import axios from "axios"
import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router'

export default function Login() {
  const [redirectUri, setRedirectUri] = useState(null);
  // const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const oldUrl = 'https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/code&response_type=code'
        const response = await axios.get('https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/url');
        setRedirectUri(response.data);

        console.log('redirectUri---> ', redirectUri)

        if(redirectUri) window.location.href = redirectUri;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [redirectUri]);
  return (
    <>
      <div>
        MongBit 로그인 페이지
      </div>

    </>
  )
}
