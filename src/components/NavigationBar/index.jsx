import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import cx from 'classnames';

import styles from './index.module.css';
import { TOKEN_NAME, USER_INFO } from '../../constants/constant';
import { decodeToken } from '../../util/util';

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuClicked, setMenuClicked] = useState(false);

  useEffect(() => {
    if (!decodeToken().state) {
      sessionStorage.setItem(USER_INFO + 'memeberId', '');
      sessionStorage.setItem(USER_INFO + 'thumbnail', '');
      sessionStorage.setItem(USER_INFO + 'registDate', '');
      sessionStorage.setItem(USER_INFO + 'username', '');
    }
  }, []);

  function clickMypageBtn() {
    if (!sessionStorage.getItem(TOKEN_NAME)) {
      return navigate('/login');
    }
    if (decodeToken().state) {
      return navigate('/mypage');
    }
    navigate('/login');
  }
  function clickLogOut() {
    sessionStorage.setItem(TOKEN_NAME, '');
    sessionStorage.setItem(USER_INFO + 'memeberId', '');
    sessionStorage.setItem(USER_INFO + 'thumbnail', '');
    sessionStorage.setItem(USER_INFO + 'registDate', '');
    sessionStorage.setItem(USER_INFO + 'username', '');
    setMenuClicked(false);
    navigate('/main');
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.navWrap}>
        <div
          className={styles.menuIcon}
          onClick={() => setMenuClicked(true)}
        ></div>
        <div className={styles.logoWrap} onClick={() => setMenuClicked(false)}>
          <Link to="/main" className={styles.logoDog}></Link>
          <Link to="/main" className={styles.logoTitle}></Link>
        </div>
        {location.pathname === '/mypage' ? (
          <button className={styles.myPageBtnNone}></button>
        ) : (
          <button
            className={styles.myPageBtn}
            onClick={clickMypageBtn}
          ></button>
        )}
      </div>

      <div
        className={cx(styles.menuWrap, {
          [styles.menuMoveToRight]: menuClicked,
        })}
      >
        <ul className={styles.menuUlWrapper}>
          <li>
            <ul className={styles.ulWrap}>
              심리테스트
              <li>
                <Link to="/test/latest">최신 보기</Link>
                <Link to="/test/list">전체 보기</Link>
              </li>
            </ul>
          </li>
          <li>
            <ul className={styles.ulWrap}>
              마이페이지
              <li onClick={clickMypageBtn}>심테 기록 보기</li>
            </ul>
          </li>
          <li>
            <ul className={styles.ulWrap}>
              개발자 정보
              <li>몽몽이 크루</li>
            </ul>
          </li>
          {decodeToken().role === 'ROLE_ADMIN' && (
            <li>
              <button
                className={styles.adminBtn}
                onClick={() => {
                  navigate('/admin');
                }}
              >
                <p>관리자 페이지</p>
              </button>
            </li>
          )}
          <li>
            <ul>
              {decodeToken().state && (
                <li className={styles.logOutWrap}>
                  <p onClick={clickLogOut}>로그아웃</p>
                  <button
                    className={styles.logOutBtn}
                    onClick={clickLogOut}
                  ></button>
                  <img src="/images/navigationBar/logo_dog.svg" alt="logo" />
                </li>
              )}
            </ul>
          </li>
        </ul>
      </div>
      <div className={styles.fixModal}></div>
      <div
        className={cx(styles.blackModal, {
          [styles.modalMoveToRight]: menuClicked,
        })}
        onClick={() => setMenuClicked(false)}
      ></div>
    </div>
  );
}
