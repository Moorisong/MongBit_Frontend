import jwtDecode from "jwt-decode";
import { TOKEN_NAME } from "../constants/constant";

export function decodeToken() {
  const token = localStorage.getItem(TOKEN_NAME)
  const decodedToken = jwtDecode(token)

  const expiration = decodedToken.exp;
  const expirationTime = new Date(expiration * 1000);
  const currentTime = new Date()

  console.log('decoded-----> ', decodedToken)

  if (expirationTime < currentTime) {
    return false
  } else {
    return true
  }
}
