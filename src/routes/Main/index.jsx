import styles from './index.module.css'
import { TitleWithText } from '../../components/Titles'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import { TestCard } from '../../components/TestCard'
import { TestSetLatest } from '../../components/TestSets'
import { GoRandomStartBtn } from '../../components/ButtonSets'

export default function Main() {
    return (
        <div className={styles.containerWrap}>
            <NavigationBar />
            <div className={styles.titleWithText}>
                <TitleWithText title='👀 랜덤 심리테스트' content='고민할 틈은 안줄테니 일단 플레이하고 생각하기' />
            </div>
            <GoRandomStartBtn url='ksh' />
            <div className={styles.testWrap}>
                <TitleWithText title='🌟 심테의 근본, MBTI 검사' />
                <TestCard thumbnailStr='전생에서 내가 공룡이었다면?' thumbnailClass='normal_thumbnail' titleBoxClass='normal_titleBox' />

                <TitleWithText title='💙 최신 심테' />
                <TestCard thumbnailStr='전생 테스트' thumbnailClass='latest_thumbnail' titleBoxClass='latest_titleBox' marginClass='marginLeft' displayClass='inline' />
                <TestCard thumbnailStr='이세계에서..' thumbnailClass='latest_thumbnail' titleBoxClass='latest_titleBox' marginClass='marginLeft' displayClass='inline' />
                <TestCard thumbnailStr='장난 유형으..' thumbnailClass='latest_thumbnail' titleBoxClass='latest_titleBox' marginClass='marginLeft' displayClass='inline' />

                <TitleWithText title='💚 기타 등등' />
                <TestCard thumbnailStr='살다보면..' thumbnailClass='latest_thumbnail' titleBoxClass='latest_titleBox' marginClass='marginLeft' displayClass='inline' />
                <TestCard thumbnailStr='낙서 유형..' thumbnailClass='latest_thumbnail' titleBoxClass='latest_titleBox' marginClass='marginLeft' displayClass='inline' />
                <TestCard thumbnailStr='기억 속에서..' thumbnailClass='latest_thumbnail' titleBoxClass='latest_titleBox' marginClass='marginLeft' displayClass='inline' />

            </div>
            <Footer />
        </div>
    )
}
