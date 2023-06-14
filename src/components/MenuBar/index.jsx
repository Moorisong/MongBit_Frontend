import styles from './index.module.css';

export default function MenuBar(){
  return(
    <div className={cx(styles.modal, { [styles.modalMoveToRight]: menuClicked })}></div>
  )
}
