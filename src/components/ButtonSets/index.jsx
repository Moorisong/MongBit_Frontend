import styles from './index.module.css'
import { Link } from 'react-router-dom'

function CardButton(props) {
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

function TestButton(props) {
  return (
    <div>
      <button className={`${styles.button} ${styles[props.btnType]}`}></button>
      <p>{props.str}</p>
    </div>
  )
}

function Stroke(props) {
  return (
    <div className={`${styles[props.moveClass]} ${styles.stroke}`} />
  )
}

function GoRandomStartBtn(props) {
  return (
    <Link to={props.url} className={styles.goRandomStartBtn}> {props.str} &gt; </Link>
  )
}

export { CardButton, Stroke, GoRandomStartBtn, TestButton }
