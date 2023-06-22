import styles from './index.module.css';
import { Stroke } from '../ButtonSets';

export default function TestResult(props) {
  return (
    <div className={styles.resultWrap}>
      <img className={styles.resultImg} />
      <p>{[props.titleStr]}</p>
      <ul className={styles.resultStrList}>
        <li>
          <span>{props.contentStr}</span>
        </li>
      </ul>

      <Stroke />

      <div className={styles.buttonsWrap}>
        <div className={styles.partWrap}>
          <button className={styles.bookMarkBtn}></button>
          <p>북마크</p>
        </div>

        <div className={styles.retryWrap}>
          <div className={styles.retryDiv}>
            <p>다시 해보기</p>
          </div>
          <img src="/images/test/retryIcon.svg" alt="retry" />
        </div>

        <div className={styles.partWrap}>
          <button className={styles.likedBtn}></button>
          <p>재밌당</p>
          <p className={styles.likeCnt}>{props.likeCnt}</p>
        </div>
      </div>
      <button className={styles.shareBtn}>친구에게 테스트 공유하기</button>
    </div>
  );
}
