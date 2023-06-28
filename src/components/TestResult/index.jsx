import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import lottie from 'lottie-web';
import cx from 'classnames';

import styles from './index.module.css';
import CoupangAdv_1 from '../CoupangAdv_1';
import { Stroke, Comment, AddCommentButton } from '../ButtonSets';
import animationData_1 from './commentLoading.json';
import { TestButton, CardButton } from '../ButtonSets';
import {
  decodeToken,
  shareToKatalk_result,
  clearSessionStorage,
} from '../../util/util';
import {
  DOMAIN,
  TOKEN_NAME,
  DOMAIN_BE_PROD,
  DOMAIN_BE_DEV,
  TYPE_COMMENT,
} from '../../constants/constant';

export default function TestResult(props) {
  const [commentIndex, setCommentIndex] = useState([0, false]);
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentChanged, setCommentChanged] = useState(true);
  let [commentValue, setCommentValue] = useState('');
  const [commentCnt, setCommentCnt] = useState(0);
  let [commentSeeMoreLoading, setCommentSeeMoreLoading] = useState(false);
  let [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // const [likeLoading, setLikeLoading] = useState(true);
  const [likeChanged, setLikeChanged] = useState(true);
  let [linkCopyState, setLinkCopyState] = useState(false);
  let [isSubmittingLike, setIsSubmittingLike] = useState(false);

  const [slideIn, setSlideIn] = useState(false);
  const [likeData, setLikeData] = useState({
    likeState: false,
    likeCnt: 0,
  });

  let [data, setData] = useState({
    testId: props.testId,
    thumbnailStr: props.thumbnailStr,
    thumbnailUri: props.thumbnailUri,
    playCnt: props.playCnt,
    contentArr: props.contentStrArr,
    comment: [],
  });

  useEffect(() => {
    axios
      .get(
        `${DOMAIN_BE_DEV}/api/v1/test/comments/${data.testId}/page/${commentIndex[0]}`
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

  const memberId = sessionStorage.getItem('mongBitmemeberId');
  const resultPathName =
    location.pathname.indexOf('record') > -1
      ? location.pathname
      : `/record/${props.testId}/${props.testResultId}`;
  const navigate = useNavigate();
  const containerRef_1 = useRef(null);
  const containerRef_2 = useRef(null);

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
    const fetchLikeDataLogIned = async () => {
      try {
        const [stateResponse, cntResponse] = await Promise.all([
          axios.get(
            `${DOMAIN_BE_DEV}/api/v1/test/${props.testId}/${memberId}/like`
          ),
          axios.get(`${DOMAIN_BE_DEV}/api/v1/test/${props.testId}/like/count`),
        ]);

        setLikeData((prev) => ({
          ...prev,
          likeState: stateResponse.data,
          likeCnt: cntResponse.data,
        }));
        // setLikeLoading(false);
      } catch (err) {
        console.log('err--> ', err);
      }
    };

    const fetchLikeDataNoLogined = async () => {
      axios
        .get(`${DOMAIN_BE_DEV}/api/v1/test/${props.testId}/like/count`)
        .then((res) => {
          setLikeData((prev) => ({ ...prev, likeCnt: res.data }));
        });
      // setLikeLoading(false);
    };

    if (decodeToken().state) {
      fetchLikeDataLogIned();
    } else {
      fetchLikeDataNoLogined();
    }
  }, [likeChanged]);

  useEffect(() => {
    axios
      .get(`${DOMAIN_BE_DEV}/api/v1/test/${data.testId}/comments/count`)
      .then((res) => {
        setCommentCnt(res.data);
      });
  }, [commentChanged]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIn(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  function clickRetry() {
    navigate(`/test-preview/${props.testId}`);
  }

  async function clickLikeBtn() {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', location.pathname);
      return navigate('/login');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem(TOKEN_NAME),
    };

    axios
      .get(`${DOMAIN_BE_DEV}/api/v1/tokens/validity`, {
        headers,
      })
      .catch((err) => {
        if (
          err.response.status === 400 ||
          err.response.status === 401 ||
          err.response.status === 403
        ) {
          clearSessionStorage();
          sessionStorage.setItem('ngb', location.pathname);
          navigate('/login');
        }
      });

    if (isSubmittingLike) return;
    setIsSubmittingLike(true);

    if (likeData.likeState) {
      setLikeData((prev) => ({
        ...prev,
        likeState: false,
        likeCnt: prev.likeCnt - 1,
      }));
      await axios.delete(
        `${DOMAIN_BE_DEV}/api/v1/test/${props.testId}/${memberId}/like`
      );
      setLikeChanged(!likeChanged);
    } else {
      setLikeData((prev) => ({
        ...prev,
        likeState: true,
        likeCnt: prev.likeCnt + 1,
      }));
      await axios.post(
        `${DOMAIN_BE_DEV}/api/v1/test/${props.testId}/${memberId}/like`,
        { testId: props.testId, memberId: memberId }
      );
      setLikeChanged(!likeChanged);
    }
    setIsSubmittingLike(false);
  }

  async function addComment() {
    axios
      .post(`${DOMAIN_BE_DEV}/api/v1/test/comments`, {
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

  function clickTestShare() {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', location.pathname);
      return navigate('/login');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem(TOKEN_NAME),
    };

    axios
      .get(`${DOMAIN_BE_DEV}/api/v1/tokens/validity`, { headers })
      .catch((err) => {
        if (
          err.response.status === 400 ||
          err.response.status === 401 ||
          err.response.status === 403
        ) {
          clearSessionStorage();
          sessionStorage.setItem('ngb', location.pathname);
          navigate('/login');
        }
      });

    const likeCntNum =
      location.pathname.indexOf('result') > -1
        ? props.likeCnt
        : likeData.likeCnt;
    shareToKatalk_result(
      props.testId,
      props.titleStr,
      props.contentStrArr.join(),
      props.imgUri,
      resultPathName,
      likeCntNum
    );
  }

  function clickAddCommentBtn() {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', location.pathname);
      return navigate('/login');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem(TOKEN_NAME),
    };

    axios
      .get(`${DOMAIN_BE_DEV}/api/v1/tokens/validity`, { headers })
      .catch((err) => {
        if (
          err.response.status === 400 ||
          err.response.status === 401 ||
          err.response.status === 403
        ) {
          clearSessionStorage();
          sessionStorage.setItem('ngb', location.pathname);
          navigate('/login');
        }
      });

    if (!commentValue) return;
    setCommentValue('');
    addComment();
  }
  function clikeSeeMoreBtn() {
    setCommentSeeMoreLoading(true);
    axios
      .get(
        `${DOMAIN_BE_DEV}/api/v1/test/comments/${data.testId}/page/${commentIndex[0]}`
      )
      .then((res) => {
        let newArr = [...data.comment];
        res.data.commentDTOList.forEach((d) => {
          newArr.push(d);
        });
        setData((prev) => ({ ...prev, comment: newArr }));
        setCommentLoading(false);
        setCommentIndex([commentIndex[0] + 1, res.data.hasNextPage]);
        setCommentSeeMoreLoading(false);
      });
  }

  function addCommnetWithKey(evt) {
    if (evt.key === 'Enter') {
      if (!decodeToken().state) {
        sessionStorage.setItem('ngb', location.pathname);
        return navigate('/login');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem(TOKEN_NAME),
      };

      axios
        .get(`${DOMAIN_BE_DEV}/api/v1/tokens/validity`, { headers })
        .catch((err) => {
          if (
            err.response.status === 400 ||
            err.response.status === 401 ||
            err.response.status === 403
          ) {
            clearSessionStorage();
            sessionStorage.setItem('ngb', location.pathname);
            navigate('/login');
          }
        });

      if (!evt.currentTarget.value) return;

      setCommentValue('');
      setIsSubmittingComment(true);

      //댓글 추가 요청이 진행 중일때 추가로 등록하지 못하도록 조치함
      if (isSubmittingComment) return;
      addComment();
    }
  }

  function deleteCommnet(com) {
    axios
      .delete(`${DOMAIN_BE_DEV}/api/v1/test/comments/${com.id}`)
      .then(() => {
        setCommentIndex((prev) => [0, prev[1]]);
        setCommentChanged(!commentChanged);
      });
  }
  return (
    <div className={styles.resultWrap}>
      <img className={styles.resultImg} src={props.imgUri} />
      <p>{[props.titleStr]}</p>
      <ul className={styles.resultStrList}>
        {props.contentStrArr.map((str, i) => (
          <li key={i}>
            <span>{str}</span>
          </li>
        ))}
      </ul>

      <Stroke />

      <div className={styles.buttonsWrap}>
        <div className={styles.partWrap}>
          <div
            className={styles.linkCopyWrap}
            onClick={() => {
              setLinkCopyState(true);
            }}
          >
            <CopyToClipboard text={`${DOMAIN}${resultPathName}`}>
              <button
                className={
                  linkCopyState ? styles.linkCopied : styles.noneLinkCopied
                }
              ></button>
            </CopyToClipboard>
            <p>{linkCopyState ? '링크 복사됨' : '링크 복사'}</p>
          </div>
        </div>

        <div className={styles.retryWrap}>
          <div className={styles.retryDiv} onClick={clickRetry}>
            <p>다시 해보기</p>
          </div>
          <img src="/images/test/retryIcon.svg" alt="retry" />
        </div>

        <div className={styles.partWrap} onClick={clickLikeBtn}>
          <TestButton
            btnType="like"
            str="재밌당"
            likeState={likeData.likeState}
          />
          <p className={styles.likeCnt}>{likeData.likeCnt}</p>
        </div>
      </div>

      <div className={styles.coupangAdvWrap}>
        <CoupangAdv_1 />
      </div>
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
          onKeyDown={addCommnetWithKey}
        />
        <AddCommentButton onClick={clickAddCommentBtn} />
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
                    deleteCommnet(com);
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
      {commentIndex[1] && (
        <div className={styles.seeMoreWrap}>
          {commentSeeMoreLoading ? (
            <div className={styles.loadImgWrap_1}>
              <div ref={containerRef_1}></div>
            </div>
          ) : (
            <>
              <button onClick={clikeSeeMoreBtn}>더보기</button>
              <img src="/images/test/seeMoreIcon.svg" alt="see_more" />
            </>
          )}
        </div>
      )}

      <button
        className={cx(styles.shareBtn, {
          [styles.slideIn]: slideIn,
        })}
        onClick={clickTestShare}
      >
        친구에게 테스트 공유하기
      </button>
    </div>
  );
}
