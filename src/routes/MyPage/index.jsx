import NavigationBar from "../../components/NavigationBar";
import jwtDecode from "jwt-decode";
import styles from './index.module.css'
import { useNavigate } from "react-router-dom";

export default function MyPage(props) {
  const navigate = useNavigate()

  return (
    <div>
      <NavigationBar />
      <p>마이페이지임</p>
    </div>
  )
}
