import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './index.module.css';
import { Stroke } from '../ButtonSets';

export default function TestResult(props) {
  // const [likeLoading, setLikeLoading] = useState(true);
  // const [likeChanged, setLikeChanged] = useState(true);
  // const [likeData, setLikeData] = useState({
  //   likeState: false,
  //   likeCnt: 0
  // })
  const memberId = sessionStorage.getItem('mongBitmemeberId')

  // useEffect(() => {
  //   const fetchLikeDataLogIned = async () => {
  //     try {
  //       const [stateResponse, cntResponse] = await Promise.all([
  //         axios.get(
  //           `https://mongbit-willneiman.koyeb.app/api/v1/test/${props.testId}/${memberId}/like`
  //         ),
  //         axios.get(
  //           `https://mongbit-willneiman.koyeb.app/api/v1/test/${props.testId}/like/count`
  //         ),
  //       ]);

  //       setLikeData((prev) => ({
  //         ...prev,
  //         likeState: stateResponse.data,
  //         likeCnt: cntResponse.data,
  //       }));
  //       setLikeLoading(false);
  //     } catch (err) {
  //       console.log('err--> ', err);
  //     }
  //   };
  //   fetchLikeDataLogIned()
  // }, [likeChanged])
  return (
    <div className={styles.resultWrap}>
      <img className={styles.resultImg} />
      <p>{[props.titleStr]}</p>
      <ul className={styles.resultStrList}>
        {props.contentStrArr.map((str, i) =>
          <li key={i}>
            <span>{str}</span>
          </li>
        )
        }
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
