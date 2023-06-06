// import axios from "axios"

export default function Login() {

  // const Rest_api_key = '3245a5f9cb8303814aadbe1eb65b2e73'
  // const redirect_uri = 'http://http://localhost:8080/login/oauth2/kakao/code:3000/main'


  const kakaoURL = 'https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=http://localhost:8080/login/oauth2/kakao/code&response_type=code'

  const handleLogin = () => {
    window.location.href = kakaoURL
  }




  return (
    <>
      <div>
        MongBit 로그인 페이지
      </div>

      <button onClick={handleLogin}> 로그인 </button>
    </>
  )
}
