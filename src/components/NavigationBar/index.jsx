import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cx from 'classnames';
import styles from './index.module.css';
import jwtDecode from "jwt-decode";
import axios from 'axios';


export default function NavigationBar() {
    const navigate = useNavigate()
    const [menuClicked, setMenuClicked] = useState(false);
    const [logInState, setLogInState] = useState(false)

    function checkJwtToken() {
        // localStorage.setItem('mongBitToken', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLquYDshqHtmIQiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjg2MTk1ODc3fQ.V4czgPDat_2xO-HeuDtjCVL2Kz0fvkdDi344g0Wc2Xo')
        if (!localStorage.getItem('mongBitToken')) {
            alert('로그인 해주세요')
            return navigate('/login')
        }
        const token = localStorage.getItem('mongBitToken')
        const decodedToken = jwtDecode(token)

        const expiration = decodedToken.exp;
        const expirationTime = new Date(expiration * 1000);
        const currentTime = new Date()

        console.log('decoded-----> ', decodedToken)

        if (expirationTime < currentTime) {
            alert('로그인 해주세요')
            return navigate('/login')

        } else {
            console.log('토큰 살아있음 !! --- 만료시간 : ', expirationTime)
            navigate('/mypage')
        }
    }

    function clickLogOut(){
        localStorage.setItem('mongBitToken', '')
        alert('로그아웃 되었습니다')
        navigate('/main')
    }

    return (
        <>
            <div className={styles.navWrap}>
                <div className={styles.menuIcon} onClick={() => setMenuClicked(!menuClicked)}></div>
                <div>
                    <Link to="/main" className={styles.logoDog}></Link>
                    <Link to="/main" className={styles.logoTitle}></Link>
                </div>
                <button className={styles.myPageBtn} onClick={checkJwtToken}></button>
            </div>

            <div className={cx(styles.menuWrap, { [styles.menuMoveToRight]: menuClicked })}>
                <ul>
                    <li>
                        <ul className={styles.ulWrap}>심리테스트
                            <li>최신 심테</li>
                        </ul>
                        <Link to="/test-list">전체 보기</Link>
                    </li>
                    <li>
                        <ul className={styles.ulWrap}>마이페이지
                            <li>심테 기록 보기</li>
                        </ul>
                    </li>
                    <li>
                        <ul className={styles.ulWrap}>개발자 정보
                            <li>몽몽이 크루</li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li>
                            <button onClick={clickLogOut}>로그아웃</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={cx(styles.modal, { [styles.modalMoveToRight]: menuClicked })}></div>
        </>
    );
}
