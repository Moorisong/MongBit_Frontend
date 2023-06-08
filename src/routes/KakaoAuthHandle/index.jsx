import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {

    const handleKakaoAuth = () => {
      if (code) {
        try {
          const response = axios.get(`https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/code?code=${code}`);
          console.log('response.data ---> ', response.headers['token'])
          localStorage.setItem('token', response.headers['token']);
          navigate('/')
        } catch (error) {
          console.error(error);
        }
      }
    };

    handleKakaoAuth();
  }, []);

  return (
    <div>
      <button></button>
    </div>
  );
}
