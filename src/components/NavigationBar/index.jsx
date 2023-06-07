import { useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './index.module.css';

export default function NavigationBar() {
    const [menuClicked, setMenuClicked] = useState(false);

    const url = 'https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=https://mongbit-frontend-moorisong.koyeb.app/login/oauth2/kakao/code&response_type=code'

    const kakaoLogin = () => {
        window.location.href = url;
    };

    return (
        <>
            <div className={styles.navWrap}>
                <div className={styles.menuIcon} onClick={() => setMenuClicked(!menuClicked)}></div>
                <div>
                    <Link to="/main" className={styles.logoDog}></Link>
                    <Link to="/main" className={styles.logoTitle}></Link>
                </div>
                <button onClick={kakaoLogin}></button>
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
                </ul>
            </div>
            <div className={cx(styles.modal, { [styles.modalMoveToRight]: menuClicked })}></div>
        </>
    );
}
