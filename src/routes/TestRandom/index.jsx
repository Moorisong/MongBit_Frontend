import axios from 'axios';
import { useEffect, useState } from 'react';

import { TestCard } from '../../components/TestCard';
import {
  CardButton,
  Stroke,
  GoRandomStartBtn,
  TestButton,
  AddCommentButton,
  Comment,
} from '../../components/ButtonSets';
import {
  TYPE_ON_TEST,
  TYPE_COMMENT,
  TYPE_PLAY_CNT,
} from '../../constants/constant';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import styles from './index.module.css';

export default function TestRandom() {
  const [data, setData] = useState({
    thumbnailStr: '',
    playCnt: '',
    description: '',
    likeState: false,
    likeCnt: '',
    comment: [
      {
        username: '',
        content: '',
        time: '',
      },
    ],
  });

  const memberId = '64816274508d983852ec7de8';
  const testId = '648ad8ac4b746a3e1e258c58';

  useEffect(() => {
    axios
      .get(
        `https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/like/count`
      )
      .then((res) => {
        setData((prev) => ({ ...prev, likeCnt: res.data }));
      });

    axios
      .get(
        `https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/${memberId}/like`
      )
      .then((res) => {
        setData((prev) => ({ ...prev, likeState: res.data }));
      });

    // axios.get('https://mongbit-willneiman.koyeb.app/api/v1/test/comments',  { params: { "testId": "648ad8ac4b746a3e1e258c58" } })
    // .then((r)=>{
    //   console.log('테스트 중--전체 코멘트 조회---> ', r.data)
    // })
  }, []);

  console.log('data---> ', data);

  return (
    <div className={styles.wrap}>
      {/* 네비게이션 바 */}
      <NavigationBar />
      {/* 테스트  */}
      <div className={styles.contentWrap}>
        <div>
          <TestCard
            thumbnailStr={data.thumbnailStr}
            thumbnailClass="normal_thumbnail"
            titleBoxClass="normal_titleBox"
          />
          <CardButton
            type={TYPE_PLAY_CNT}
            moveClass="button_onTest_right"
            data={data.playCnt}
          />
        </div>
        <Stroke type_1={TYPE_ON_TEST} type_2="2" />
        <p className={styles.contentTextWrap}>{data.description}</p>
        <GoRandomStartBtn url="ksh" str="테스트 시작" />
        <ul className={styles.buttonSet}>
          <li>
            <TestButton btnType="bookMark" str="북마크" />
          </li>
          <li
            className={styles.likeWrap}
            onClick={() => {
              if (data.likeState) {
                axios.delete(
                  `https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/${memberId}/like`,
                  { params: { testId: testId, memberId: memberId } }
                );
                setData((prev) => ({ ...prev, likeCnt: prev.likeCnt - 1 }));
              } else {
                axios.post(
                  `https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/${memberId}/like`,
                  { testId: testId, memberId: memberId }
                );
                setData((prev) => ({ ...prev, likeCnt: prev.likeCnt + 1 }));
              }
              setData((prev) => ({ ...prev, likeState: !prev.likeState }));
            }}
          >
            <TestButton
              btnType="like"
              str="재밌당"
              likeState={data.likeState}
            />
            <p className={styles.likeCntNum}>{data.likeCnt}</p>
          </li>
          <li>
            <TestButton btnType="share" str="공유하기" />
          </li>
        </ul>
        <Stroke type_1={TYPE_ON_TEST} type_2="1" />

        {/* 댓글 */}
        <CardButton
          type={TYPE_COMMENT}
          moveClass={'comment_onTest'}
          data="김코순_2_테스트온 아래"
        />

        <div className={styles.commentInputWrap}>
          <input
            type="text"
            className={styles.commentInput}
            placeholder="나쁜말 하면 신고합니다 ㅇㅅㅇ"
          />
          <AddCommentButton />
        </div>

        <div className={styles.commentWrap}>
          {data.comment && <Comment data={data.comment[0]} />}
        </div>
      </div>
      <div className={styles.seeMoreWrap}>
        <button>더보기</button>
        <img src="/images/test/seeMoreIcon.svg" alt="see_more" />
      </div>
      <Footer type={TYPE_ON_TEST} />
    </div>
  );
}
