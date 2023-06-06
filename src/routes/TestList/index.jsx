import { TitleWithText } from "../../components/Titles"
import { TestSetComplete } from "../../components/TestSets"
import NavigationBar from "../../components/NavigationBar"
import styels from './index.module.css'

export default function TestList() {
    const titleStr = '💛  몽빗 심테'
    const contentStr = '대충 후킹 멘트 자리 대충 후킹 멘트 자리 대충 후킹 멘트 자리'

    return (
        <div className={styels.containerWrap}>
            <NavigationBar />
            <div className={styels.titleTextWrap}>
                <TitleWithText className={styels.titleWithText} title={titleStr} content={contentStr} />
            </div>
            <span className={styels.testCardComplete}><TestSetComplete /></span>
            <span className={styels.testCardComplete}><TestSetComplete /></span>
            <span className={styels.testCardComplete}><TestSetComplete /></span>
            <span className={styels.testCardComplete}><TestSetComplete /></span>
        </div>
    )
}
