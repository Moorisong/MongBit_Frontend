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
  const cn_1 = props.likeState
    ? `${styles.button} ${styles.liked}`
    : `${styles.button} ${styles.noneLiked}`;
  const cn_2 = `${styles.button} ${styles[props.btnType]}`;
  return (
    <div className={styles.testBtnWrap}>
      <button className={props.btnType === 'like' ? cn_1 : cn_2}></button>
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

export function Comment(props) {
  return (
    <div className={styles.wrap}>
      <img
        src={localStorage.getItem('mongBitthumbnail')}
        className={`${styles.userImg}`}
      ></img>
      <div className={styles.userAndDate}>
        <div>
          <span>{props.data.username}</span>
          <span>{props.data.time}</span>
        </div>
        <p>{props.data.content}</p>
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
