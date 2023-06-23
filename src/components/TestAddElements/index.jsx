import axios from 'axios';
import { useState } from 'react';

import styles from './index.module.css';
import { ALL_FULLFILL } from '../../constants/constant';

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
          defaultValue={props.data.title}
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
          defaultValue={props.data.content}
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
        <button
          onClick={() => {
            if (props.imgUploading) return alert('업로드중');
            props.onClickNext();
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export function QuestionPart(props) {
  // const datas = props.data;
  let resultObj = { index: props.idx };
  // const initialState = props.data ? {index: props.idx, question: datas.question, answerPlus: datas.answerPlus, answerMinus: datas.answerMinus} : {index: props.idx}
  // const [resultObj, setResultObjt] = useState(initialState)
  return (
    <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <p>{`[${props.idx} 번째 질문지]`}</p>
        <textarea
          onChange={(evt) => {
            // setResultObjt((prev) => ({...prev, question: datas ? datas.question : evt.target.value}))
            resultObj.question = evt.target.value;
          }}
          cols="40"
          rows="5"
          // defaultValue={resultObj.question}
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[대답지 : +1 / E 속성]</p>
        <textarea
          onChange={(evt) => {
            // setResultObjt((prev) => ({...prev, answerPlus: datas ? datas.answerPlus : evt.target.value}))
            resultObj.answerPlus = evt.target.value;
          }}
          cols="40"
          rows="5"
          // defaultValue={props.data ? props.data.answerPlus : ''}
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[대답지 : -1 / I 속성]</p>
        <textarea
          onChange={(evt) => {
            // setResultObjt((prev) => ({...prev, answerMinus: datas ? datas.answerMinus : evt.target.value}))
            resultObj.answerMinus = evt.target.value;
          }}
          cols="40"
          rows="5"
          // defaultValue={datas ? props.data.answerMinus : ''}
        ></textarea>
      </div>

      <div className={`${styles.contentWrap} ${styles.stepWrap}`}>
        {/* <button onClick={props.onClickPrev}>뒤로</button> */}
        <button>뒤로</button>
        <button
          onClick={() => {
            if (
              !resultObj.question ||
              !resultObj.answerPlus ||
              !resultObj.answerMinus
            )
              return alert(ALL_FULLFILL);
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
  let [resultObj, setResultObj] = useState({
    result: '',
    contetn: '',
    imageUrl: '',
  });
  let [imgUploading, setImgUploading] = useState(false);
  return (
    <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <p>{`[${props.idx} 번째 결과 Title]`}</p>
        <textarea
          onChange={(evt) => {
            setResultObj((prev) => ({ ...prev, title: evt.target.value }));
          }}
          cols="40"
          rows="3"
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[결과 MBTI]</p>
        <textarea
          onChange={(evt) => {
            setResultObj((prev) => ({ ...prev, result: evt.target.value }));
          }}
          cols="40"
          rows="1"
        ></textarea>
      </div>

      <div className={styles.contentWrap}>
        <p>[결과 Content]</p>
        <textarea
          onChange={(evt) => {
            setResultObj((prev) => ({ ...prev, content: evt.target.value }));
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
            setImgUploading(true);

            axios
              .post('https://mongbit-willneiman.koyeb.app/upload', formData)
              .then((response) => {
                setResultObj((prev) => ({ ...prev, imageUrl: response.data }));
                setImgUploading(false);
              })
              .catch((error) => {
                console.error(error);
              });
          }}
          type="file"
        />
      </div>
      <div className={`${styles.contentWrap} ${styles.stepWrap}`}>
        {/* <button onClick={props.onClickPrev}>뒤로</button> */}
        <button>뒤로</button>
        <button
          onClick={() => {
            if (imgUploading) return alert('이미지 업로드 중입니다.');
            if (
              !resultObj.result ||
              !resultObj.content ||
              !resultObj.imageUrl
            ) {
              return alert(ALL_FULLFILL);
            }
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
