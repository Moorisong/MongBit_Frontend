import styles from './index.module.css'
import { TitleWithText } from '../../components/Titles'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import { TestCard } from '../../components/TestCard'
import { TestSetLatest } from '../../components/TestSets'
import { GoRandomStartBtn } from '../../components/ButtonSets'
import { useRecoilValue } from 'recoil'
import { logInState } from '../../atom'
import { TITLE_WITH_CONTENT, TYPE_LATEST_MAIN, TYPE_NORMAL_MAIN } from '../../constants/constant'

export default function Main() {
    console.log('전역에서 관리되는 로그인 상태 ---> ', useRecoilValue(logInState))
    return (
        <div className={styles.containerWrap}>
            <NavigationBar />
            <div className={`${styles.titleWithText}`}>
                <TitleWithText title='👀 랜덤 심리테스트' content='고민할 틈은 안줄테니 일단 플레이하고 생각하기' type_1={TITLE_WITH_CONTENT} />
            </div>
            <GoRandomStartBtn url='/test' str='아무거나 시작' />
            <div className={styles.testWrap}>
                <TitleWithText title='🌟 심테의 근본, MBTI 검사' />
                <TestCard thumbnailStr='전생에서 내가 공룡이었다면?' />

                <TitleWithText title='💙 최신 심테' />
                <TestCard thumbnailStr='전생 테스트' type_1={TYPE_LATEST_MAIN} />
                <TestCard thumbnailStr='이세계에서..' type_1={TYPE_LATEST_MAIN} />
                <TestCard thumbnailStr='장난 유형으..' type_1={TYPE_LATEST_MAIN} />

                <TitleWithText title='💚 기타 등등' />
                <TestCard thumbnailStr='살다보면..' type_1={TYPE_LATEST_MAIN} />
                <TestCard thumbnailStr='낙서 유형..' type_1={TYPE_LATEST_MAIN} />
                <TestCard thumbnailStr='기억 속에서..' type_1={TYPE_LATEST_MAIN} />

            </div>
            <Footer />
        </div>
    )
}
