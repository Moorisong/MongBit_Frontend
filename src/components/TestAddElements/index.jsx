import axios from 'axios';

import styles from './index.module.css';

export function InfoPart(props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <p>[테스트 Title]</p>
        <textarea
          onChange={(evt) => {
            props.onChange_s1_title(evt);
          }}
          cols="40"
          rows="4"
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[테스트 Content]</p>
        <textarea
          onChange={(evt) => {
            props.onChange_s1_content(evt);
          }}
          cols="40"
          rows="10"
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[테스트 Image]</p>
        <input
          onChange={(evt) => {
            props.onChange_s1_imageUrl(evt);
          }}
          type="file"
        />
      </div>

      <div className={`${styles.contentWrap} ${styles.stepWrap}`}>
        <button onClick={props.onClickMain}>메인</button>
        <button onClick={props.onClickNext}>다음</button>
      </div>
    </div>
  );
}

export function QuestionPart(props) {
  let resultObj = { index: props.idx };

  return (
    <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <p>{`[${props.idx} 번째 질문지]`}</p>
        <textarea
          onChange={(evt) => {
            resultObj.question = evt.target.value;
          }}
          cols="40"
          rows="5"
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[대답지 : +1]</p>
        <textarea
          onChange={(evt) => {
            resultObj.answerPlus = evt.target.value;
          }}
          cols="40"
          rows="5"
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[대답지 : -1]</p>
        <textarea
          onChange={(evt) => {
            resultObj.answerMinus = evt.target.value;
          }}
          cols="40"
          rows="5"
        ></textarea>
      </div>

      <div className={`${styles.contentWrap} ${styles.stepWrap}`}>
        <button onClick={props.onClickPrev}>뒤로</button>
        <button
          onClick={() => {
            const jsonString = JSON.stringify(resultObj);
            sessionStorage.setItem('mbTest', jsonString);
            props.onClickNext();
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export function ResultPart(props) {
  let resultObj = {};
  return (
    <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <p>{`[${props.idx} 번째 결과 Title]`}</p>
        <textarea
          onChange={(evt) => {
            resultObj.title = evt.target.value;
          }}
          cols="40"
          rows="3"
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[결과 MBTI]</p>
        <textarea
          onChange={(evt) => {
            resultObj.result = evt.target.value;
          }}
          cols="40"
          rows="1"
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[결과 Content]</p>
        <textarea
          onChange={(evt) => {
            resultObj.content = evt.target.value;
          }}
          cols="40"
          rows="7"
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[결과 Image]</p>
        <input
          onChange={(evt) => {
            const file = evt.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            axios
              .post('https://mongbit-willneiman.koyeb.app/upload', formData)
              .then((response) => {
                resultObj.imageUrl = response.data;
              })
              .catch((error) => {
                console.error(error);
              });
          }}
          type="file"
        />
      </div>
      <div className={`${styles.contentWrap} ${styles.stepWrap}`}>
        <button onClick={props.onClickPrev}>뒤로</button>
        <button
          onClick={() => {
            const jsonString = JSON.stringify(resultObj);
            sessionStorage.setItem('mbResult', jsonString);
            props.onClickNext();
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
