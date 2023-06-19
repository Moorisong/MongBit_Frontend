import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { decodeToken } from '../../util/util';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import styles from './index.module.css';

export default function TestPreview() {
  const [data, setData] = useState({
    thumbnailStr: '',
    playCnt: '',
    description: '',
    likeState: false,
    likeCnt: '',
    comment: [],
  });

  const [likeLoading, setLikeLoading] = useState(true);
  const [likeChanged, setLikeChanged] = useState(true);
  const [commentIndex, setCommentIndex] = useState([0, false]);
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentChanged, setCommentChanged] = useState(true);
  let [commentValue, setCommentValue] = useState('');
  let [isSubmittingComment, setIsSubmittingComment] = useState(false);
  let [isSubmittingLike, setIsSubmittingLike] = useState(false);

  const navigate = useNavigate();

  const memberId = localStorage.getItem('mongBitmemeberId');
  const testId = '648ad8ac4b746a3e1e258c58';

  useEffect(() => {
    const fetchLikeDataLogIned = async () => {
      try {
        const [stateResponse, cntResponse] = await Promise.all([
          axios.get(
            `https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/${memberId}/like`
          ),
          axios.get(
            `https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/like/count`
          ),
        ]);

        setData((prev) => ({
          ...prev,
          likeState: stateResponse.data,
          likeCnt: cntResponse.data,
        }));
        setLikeLoading(false);
      } catch (err) {
        console.log('err--> ', err);
      }
    };

    const fetchLikeDataNoLogined = async () => {
      try {
        axios
          .get(
            `https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/like/count`
          )
          .then((res) => {
            setData((prev) => ({
              ...prev,
              likeCnt: res.data,
            }));
          });
        setLikeLoading(false);
      } catch (err) {
        console.log('err--> ', err);
      }
    };

    if (decodeToken().state) {
      fetchLikeDataLogIned();
    } else {
      fetchLikeDataNoLogined();
    }
  }, [likeChanged]);

  useEffect(() => {
    axios
      .get(
        `https://mongbit-willneiman.koyeb.app/api/v1/test/comments/${testId}/page/${commentIndex[0]}`
      )
      .then((res) => {
        setData((prev) => ({ ...prev, comment: res.data.commentDTOList }));
        setCommentLoading(false);
        setCommentIndex([commentIndex[0] + 1, res.data.hasNextPage]);
      });
  }, [commentChanged]);

  data.comment.sort(
    (a, b) => new Date(b.commentDate) - new Date(a.commentDate)
  );

  async function addComment() {
    await axios
      .post(`https://mongbit-willneiman.koyeb.app/api/v1/test/comment`, {
        memberId: localStorage.getItem('mongBitmemeberId'),
        testId: testId,
        content: commentValue,
      })
      .then((res) => {
        setCommentIndex([0, res.data.hasNextPage]);
        setCommentChanged(!commentChanged);
      });
    setIsSubmittingComment(false);
  }
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
          {likeLoading ? (
            <li className={styles.likeWrap}>
              <p>로딩중</p>
            </li>
          ) : (
            <li
              className={styles.likeWrap}
              onClick={async () => {
                if (!decodeToken().state) return navigate('/mypage');

                setIsSubmittingLike(true);
                if (isSubmittingLike) return;
                if (data.likeState) {
                  setData((prev) => ({
                    ...prev,
                    likeCnt: prev.likeCnt - 1,
                    likeState: false,
                  }));
                  await axios.delete(
                    `https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/${memberId}/like`
                  );
                  setLikeChanged(!likeChanged);
                } else {
                  setData((prev) => ({
                    ...prev,
                    likeCnt: prev.likeCnt + 1,
                    likeState: true,
                  }));
                  await axios.post(
                    `https://mongbit-willneiman.koyeb.app/api/v1/test/${testId}/${memberId}/like`,
                    { testId: testId, memberId: memberId }
                  );
                  setLikeChanged(!likeChanged);
                }
                setIsSubmittingLike(false);
              }}
            >
              <TestButton
                btnType="like"
                str="재밌당"
                likeState={data.likeState}
              />
              <p className={styles.likeCntNum}>{data.likeCnt}</p>
            </li>
          )}
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
            value={commentValue}
            className={styles.commentInput}
            placeholder="나쁜말 하면 신고합니다 ㅇㅅㅇ"
            onChange={(evt) => {
              setCommentValue(evt.currentTarget.value);
            }}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') {
                if (!decodeToken().state) return navigate('/mypage');
                if (commentValue.length > 150)
                  return alert('코멘트는 최대 150자까지만 작성할 수 있습니다.');

                setCommentValue('');
                setIsSubmittingComment(true);

                //댓글 추가 요청이 진행 중일때 추가로 등록하지 못하도록 조치함
                if (isSubmittingComment) return;
                addComment();
              }
            }}
          />
          <AddCommentButton
            onClick={() => {
              if (!decodeToken().state) return navigate('/mypage');
              if (!commentValue) return;
              if (commentValue.length > 150) return alert('글자수 150 넘음');
              setCommentValue('');
              addComment();
            }}
          />
        </div>

        <div className={styles.commentWrap}>
          {commentLoading ? (
            <p>로딩중</p>
          ) : (
            <>
              {data.comment.map((com, i) => (
                <div key={i} className={styles.commentContentWrap}>
                  <Comment
                    data={com}
                    deleteComment={() => {
                      axios
                        .delete(
                          `https://mongbit-willneiman.koyeb.app/api/v1/test/comment/${com.id}`
                        )
                        .then(() => {
                          setCommentChanged(!commentChanged);
                          setCommentIndex((prev) => [0, prev[1]]);
                        });
                    }}
                    modifyComment={() => {
                      setCommentChanged(!commentChanged);
                      setCommentIndex((prev) => [0, prev[1]]);
                    }}
                    oldCommVal={com.content}
                    memberId={memberId}
                    testId={testId}
                    id={com.id}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {commentIndex[1] && (
        <div className={styles.seeMoreWrap}>
          <button
            onClick={async () => {
              await axios
                .get(
                  `https://mongbit-willneiman.koyeb.app/api/v1/test/comments/${testId}/page/${commentIndex[0]}`
                )
                .then((res) => {
                  let newArr = [...data.comment];
                  res.data.commentDTOList.forEach((d) => {
                    newArr.push(d);
                  });
                  setData((prev) => ({ ...prev, comment: newArr }));
                  setCommentLoading(false);
                  setCommentIndex([commentIndex[0] + 1, res.data.hasNextPage]);
                });
            }}
          >
            더보기
          </button>
          <img src="/images/test/seeMoreIcon.svg" alt="see_more" />
        </div>
      )}
      <Footer type={TYPE_ON_TEST} />
    </div>
  );
}
