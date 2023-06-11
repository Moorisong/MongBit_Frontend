import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TOKEN_NAME } from '../../constants/constant';
import { useRecoilState } from 'recoil'
import { logInState } from "../../atom";

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const [logIn, setLogIn] = useRecoilState(logInState)

  useEffect(() => {
    if (code) {
      try {
        axios.get(`https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/code?code=${code}`)
          .then((response) => {
            localStorage.setItem(TOKEN_NAME, response.headers['authorization']);
            setLogIn(true)
            console.log('로그인 됨 ----')
            navigate('/')
          }, [])
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <div>
      <button></button>
    </div>
  );
}
