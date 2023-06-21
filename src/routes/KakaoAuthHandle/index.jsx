import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { TOKEN_NAME, USER_INFO } from '../../constants/constant';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

            const prev = sessionStorage.getItem('ngb');
            if (prev) {
              // 직전 페이지로 이동이 필요한 경우
              sessionStorage.setItem('ngb', false);
              navigate(prev);
            } else {
              navigate('/main');
            }
          });
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
