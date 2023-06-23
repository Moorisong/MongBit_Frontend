import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';
import { InfoPart, QuestionPart, ResultPart } from '../TestAddElements';
import { ALL_FULLFILL } from '../../constants/constant';

export default function TestAdd() {
  const [data, setData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    questions: [],
    results: [],
  });
  const [isNext, setIsNext] = useState(true);
  const [stage, setStage] = useState(1);
  const [qstStageIdx, setQstStageIdx] = useState(1);
  const [rstStageIdx, setRstStageIdx] = useState(1);
  let [imgUploading, setImgUploading] = useState(false)
  let [testDone, setTestDone] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    if (testDone) {
      axios
        .post(
          `https://mongbit-willneiman.koyeb.app/api/v1/tests/test`,
          data
        )
        .then(() => {
          alert('완료');
          navigate('/main');
        });
    }
  }, [testDone])

  const mapTarget = {
    question: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  };

  function onClickNext() {
    switch (stage) {
      case 1:
        if (!data.title || !data.content || !data.imageUrl)
          return alert(ALL_FULLFILL);
        setStage(stage + 1);
        setIsNext(!isNext);
        break;
      case 2:
        setData((prev) => {
          let copy = [...prev.questions];
          const parsedObj = JSON.parse(sessionStorage.getItem('mbTest'));
          copy.push(parsedObj);
          sessionStorage.setItem('mbTest', '');
          return { ...prev, questions: copy };
        });

        setQstStageIdx(qstStageIdx + 1);
        setIsNext(!isNext);

        if (qstStageIdx === 12) {
          setStage(stage + 1);
        }
        break;
      case 3:
        setData((prev) => {
          let copy = [...prev.results];
          const parsedObj = JSON.parse(sessionStorage.getItem('mbResult'));
          copy.push(parsedObj);
          sessionStorage.setItem('mbResult', '');
          return { ...prev, results: copy };
        });
        setRstStageIdx(rstStageIdx + 1);
        setIsNext(!isNext);

        if (rstStageIdx === 16) setTestDone(true)
        break;
    }
  }

  function onChange_s1_title(evt) {
    setData((prev) => ({ ...prev, title: evt.target.value }));
  }

  function onChange_s1_content(evt) {
    setData((prev) => ({ ...prev, content: evt.target.value }));
  }

  function onChange_s1_imageUrl(evt) {
    setImgUploading(true)
    const file = evt.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('https://mongbit-willneiman.koyeb.app/upload', formData)
      .then((response) => {
        setData((prev) => ({ ...prev, imageUrl: response.data }));
        setImgUploading(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onClickPrev() {
    if (stage === 2 && qstStageIdx > 1) {
      return setQstStageIdx(qstStageIdx - 1);
    }
    setStage(stage - 1);
  }

  function onClickMain() {
    navigate('/main');
  }

  return (
    <div className={styles.resultWrap}>
      {stage === 1 && (
        <InfoPart
          data={data}
          onClickMain={onClickMain}
          onClickNext={onClickNext}
          onChange_s1_title={onChange_s1_title}
          onChange_s1_content={onChange_s1_content}
          onChange_s1_imageUrl={onChange_s1_imageUrl}
          imgUploading={imgUploading}
        />
      )}
      {stage === 2 &&
        mapTarget.question.map(
          (t, i) =>
            qstStageIdx === t && (
              <QuestionPart
                key={t}
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                idx={t}
                data={data.questions.length > 0 && data.questions[i]}
              />
            )
        )}
      {stage === 3 &&
        mapTarget.result.map(
          (t) =>
            rstStageIdx === t && (
              <ResultPart
                key={t}
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                idx={t}
              />
            )
        )}
    </div>
  );
}
