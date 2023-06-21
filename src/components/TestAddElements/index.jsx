import styles from './index.module.css';

export function InfoPart() {
  return (
    <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <p>[테스트 ID]</p>
        <textarea cols="40" rows="5"></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[테스트 Title]</p>
        <textarea cols="40" rows="5"></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[테스트 Content]</p>
        <textarea cols="40" rows="5"></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[테스트 Image]</p>
        <input type="file" />
      </div>

      <div className={`${styles.contentWrap} ${styles.stepWrap}`}>
        <button>뒤로</button>
        <button>다음</button>
      </div>
    </div>
  );
}

export function QuestionPart(props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <p>{`${props.idx} 번째 질문지`}</p>
        <textarea cols="40" rows="5"></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>대답지 : +1</p>
        <textarea cols="40" rows="5"></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>대답지 : -1</p>
        <textarea cols="40" rows="5"></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>MBTI 속성</p>
        <textarea cols="40" rows="2"></textarea>
      </div>

      <div className={`${styles.contentWrap} ${styles.stepWrap}`}>
        <button>뒤로</button>
        <button>다음</button>
      </div>
    </div>
  );
}

export function ResultPart() {
  return (
    <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <p>결과 Title</p>
        <textarea cols="40" rows="5"></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>결과 Content</p>
        <textarea cols="40" rows="5"></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>결과 Image</p>
        <input type="file" />
      </div>
      <div className={`${styles.contentWrap} ${styles.stepWrap}`}>
        <button>뒤로</button>
        <button>다음</button>
      </div>
    </div>
  );
}
