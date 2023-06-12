import { TYPE_ON_TEST, TYPE_MYPAGE } from '../../constants/constant'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

export function CardButton(props) {
  return (
    <div className={`${styles.wrap} ${styles[props.moveClass]}`}>
      <button className={`${styles.button} ${styles[props.btnType]}`}></button>
      {
        props.btnType === 'comment' || <span className={`${styles.span} ${styles.count}`}>1,143</span>
      }
      {
        props.btnType === 'comment' &&
        <span className={`${styles.span_onTest} ${styles.commentText_onTest}`}>댓글</span>
      }
      {
        props.btnType === 'comment' &&
        <span className={`${styles.span_onTest} ${styles.commentText_onTest}`}>33</span>
      }
    </div>
  )
}

export function TestButton(props) {
  return (
    <div className={styles.testBtnWrap}>
      <button className={`${styles.button} ${styles[props.btnType]}`}></button>
      <p className={styles.btnNameText}>{props.str}</p>
    </div>
  )
}

export function AddCommentButton() {
  return (
    <div className={styles.commentBtnWrap}>
      <button className={`${styles.button} ${styles.addCommentButton}`}></button>
    </div>
  )
}

export function Comment() {
  //Prop으로 데이터 가져와서 넣어주기 ksh
  return (
    <div>
      <button className={`${styles.userImg}`}></button>
      <span>김송현 &nbsp; · &nbsp; </span>
      <span>1일 전</span>
      <p>남친 구해요 남친 구해요</p>
    </div>
  )
}

export function Stroke(props) {
  const cn = () => {
    if (props.type_1 === TYPE_ON_TEST && props.type_2 === '1') return `${styles.stroke} ${styles.stroke_onTest_bottom}`
    if (props.type_1 === TYPE_ON_TEST && props.type_2 === '2') return `${styles.stroke} ${styles.stroke_onTest_top}`
    if (props.type_1 === TYPE_MYPAGE && props.type_2 === '1') return `${styles.stroke} ${styles.stroke_myPage_bottm}`
    if (props.type_1 === TYPE_MYPAGE && props.type_2 === '2') return `${styles.stroke} ${styles.stroke_myPage_top}`
    return `${styles.stroke}`
  }

  return (
    <div className={cn()} />
  )
}

export function GoRandomStartBtn(props) {
  return (
    <Link to={props.url} className={styles.goRandomStartBtn}> {props.str} &gt; </Link>
  )
}
