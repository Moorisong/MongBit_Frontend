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
    <div>
      <button className={`${styles.button} ${styles[props.btnType]}`}></button>
      <p>{props.str}</p>
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
      <p>이런 걸 만들다니 우리의 미래(혹은 조장의 머리)는 이미 박살난 게 아닐까요?</p>
    </div>
  )
}

export function Stroke(props) {
  return (
    <div className={`${styles[props.moveClass]} ${styles.stroke}`} />
  )
}

export function GoRandomStartBtn(props) {
  return (
    <Link to={props.url} className={styles.goRandomStartBtn}> {props.str} &gt; </Link>
  )
}

