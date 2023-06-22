import cx from 'classnames';

import styles from './index.module.css';

export default function QuestionAndAnswer(props) {
  const barClassName = styles[`gaugeBar_${props.q_idx}`];
  return (
    <div
      className={cx(styles.wrap, {
        [styles.display_none]: false,
      })}
    >
      <div className={styles.progressWrap}>
        <div className={styles.barWrap}>
          <div></div>
          <div className={barClassName}></div>
        </div>
        <span>{`질문 ${props.q_idx} /`}</span>
        <span>12</span>
      </div>

      <div className={styles.questionWrap}>
        <p>{props.q_str}</p>
      </div>

      <div className={styles.answerWrap}>
        <div className={styles.answer} onClick={props.clickAnswer_plus}>
          <div>
            <span>{props.a_str_1}</span>
          </div>
        </div>

        <div className={styles.answer} onClick={props.clickAnswer_minus}>
          <div>
            <span>{props.a_str_2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
