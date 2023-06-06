import axios from "axios"
import { useEffect, useState } from "react";

export default function Login() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://kauth.kakao.com/oauth/authorize'
        const param = {
          client_id: '3245a5f9cb8303814aadbe1eb65b2e73',
          redirect_uri: 'https://mongbit-willneiman.koyeb.app',
          response_type: 'code'
        }
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log('data---> ', data)
  }, []);
  return (
    <>
      <div>
        MongBit 로그인 페이지
      </div>

    </>
  )
}
