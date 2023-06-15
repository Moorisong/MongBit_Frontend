import styles from './index.module.css';
import { TYPE_LATEST_MAIN, TYPE_MYPAGE } from '../../constants/constant';

function TestCard(props) {
  const cn_1 =
    props.type === TYPE_LATEST_MAIN || props.type === TYPE_MYPAGE
      ? `${styles.margin_1} ${styles.inline}`
      : `${styles.margin_1}`;
  const cn_2 =
    props.type === TYPE_LATEST_MAIN
      ? `${styles.latest_thumbnail}`
      : props.type === TYPE_MYPAGE
      ? `${styles.latest_thumbnail} ${styles.myPage}`
      : `${styles.normal_thumbnail}`;
  const cn_3 =
    props.type === TYPE_LATEST_MAIN
      ? `${styles.latest_titleBox}`
      : `${styles.normal_titleBox}`;

  return (
    <div className={cn_1}>
      <div className={cn_2}></div>
      {props.type === TYPE_MYPAGE || (
        <div className={cn_3}>
          <span className={`${styles[props.textClass]}`}>
            {props.thumbnailStr}
          </span>
        </div>
      )}
    </div>
  );
}

export { TestCard };
