## 몽빗(MongBit)

### MBTI 심리테스트 서비스
- https://mongbit.vercel.app/


**사용한 기술**

- **FrontEnd**: React.js, React Router Dom, Classnames, Recoil, OAuth2, Axios/Fetch, Lottie-web
- **BackEnd**: Java, Spring Boot, Spring MVC,  Spring Data, MongoDB Atlas, Spring Security, OAuth2, 
JSON Web Token, REST API
- **Database**: MongoDB, MongoDB Atlas
- **Cloud**: AWS(EC2)

**팀원** : 백엔드 3명, 프론트엔드 1명

**프로젝트 정보 및 프론트엔드 기능 내용(기여도 100%)**
- MBTI를 기반으로 한 심리 테스트를 제공하는 웹사이트
- 웹이지만 모바일 화면에 최적화된 Width 고정 → 반응형 작업 진행(CSS Media Query)
- JWT 토큰 복호화로 로그인 상태 관리
- Kakao SDK 설치 후 소셜 로그인 및 공유하기 기능 구현
- 테스트 좋아요 추가/삭제 기능 구현
- 댓글 등록,수정,삭제 및 더보기 기능 구현
- 관리자가 테스트를 추가할 수 있도록 어드민 페이지 구현
  (테스트 내용, 테스트 이미지 등 추가 후 병렬로 비동기 요청이 이루어지도록 구현하여 가독성을 높임, Promise.all 활용)
- 쿠팡 파트너스 광고 배너 추가 및 쿠팡 사이트 접속 유도 기능 구현(24시간에 한번씩 접속하도록 함)
- 그에 따른 다양한 이벤트 핸들러(popState 등) 사용
- 익셉션 페이지 기획 및 라우트 설정
- 세션 스토리지, 로컬 스토리지, Recoil 등을 활용하여 데이터 관리 및 사용

🔸 **목표와 성과** 🔸

- 프로젝트 기획때부터 우리의 목표는 ‘수익 창출’이었습니다. 
- 도메인 비용만큼이라도 수익을 내는 것을 목표로 쿠팡 파트너스를 선택하여 개발했습니다. 
- 오로지 비즈니스적인 관점에서의 이익을 기준으로 판단하여 핵심 기능만을 기획하였습니다.

<br><br>

**프로젝트 마감 +2일차 수익**
    
![image](https://github.com/Moorisong/MongBit_Frontend/assets/64249489/e57d551e-64db-4492-aa7c-d4c7731eaec0)

<br><br>

**프로젝트 마감 +3일차 수익**
![image](https://github.com/Moorisong/MongBit_Frontend/assets/64249489/a1d491c3-945d-44d8-940c-43fc84e3a81a)

    
### 💬 기획부터 세상에 배포되기까지

- 기획을 담당한 팀원의 의도에 맞게 퍼블리싱 함

**[[Figma 링크로 이동하기]](https://www.figma.com/file/C9D4w9U6uKwewR5MqdYBIA/Mongbit?type=design&node-id=0-1&mode=design&t=pgXaWRiFtG02vgom-0) :** 링크로 이동하면 목업 테스트도 가능합니다.

![image](https://github.com/Moorisong/MongBit_Frontend/assets/64249489/20c5dd69-dcde-4729-a7c5-44c77deab147)


### - 핵심 기능

```markdown
기능 1. Kakao OAuth 로그인 구현
👉 번거로운 회원 가입 진행보다는 소셜 로그인으로 사용자의 편리성을 높임
👉 Kakao Developers 플랫폼 등록 및 앱키 발급받음
👉 Kakao OAuth 인증 코드를 URL을 통하여 반환받음 -> 로그인 처리를 위해 API 호출하여 요청함

기능 2. Kakao 공유하기 구현
👉 Kakao에서 제공하는 오픈 그래픽 기능과 템플릿을 활용하여 두가지 공유하기 구현(테스트 공유, 테스트 결과 공유)

기능 3. 댓글, 테스트 목록/결과 더보기 구현
👉 '더보기' 버튼을 눌렀을때 10개씩 페이징 처리된 데이터를 요청하여 State 값을 동적으로 업데이트 함 

기능 4. Admin 페이지 테스트 추가 기능 구현
👉 하나의 테스트를 만들기 위해 필요한 모든 데이터를 받아서 가공한 후에 마지막에 요청함
👉 테스트 인포 1개, 테스트 질문지 12개, 테스트 결과지 16개의 페이지를 처리 
👉 가장 까다로웠고 고민이 많았던 기능 -> 시간 소요가 있었음

기능 5. 각종 Router 관련 처리
👉 특정 상황에서 뒤로 가기 하였을때 원하는 페이지로 이동시키기 위한 고민,
👉 익셉션 페이지로 이동시켜야 하는 상황이 발생함
👉 브라우저 History 객체 Stack을 핸들링하기 위해 Router.replace 등을 활용하여 해결함
```

### - 목표를 이루었는가?

3주 데드 라인 지키기, 광고로 수익 내기
이 두가지 목표를 달성한 것이 고무적이라고 생각합니다. 

하지만 오직 저 두가지 목표에만 신경썼기에 놓친 부분들도 있다고 생각됩니다.<br>
**버전 1.0 배포에 만족하지 않고 꾸준히 유지 보수를 진행하면서 서비스를 개선시키고 있습니다.**

### - 아쉬운 점

- 기한 맞추기에 급급한 나머지 코드 관리에 신경쓰지 못해서 개선해야할 점들이 많습니다.
- CSR 구조 특성 상 SEO 최적화는 힘들다는 것을 알게되었습니다.
- Next.js 로 마이그레이션하여 SSR 구조에서 SEO 최적화를 진행하기로 했습니다.
   - https://github.com/Moorisong/MongBit_FE_Next
