import styles from './index.module.css'

function TestCard(props) {

  return (
    <div className={`${styles[props.marginClass]} ${styles[props.displayClass]}`}>
      <div className={styles[props.thumbnailClass]} ></div>
      <div className={styles[props.titleBoxClass]}>
        <span className={`${styles[props.textClass]}`}>{props.thumbnailStr}</span>
      </div>
    </div>
  )
}

export { TestCard }
