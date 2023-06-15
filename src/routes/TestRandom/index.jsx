import axios from 'axios';
import { useEffect } from 'react';

import { TestCard } from '../../components/TestCard';
import {
  CardButton,
  Stroke,
  GoRandomStartBtn,
  TestButton,
  AddCommentButton,
  Comment,
} from '../../components/ButtonSets';
import { TYPE_ON_TEST } from '../../constants/constant';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import styles from './index.module.css';


export default function TestRandom() {
  useEffect(()=>{
    axios.get
  }, [])
  return (
    <div className={styles.wrap}>
      {/* 네비게이션 바 */}
      <NavigationBar />
      {/* 테스트  */}
      <div className={styles.contentWrap}>
        <div>
          <TestCard
            thumbnailStr="나와 잘 맞는 MBTI"
            thumbnailClass="normal_thumbnail"
            titleBoxClass="normal_titleBox"
          />
          <CardButton btnType="playCnt" moveClass="button_onTest_right" />
        </div>
        <Stroke type_1={TYPE_ON_TEST} type_2="2" />
        <p className={styles.contentTextWrap}>
          대충 심리테스트에 대한 설명을 적는 공간 <br />
          대충 심리테스트에 대한 설명을 적는 공간
          <br />
          <br />
          대충 심리테스트에 대한 설명을 적는 공간
          <br />
          대충 심리테스트에 대한 설간대충 심리테스트에 대한 설명을 적는 공간
          <br />
          대충 심리테스트에심리테스트에 대한 설명을 적는 공간
        </p>
        <GoRandomStartBtn url="ksh" str="테스트 시작" />
        <ul className={styles.buttonSet}>
          <li>
            <TestButton btnType="bookMark" str="북마크" />
          </li>
          <li className={styles.likeWrap}>
            <TestButton btnType="like" str="재밌당" />
            <p className={styles.likeCntNum}>326</p>
          </li>
          <li>
            <TestButton btnType="share" str="공유하기" />
          </li>
        </ul>
        <Stroke type_1={TYPE_ON_TEST} type_2="1" />

        {/* 댓글 */}
        <CardButton btnType="comment" moveClass="comment_onTest" />

        <div className={styles.commentInputWrap}>
          <input
            type="text"
            className={styles.commentInput}
            placeholder="나쁜말 하면 신고합니다 ㅇㅅㅇ"
          />
          <AddCommentButton />
        </div>

        <div className={styles.commentWrap}>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
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
