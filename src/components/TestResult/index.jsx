import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './index.module.css';
import { Stroke } from '../ButtonSets';
import { TestButton } from '../ButtonSets';
import { decodeToken, shareToKatalk_result } from '../../util/util';

export default function TestResult(props) {
  const [likeLoading, setLikeLoading] = useState(true);
  const [likeChanged, setLikeChanged] = useState(true);
  let [linkCopyState, setLinkCopyState] = useState(false);
  let [isSubmittingLike, setIsSubmittingLike] = useState(false);
  const [likeData, setLikeData] = useState({
    likeState: false,
    likeCnt: 0,
  });
  const memberId = sessionStorage.getItem('mongBitmemeberId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikeDataLogIned = async () => {
      try {
        const [stateResponse, cntResponse] = await Promise.all([
          axios.get(
            `https://mongbit-willneiman.koyeb.app/api/v1/test/${props.testId}/${memberId}/like`
          ),
          axios.get(
            `https://mongbit-willneiman.koyeb.app/api/v1/test/${props.testId}/like/count`
          ),
        ]);

        setLikeData((prev) => ({
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
            `https://mongbit-willneiman.koyeb.app/api/v1/test/${props.testId}/like/count`
          )
          .then((res) => {
            setLikeData((prev) => ({ ...prev, likeCnt: res.data }));
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

  function clickRetry() {
    navigate(`/test-preview/${props.testId}`);
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
            <CopyToClipboard
              text={`https://mong-bit-frontend.vercel.app${location.pathname}`}
            >
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

        <div
          className={styles.partWrap}
          onClick={async () => {
            if (!decodeToken().state) {
              sessionStorage.setItem('ngb', location.pathname);
              return navigate('/login');
            }

            if (isSubmittingLike) return;
            setIsSubmittingLike(true);

            if (likeData.likeState) {
              setLikeData((prev) => ({
                ...prev,
                likeState: false,
                likeCnt: prev.likeCnt - 1,
              }));
              await axios.delete(
                `https://mongbit-willneiman.koyeb.app/api/v1/test/${props.testId}/${memberId}/like`
              );
              setLikeChanged(!likeChanged);
            } else {
              setLikeData((prev) => ({
                ...prev,
                likeState: true,
                likeCnt: prev.likeCnt + 1,
              }));
              await axios.post(
                `https://mongbit-willneiman.koyeb.app/api/v1/test/${props.testId}/${memberId}/like`,
                { testId: props.testId, memberId: memberId }
              );
              setLikeChanged(!likeChanged);
            }
            setIsSubmittingLike(false);
          }}
        >
          <TestButton
            btnType="like"
            str="재밌당"
            likeState={likeData.likeState}
          />
          <p className={styles.likeCnt}>{likeData.likeCnt}</p>
        </div>
      </div>
      <button
        className={styles.shareBtn}
        onClick={() => {
          if (!decodeToken().state) {
            sessionStorage.setItem('ngb', location.pathname);
            return navigate('/login');
          }
          const likeCntNum =
            location.pathname.indexOf('result') > -1
              ? props.likeCnt
              : likeData.likeCnt;
          shareToKatalk_result(
            props.testId,
            props.titleStr,
            props.contentStrArr.join(),
            props.imgUri,
            location.pathname,
            likeCntNum
          );
        }}
      >
        친구에게 테스트 공유하기
      </button>
    </div>
  );
}
