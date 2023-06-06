import styles from './index.module.css'

function TitleWithText(props) {
  return (
    <>
      <p className={styles.title}>{props.title}</p>
      <p className={styles.content}>{props.content}</p>
    </>
  )
}

export { TitleWithText }
