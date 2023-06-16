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
  const [data, setData] = useState({});
  useEffect(() => {
    // Axios --
    // 테스트용
    // const memberId = '64816274508d983852ec7de8';
    // const testId = '648ad8ac4b746a3e1e258c58';
    // axios.get(`https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/${memberId}/like`)
    //   .then((response) => {
    //     console.log('꿀---> ', response)
    //   })

    setData({
      thumbnailStr: '나와 잘 맞는 MBTI',
      playCnt: '김코순_2_테스트온 위',
      description: '설명설ㅇgggg명설명_김코순_완료',
      likeState: false,
      likeCnt: '154_김코순_완료',
      comment: [{
        username: '김코순_완료 ·',
        content: '남친 구해요 남친 구해요요_김코순_완료',
        time: '김코순_완료'
      }]
    });
  }, []);

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
          <li className={styles.likeWrap}>
            <TestButton btnType="like" str="재밌당" />
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
          {data.comment && <Comment data = {data.comment[0]}
          />}
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
