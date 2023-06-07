import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');


  console.log("code--> ", code)

  useEffect(() => {

    const handleKakaoAuth = async () => {
      if (code) {
        try {
          const response = await axios.get(`https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/code?code=${code}`);
          console.log('res--> ', response)
          localStorage.setItem('token', response.headers.authorization);
          // navigate('/');
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
