import { useState, useEffect } from 'react'
import { Stroke } from '../ButtonSets'
import { doGet } from "../../util/api";
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import cx from 'classnames';
import styles from './index.module.css'

export default function NavigationBar() {
    const location = useLocation()
    const navigate = useNavigate()

    const [menuClicked, setMenuClicked] = useState(false)
    const [clientHeight, setClientHeight] = useState(0)
    const [kakaoCode, setKakaoCode] = useState(null)

    const url = 'https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/url'
    // const url = 'https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=https://mongbit-willneiman.koyeb.app/login/oauth2/kakao/code&response_type=code'


    // height는 css에서 해결하기 ksh
    useEffect(() => {
        setClientHeight(document.documentElement.scrollHeight)
    }, [])

    // useEffect(() => {
    //     const param = new URLSearchParams(location.search)
    //     const code = param.get('code')
    //     setKakaoCode(code)
    // }, [location.search])

    useEffect(()=>{
        console.log('kakaoCode===> ', kakaoCode)
        if(kakaoCode){
            window.location.href = kakaoCode



        }

    }, [kakaoCode])

    return (
        <>
            <div className={styles.navWrap}>
                <div className={styles.menuIcon} onClick={() => setMenuClicked(!menuClicked)}>
                </div>
                <div>
                    <Link to='/main' className={styles.logoDog}></Link>
                    <Link to='/main' className={styles.logoTitle}></Link>
                </div>
                <button onClick={() => {

                    doGet(url).then((res) => {
                        setKakaoCode(res)
                    })


                }}></button>
            </div>

            <div className={cx(styles.menuWrap, { [styles.menuMoveToRight]: menuClicked })}
            // style={{ height: clientHeight + 'px' }}
            >

                <ul>
                    <li>
                        <ul className={styles.ulWrap}>
                            심리테스트
                            <li>최신 심테</li>
                        </ul>
                        <Link to='/test-list'> 전체 보기 </Link>
                        <Stroke />
                    </li>

                    <li>
                        <ul className={styles.ulWrap}>
                            마이페이지
                            <li>심테 기록 보기</li>
                        </ul>
                        <Stroke />
                    </li>

                    <li>
                        <ul className={styles.ulWrap}>
                            개발자 정보
                            <li>몽몽이 크루</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={cx(styles.modal, { [styles.modalMoveToRight]: menuClicked })} style={{ height: clientHeight + 'px' }}></div>

        </>
    )
}
