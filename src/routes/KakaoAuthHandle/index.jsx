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
            sessionStorage.setItem(
              TOKEN_NAME,
              response.headers['authorization']
            );
            sessionStorage.setItem(
              USER_INFO + 'memeberId',
              response.data.memberId
            );
            sessionStorage.setItem(
              USER_INFO + 'thumbnail',
              response.data.thumbnail
            );
            sessionStorage.setItem(
              USER_INFO + 'registDate',
              response.data.registDate
            );
            sessionStorage.setItem(
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
