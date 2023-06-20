import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { TOKEN_NAME, USER_INFO } from '../../constants/constant';
import { tokenInfo } from '../../atom';
import { decodeToken } from '../../util/util';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useRecoilState(tokenInfo);
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      try {
        axios
          .get(
            `https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/code?code=${code}`
          )
          .then((response) => {
            localStorage.setItem(TOKEN_NAME, response.headers['authorization']);
            localStorage.setItem(
              USER_INFO + 'memeberId',
              response.data.memberId
            );
            localStorage.setItem(
              USER_INFO + 'thumbnail',
              response.data.thumbnail
            );
            localStorage.setItem(
              USER_INFO + 'registDate',
              response.data.registDate
            );
            localStorage.setItem(
              USER_INFO + 'username',
              response.data.username
            );
            navigate(-2);

            const decodedToken = decodeToken();

            setToken({
              state: decodedToken.state,
              role: decodedToken.role,
            });
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
