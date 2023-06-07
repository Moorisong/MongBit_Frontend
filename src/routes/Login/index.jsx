import axios from "axios"
import { useEffect, useState } from "react";
import { doGet } from "../../util/api";
import NavigationBar from "../../components/NavigationBar";

export default function Login() {
  const [redirectUri, setRedirectUri] = useState(null);


  const url = 'https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/url'
  // useEffect(() => {
  //   setRedirectUri(doGet(url))
  // }, []);
  return (
    <>
      <NavigationBar />

    </>
  )
}
