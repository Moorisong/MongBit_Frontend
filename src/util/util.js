import jwtDecode from 'jwt-decode';

import { DOMAIN, TOKEN_NAME } from '../constants/constant';

export function decodeToken() {
  if (!sessionStorage.getItem(TOKEN_NAME)) {
    return {
      state: false,
    };
  }
  const token = sessionStorage.getItem(TOKEN_NAME);
  const decodedToken = jwtDecode(token);

  const expiration = decodedToken.exp;
  const expirationTime = new Date(expiration * 1000);
  const currentTime = new Date();

  // console.log('decoded-----> ', decodedToken)
  if (expirationTime < currentTime) {
    return {
      state: false,
    };
  } else {
    return {
      state: true,
      role: decodedToken.auth,
    };
  }
}

export function formatTimeDifference(dateString) {
  const currentDate = new Date();
  let targetDate = new Date(dateString);
  targetDate.setHours(targetDate.getHours() + 9);

  const timeDiff = Math.abs(currentDate - targetDate);
  const diffMinutes = Math.floor(timeDiff / (1000 * 60)); // ms를 분 단위로 변환

  if (diffMinutes < 60) {
    if (diffMinutes === 0) return `방금 전`;
    return `${diffMinutes}분 전`;
  } else if (diffMinutes < 24 * 60) {
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}시간 전`;
  } else if (diffMinutes < 24 * 60 * 7) {
    const diffDays = Math.floor(diffMinutes / (60 * 24));
    return `${diffDays}일 전`;
  } else if (diffMinutes < 24 * 60 * 30) {
    const diffWeeks = Math.floor(diffMinutes / (60 * 24 * 7));
    return `${diffWeeks}주 전`;
  } else if (diffMinutes < 24 * 60 * 30 * 12) {
    const diffMonths = Math.floor(diffMinutes / (60 * 24 * 30));
    return `${diffMonths}개월 전`;
  } else {
    const diffYears = Math.floor(diffMinutes / (60 * 24 * 30 * 12));
    return `${diffYears}년 전`;
  }
}

export function shareToKatalk(testId, title, description, testImgUri) {
  if (!window.Kakao.isInitialized())
    window.Kakao.init('ca73594b776443da06b27edae4131915');
  window.Kakao.Share.sendDefault({
    objectType: 'list',
    headerTitle: '몽빗 테스트 공유해요 :)',
    headerLink: {
      // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
      mobileWebUrl: DOMAIN,
      webUrl: DOMAIN,
    },
    contents: [
      {
        title: '몽빗(MongBit)',
        description: 'MBTI 심테 공작소',
        imageUrl: 'https://i.ibb.co/cFBf09g/share-logo.png',
        link: {
          mobileWebUrl: DOMAIN,
          webUrl: DOMAIN,
        },
      },
      {
        title: title,
        description: description,
        imageUrl: testImgUri,
        link: {
          mobileWebUrl: `${DOMAIN}/test-preview/${testId}`,
          webUrl: `${DOMAIN}/test-preview/${testId}`,
        },
      },
    ],
    buttons: [
      {
        title: '테스트 하러 가기',
        link: {
          mobileWebUrl: `${DOMAIN}/test-preview/${testId}`,
          webUrl: `${DOMAIN}/test-preview/${testId}`,
        },
      },
    ],
  });
}

export function shareToKatalk_result(
  testId,
  title,
  description,
  resultImgUri,
  pathName,
  likeCnt
) {
  if (!window.Kakao.isInitialized())
    window.Kakao.init('ca73594b776443da06b27edae4131915');

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '몽빗 테스트 결과 공유해요 :)',
      description: title,
      imageUrl: resultImgUri,
      link: {
        // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
        mobileWebUrl: `${DOMAIN}${pathName}`,
        webUrl: `${DOMAIN}${pathName}`,
      },
    },
    social: {
      likeCount: likeCnt,
    },
    buttons: [
      {
        title: '테스트 하기',
        link: {
          mobileWebUrl: `${DOMAIN}/test-preview/${testId}`,
          webUrl: `${DOMAIN}/test-preview/${testId}`,
        },
      },
      {
        title: '결과 보기',
        link: {
          mobileWebUrl: `${DOMAIN}${pathName}`,
          webUrl: `${DOMAIN}${pathName}`,
        },
      },
    ],
  });
}
