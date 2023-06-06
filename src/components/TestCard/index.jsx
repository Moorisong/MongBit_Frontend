import styles from './index.module.css'

function TestCard(props) {

  return (
    <div className={`${styles.wrap} ${styles[props.marginClass]} ${styles[props.displayClass]}`}>
      <div className = {styles[props.thumbnailClass]} ></div>
      <div className={styles[props.titleBoxClass]}>
        <span>{props.thumbnailStr}</span>
      </div>
    </div>
  )
}

export { TestCard }
