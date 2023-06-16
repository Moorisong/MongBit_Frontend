import { Link } from 'react-router-dom';

import {
  TYPE_ON_TEST,
  TYPE_MYPAGE,
  TYPE_COMMENT,
} from '../../constants/constant';
import styles from './index.module.css';

export function CardButton(props) {
  return (
    <div
      className={
        props.type === TYPE_COMMENT ? styles.wrap_comment : styles.wrap
      }
    >
      <button className={`${styles.button} ${styles[props.type]}`}></button>
      {props.type === TYPE_COMMENT || (
        <span className={`${styles.span} ${styles.count}`}>{props.data}</span>
      )}
      {props.type === TYPE_COMMENT && (
        <span className={`${styles.span_onTest} ${styles.commentText_onTest}`}>
          댓글
        </span>
      )}
      {props.type === TYPE_COMMENT && (
        <span className={`${styles.span_onTest} ${styles.commentText_onTest}`}>
          {props.data}
        </span>
      )}
    </div>
  );
}

export function TestButton(props) {
  return (
    <div className={styles.testBtnWrap}>
      <button className={`${styles.button} ${styles[props.btnType]}`}></button>
      <p className={styles.btnNameText}>{props.str}</p>
    </div>
  );
}

export function AddCommentButton() {
  return (
    <div className={styles.commentBtnWrap}>
      <button
        className={`${styles.button} ${styles.addCommentButton}`}
      ></button>
    </div>
  );
}

export function Comment() {
  return (
    <div className={styles.wrap}>
      <button className={`${styles.userImg}`}></button>
      <div className={styles.userAndDate}>
        <div>
          <span>김송현 · </span>
          <span>1일 전</span>
        </div>
        {/* <p>남친 구해요 남친 구해요 구해요 남친 구해요 구해요 남친 구해요 구해요 남친 구해요 구해요 남친 구해요 구니가먼데니게 이이이 해해ㅐ 한강 여여요 요요하자해요</p> */}
        <p>남친 구해요 남친 구해요요</p>
      </div>
    </div>
  );
}

export function Stroke(props) {
  const cn = () => {
    if (props.type_1 === TYPE_ON_TEST && props.type_2 === '1')
      return `${styles.stroke} ${styles.stroke_onTest_bottom}`;
    if (props.type_1 === TYPE_ON_TEST && props.type_2 === '2')
      return `${styles.stroke} ${styles.stroke_onTest_top}`;
    if (props.type_1 === TYPE_MYPAGE && props.type_2 === '1')
      return `${styles.stroke} ${styles.stroke_myPage_bottm}`;
    if (props.type_1 === TYPE_MYPAGE && props.type_2 === '2')
      return `${styles.stroke} ${styles.stroke_myPage_top}`;
    return `${styles.stroke}`;
  };

  return <div className={cn()} />;
}

export function GoRandomStartBtn(props) {
  return (
    <Link to={props.url} className={styles.goRandomStartBtn}>
      {' '}
      {props.str} &gt;{' '}
    </Link>
  );
}
