import { TitleWithText } from "../../components/Titles"
import { TestSetComplete } from "../../components/TestSets"
import NavigationBar from "../../components/NavigationBar"
import Footer from "../../components/Footer"
import styels from './index.module.css'
import { TYPE_TEST_LIST, TITLE_WITH_CONTENT } from "../../constants/constant"

export default function TestList(props) {
    const titleStr = '💛  몽빗 심테'
    const contentStr = '대충 후킹 멘트 자리 대충 후킹 멘트 자리 대충 후킹 멘트 자리'
    return (
        <div className={styels.containerWrap}>
            <NavigationBar />
            <input type="file" />
            <div className={styels.titleTextWrap}>
                <TitleWithText className={styels.titleWithText} title={titleStr} content={contentStr} type_1={TITLE_WITH_CONTENT} type_2={TYPE_TEST_LIST} />
            </div>

            <TestSetComplete type={TYPE_TEST_LIST} />
            <TestSetComplete type={TYPE_TEST_LIST} />
            <TestSetComplete type={TYPE_TEST_LIST} />
            <TestSetComplete type={TYPE_TEST_LIST} />
            <TestSetComplete type={TYPE_TEST_LIST} />
            <TestSetComplete type={TYPE_TEST_LIST} />
            <TestSetComplete type={TYPE_TEST_LIST} />

            <Footer type={TYPE_TEST_LIST} />
        </div>
    )
}
