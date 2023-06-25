import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import cx from 'classnames';
import lottie from 'lottie-web';

import animationData_1 from './commentLoading.json';
import animationData_2 from './commentAreaLaoadingIcon.json';
import { TestCard } from '../TestCard';
import {
  CardButton,
  Stroke,
  GoRandomStartBtn,
  TestButton,
  AddCommentButton,
  Comment,
} from '../ButtonSets';
import {
  TYPE_ON_TEST,
  TYPE_COMMENT,
  TYPE_PLAY_CNT,
} from '../../constants/constant';
import { decodeToken, handleCopyLink, shareToKatalk } from '../../util/util';
import styles from './index.module.css';

export default function TestPreview(props) {
  let [data, setData] = useState({
    testId: props.testId,
    thumbnailStr: props.thumbnailStr,
    thumbnailUri: props.thumbnailUri,
    playCnt: props.playCnt,
    conentArr: props.description.split('<br>'),
    likeState: false,
    likeCnt: 0,
    comment: [],
  });
  let [linkCopyState, setLinkCopyState] = useState(false);

  const [likeLoading, setLikeLoading] = useState(true);
  const [likeChanged, setLikeChanged] = useState(true);
  const [commentIndex, setCommentIndex] = useState([0, false]);
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentChanged, setCommentChanged] = useState(true);
  let [commentValue, setCommentValue] = useState('');
  let [isSubmittingComment, setIsSubmittingComment] = useState(false);
  let [isSubmittingLike, setIsSubmittingLike] = useState(false);
  const [commentCnt, setCommentCnt] = useState(0);
  let [commentSeeMoreLoading, setCommentSeeMoreLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const containerRef_1 = useRef(null);
  const containerRef_2 = useRef(null);

  const memberId = sessionStorage.getItem('mongBitmemeberId');

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef_1.current,
      renderer: 'svg',
      animationData: animationData_1,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, [commentSeeMoreLoading]);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef_2.current,
      renderer: 'svg',
      animationData: animationData_2,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, [commentLoading]);

  useEffect(() => {
    axios
      .get(
        `https://mongbit-willneiman.koyeb.app/api/v1/test/${data.testId}/comments/count`
      )
      .then((res) => {
        setCommentCnt(res.data);
      });
  }, [commentChanged]);

  useEffect(() => {
    const fetchLikeDataLogIned = async () => {
      try {
        const [stateResponse, cntResponse] = await Promise.all([
          axios.get(
            `https://mongbit-willneiman.koyeb.app/api/v1/test/${data.testId}/${memberId}/like`
          ),
          axios.get(
            `https://mongbit-willneiman.koyeb.app/api/v1/test/${data.testId}/like/count`
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
            `https://mongbit-willneiman.koyeb.app/api/v1/test/${data.testId}/like/count`
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
        `https://mongbit-willneiman.koyeb.app/api/v1/test/comments/${data.testId}/page/${commentIndex[0]}`
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
      .post(`https://mongbit-willneiman.koyeb.app/api/v1/test/comments`, {
        memberId: sessionStorage.getItem('mongBitmemeberId'),
        testId: data.testId,
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
      {/* 테스트  */}
      <div className={styles.contentWrap}>
        <div>
          <TestCard
            thumbnailStr={data.thumbnailStr}
            thumbnailUri={data.thumbnailUri}
            thumbnailClass="normal_thumbnail"
            titleBoxClass="normal_titleBox"
            testId={data.testId}
          />
          <CardButton type={TYPE_PLAY_CNT} data={data.playCnt} />
        </div>
        <Stroke type_1={TYPE_ON_TEST} type_2="2" />

        <ul className={styles.contentUl}>
          {data.conentArr.map((str, i) => (
            <li key={i}>
              <p>{str}</p>
            </li>
          ))}
        </ul>
        <GoRandomStartBtn url={`/test-on/${data.testId}`} str="테스트 시작" />
        <ul className={styles.buttonSet}>
          <li
            onClick={() => {
              handleCopyLink(
                `https://mong-bit-frontend.vercel.app${location.pathname}`
              );
              setLinkCopyState(true);
            }}
          >
            <TestButton
              btnType="linkCopy"
              str={linkCopyState ? '링크 복사됨' : '링크 복사'}
              linkCopyState={linkCopyState}
            />
            {/* {
              linkCopyState &&
              <div>
                <input readOnly defaultValue={`https://mong-bit-frontend.vercel.app${location.pathname}`} />
              </div>
            } */}
          </li>
          {likeLoading ? (
            <li className={styles.likeWrap}>
              <p>로딩중</p>
            </li>
          ) : (
            <li
              className={styles.likeWrap}
              onClick={async () => {
                if (!decodeToken().state) {
                  sessionStorage.setItem('ngb', location.pathname);
                  return navigate('/login');
                }

                setIsSubmittingLike(true);
                if (isSubmittingLike) return;
                if (data.likeState) {
                  setData((prev) => ({
                    ...prev,
                    likeCnt: prev.likeCnt - 1,
                    likeState: false,
                  }));
                  await axios.delete(
                    `https://mongbit-willneiman.koyeb.app/api/v1/test/${data.testId}/${memberId}/like`
                  );
                  setLikeChanged(!likeChanged);
                } else {
                  setData((prev) => ({
                    ...prev,
                    likeCnt: prev.likeCnt + 1,
                    likeState: true,
                  }));
                  await axios.post(
                    `https://mongbit-willneiman.koyeb.app/api/v1/test/${data.testId}/${memberId}/like`,
                    { testId: data.testId, memberId: memberId }
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
          <li
            onClick={() => {
              if (!decodeToken().state) {
                sessionStorage.setItem('ngb', location.pathname);
                return navigate('/login');
              }
              shareToKatalk(
                data.testId,
                data.thumbnailStr,
                data.conentArr.join(),
                data.thumbnailUri
              );
            }}
          >
            <TestButton btnType="share" str="공유하기" />
          </li>
        </ul>
        <Stroke type_1={TYPE_ON_TEST} type_2="1" />

        {/* 댓글 */}
        <CardButton type={TYPE_COMMENT} data={commentCnt} />

        <div className={styles.commentInputWrap}>
          <span
            className={styles.charsLimit}
          >{`${commentValue.length} / 100`}</span>
          <input
            maxLength="100"
            type="text"
            value={commentValue}
            className={cx(styles.commentInput, {
              [styles.modifyInputBoderBottomRed]: commentValue.length >= 100,
            })}
            placeholder="나쁜말 하면 신고합니다 ㅇㅅㅇ"
            onChange={(evt) => {
              setCommentValue(evt.currentTarget.value);
            }}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') {
                if (!decodeToken().state) {
                  sessionStorage.setItem('ngb', location.pathname);
                  return navigate('/login');
                }
                if (!evt.currentTarget.value) return;

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
              if (!decodeToken().state) return navigate('/login');
              if (!commentValue) return;
              setCommentValue('');
              addComment();
            }}
          />
        </div>

        <div className={styles.commentWrap}>
          {commentLoading ? (
            <div className={styles.loadImgWrap_2}>
              <div ref={containerRef_2}></div>
            </div>
          ) : (
            <>
              {data.comment.map((com, i) => (
                <div key={i} className={styles.commentContentWrap}>
                  <Comment
                    data={com}
                    deleteComment={() => {
                      axios
                        .delete(
                          `https://mongbit-willneiman.koyeb.app/api/v1/test/comments/${com.id}`
                        )
                        .then(() => {
                          setCommentIndex((prev) => [0, prev[1]]);
                          setCommentChanged(!commentChanged);
                        });
                    }}
                    modifyComment={() => {
                      setCommentIndex((prev) => [0, prev[1]]);
                      setCommentChanged(!commentChanged);
                    }}
                    memberId={memberId}
                    testId={data.testId}
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
          {commentSeeMoreLoading ? (
            <div className={styles.loadImgWrap_1}>
              <div ref={containerRef_1}></div>
            </div>
          ) : (
            <>
              <button
                onClick={async () => {
                  setCommentSeeMoreLoading(true);
                  await axios
                    .get(
                      `https://mongbit-willneiman.koyeb.app/api/v1/test/comments/${data.testId}/page/${commentIndex[0]}`
                    )
                    .then((res) => {
                      let newArr = [...data.comment];
                      res.data.commentDTOList.forEach((d) => {
                        newArr.push(d);
                      });
                      setData((prev) => ({ ...prev, comment: newArr }));
                      setCommentLoading(false);
                      setCommentIndex([
                        commentIndex[0] + 1,
                        res.data.hasNextPage,
                      ]);
                      setCommentSeeMoreLoading(false);
                    });
                }}
              >
                더보기
              </button>
              <img src="/images/test/seeMoreIcon.svg" alt="see_more" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
