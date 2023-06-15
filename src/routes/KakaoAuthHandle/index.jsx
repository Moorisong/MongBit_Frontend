import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { TOKEN_NAME } from '../../constants/constant';
import { logInInfo } from '../../atom';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const [logIn, setLogIn] = useRecoilState(logInInfo);

  useEffect(() => {
    if (code) {
      try {
        axios
          .get(
            `https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/code?code=${code}`
          )
          .then((response) => {
            localStorage.setItem(TOKEN_NAME, response.headers['authorization']);
            setLogIn({
              state: true,
              memberId: response.data.memberId,
              thumbnail: response.data.thumbnail,
              registDate: response.data.registDate,
              userName: response.data.username,
            });
            navigate('/');
            console.log(logIn)
          }, []);
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
