import styles from './index.module.css'
import { TYPE_LATEST_MAIN } from '../../constants/constant'

function TestCard(props) {

  const cn_1 = props.type === TYPE_LATEST_MAIN ? `${styles.marginLeft} ${styles.inline}` : `${styles.marginLeft}`
  const cn_2 = props.type === TYPE_LATEST_MAIN ? `${styles.latest_thumbnail}` : `${styles.normal_thumbnail}`
  const cn_3 = props.type === TYPE_LATEST_MAIN ? `${styles.latest_titleBox}` : `${styles.normal_titleBox}`

  return (
    <div className={cn_1}>
      <div className={cn_2} ></div>
      <div className={cn_3}>
        <span className={`${styles[props.textClass]}`}>{props.thumbnailStr}</span>
      </div>
    </div>
  )
}

export { TestCard }
