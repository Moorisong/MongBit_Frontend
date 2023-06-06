import styles from './index.module.css'
import { Link } from 'react-router-dom'

function CardButton(props) {
  return (
    <div className={`${styles.wrap} ${styles[props.moveRightClass]}`}>
      <button className={`${styles.button} ${styles[props.btnType]}`}></button>
      <span className={styles.count}>1,143</span>
    </div>
  )
}

function Stroke() {
  return (
    <div className={styles.stroke} />
  )
}

function GoRandomStartBtn(props) {
  return (
    <Link to={props.url} className={styles.goRandomStartBtn}> 아무거나 시작 &gt; </Link>
  )
}

export { CardButton, Stroke, GoRandomStartBtn }
