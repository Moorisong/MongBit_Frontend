import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      try {
        axios.get(`https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/code?code=${code}`)
          .then((response) => {
            localStorage.setItem('mongBitToken', response.headers['authorization']);
            navigate('/')
          })
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
