import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import cx from 'classnames';
import styles from './index.module.css';
import jwtDecode from "jwt-decode";
import { TOKEN_NAME } from '../../constants/constant';
import { useRecoilState } from 'recoil'
import { logInInfo, logInState } from '../../atom';


export default function NavigationBar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [menuClicked, setMenuClicked] = useState(false);
    const [logIn, setLogIn] = useRecoilState(logInInfo)

    function checkJwtToken() {
        if (!localStorage.getItem(TOKEN_NAME)) {
            return navigate('/login')
        }
        const token = localStorage.getItem(TOKEN_NAME)
        const decodedToken = jwtDecode(token)

        const expiration = decodedToken.exp;
        const expirationTime = new Date(expiration * 1000);
        const currentTime = new Date()

        console.log('decoded-----> ', decodedToken)

        if (expirationTime < currentTime) {
            return navigate('/login')

        } else {
            console.log('토큰 살아있음 !! --- 만료시간 : ', expirationTime)
            navigate('/mypage')
        }
    }

    function clickLogOut() {
        localStorage.setItem(TOKEN_NAME, '')
        setLogIn({
            state: false,
            memberId: '',
            thumbnail: '',
            registDate: '',
            userName: '',
        })
        console.log('로그아웃 함 ---', logIn)
        setMenuClicked(false)
        navigate('/main')
    }

    return (
        <div className={styles.wrap}>

            <div className={styles.navWrap}>
                <div className={styles.menuIcon} onClick={() => setMenuClicked(true)}></div>
                <div className={styles.logoWrap} onClick={() => setMenuClicked(false)}>
                    <Link to="/main" className={styles.logoDog}></Link>
                    <Link to="/main" className={styles.logoTitle}></Link>
                </div>
                {location.pathname === '/mypage' ? <button className={styles.myPageBtnNone}></button> : <button className={styles.myPageBtn} onClick={checkJwtToken}></button>}
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
                            <li className={styles.logOutWrap} >
                                <p onClick={clickLogOut}>로그아웃</p>
                                <button className={styles.logOutBtn} onClick={clickLogOut} ></button>
                                <img src="/images/navigationBar/logo_dog.svg" alt="logo" />
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={styles.fixModal}></div>
            <div className={cx(styles.blackModal, { [styles.modalMoveToRight]: menuClicked })} onClick={() => setMenuClicked(false)}></div>
        </div>
    );
}
