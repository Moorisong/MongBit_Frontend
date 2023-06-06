import { useState, useEffect } from 'react'
import { Stroke } from '../ButtonSets'
import { Link } from 'react-router-dom'
import cx from 'classnames';
import styles from './index.module.css'

export default function NavigationBar() {
    const [menuClicked, setMenuClicked] = useState(false)
    const [clientHeight, setClientHeight] = useState(0)

    // height는 css에서 해결하기 ksh
    useEffect(() => {
        setClientHeight(document.documentElement.scrollHeight)
    }, [])

    return (
        <>
            <div className={styles.navWrap}>
                <div className={styles.menuIcon} onClick={() => setMenuClicked(!menuClicked)}>
                </div>
                <div>
                    <Link to='/main' className={styles.logoDog}></Link>
                    <Link to='/main' className={styles.logoTitle}></Link>
                </div>
                <button></button>
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
