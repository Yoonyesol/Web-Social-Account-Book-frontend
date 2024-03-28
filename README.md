# 👨‍👨‍👦‍👦소셜 가계부
![creative-mockup-of-an-imac-standing-with-keyboard-and-mouse-a20680 - 복사본](https://github.com/Yoonyesol/Web-Social-Account-Book/assets/51500821/aa68b0d1-4f51-43f7-ac1b-f96cfbb70a37)

## 👀 소개글
> `소셜 가계부`는 나의 `수입/지출` 기록을 등록할 수 있는 기본 가계부 기능에 `게시판` 및 `챌린지` 기능을 더한 가계부 웹 어플리케이션입니다.   
> `게시판`을 이용해 재테크에 관심있는 사람들과 정보를 공유하고, `챌린지` 기능을 통해 이용자 간 지출 랭킹을 확인하며🔥 즐겁게 소비 관리를 할 수 있습니다.😆
​

<br/>


## 🚖 서비스 링크
https://social-account-book-frontend.vercel.app/
#### 🔐 테스트 계정
- ID: 112@naver.com
- PW: qwer1234


<br/>


## ⚙️ 기술 스택
### ✔️Frond-end
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

### ✔️Back-end
<img src="https://img.shields.io/badge/nodedotjs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

### ✔️DB
<img src="https://img.shields.io/badge/​mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
​

<br/>


## 🔮 기능 소개
### 1. 대시보드
<img src="https://github.com/Yoonyesol/Web-Social-Account-Book-frontend/assets/51500821/7165f181-e88e-4b60-aec7-8853711bd37b"  width="80%"/><br/> 
- 이번 달 예산, 총 지출, 총 수입을 확인할 수 있습니다.
- 지출 카테고리를 분석하여 원형 그래프 형식으로 제공합니다. 이번 달에 가장 많은 지출이 발생한 카테고리도 확인할 수 있습니다.
- 최근 1년 간 지출 기록을 그래프로 볼 수 있습니다. 전월 대비 금월의 지출 퍼센테이지(%)도 체크할 수 있습니다.
- 공감🧡을 누른 게시판 글을 모아서 볼 수 있습니다.
- 기본 정보(이름, 이메일)를 확인 가능한 설정 페이지로 바로 이동 가능합니다. 

### 2. 가계부
<img src="https://github.com/Yoonyesol/Web-Social-Account-Book-frontend/assets/51500821/9d8e6dc5-9c87-4c05-95e5-41302bbd36f5"  width="80%"/><br/> 
<img src="https://github.com/Yoonyesol/Web-Social-Account-Book-frontend/assets/51500821/7ea265c8-9463-4948-a271-4f0bdd4e0ec8"  width="80%"/><br/> 
- 나의 `수입/지출` 기록을 통해 돈의 흐름을 파악할 수 있습니다.
- 예산 수정 기능을 통해 이번 달 예산을 지정할 수 있습니다.

### 3. 챌린지
<img src="https://github.com/Yoonyesol/Web-Social-Account-Book-frontend/assets/51500821/ef8000a4-23e9-4de2-a06a-829282a8ba76"  width="80%"/><br/> 
- 매월 `예산 대비 지출`을 계산하여 전체 유저의 랭킹을 매깁니다.
- 비슷한 예산(±10%)을 가진 사용자들끼리의 지출 랭킹도 확인할 수 있습니다.
- 단, 이번 달 설정한 예산이 0원인 경우, 랭킹 서비스가 제공되지 않습니다!

### 4. 게시판
<img src="https://github.com/Yoonyesol/Web-Social-Account-Book-frontend/assets/51500821/770da358-a339-4fb7-885d-03049a53b67b"  width="80%"/><br/> 
- 게시판에 다른 사용자들과 공유하고 싶은 글을 등록할 수 있습니다.
- 게시글에 댓글을 달고 `공감` 버튼을 누를 수 있습니다.
- 얼마나 많은 사용자가 글을 조회했는지, `조회수`를 확인 가능합니다.
- 게시글을 작성한 유저가 아니라면 게시글을 수정 및 삭제할 수 없습니다.

### 5. 내 정보
<img src="https://github.com/Yoonyesol/Web-Social-Account-Book-frontend/assets/51500821/b885ab45-74d4-4ebb-b121-20a02094865f"  width="80%"/><br/> 
- 내 정보 페이지에서는 나의 정보(`이메일`, `이름`)을 확인할 수 있습니다.


<br/>


## 🎢 개발 기록
- **1차 개발** (2022.03.20 ~ 2022.06.06)
    - 프론트엔드 대시보드, 가계부, 게시판, 내 정보 페이지 및 핵심 CRUD 구현(백엔드와 연동x, 더미데이터 사용)
    - 스프링부트와 연동해 소셜 로그인 구현
    - node.js, socket.io 사용해 1:1 및 다대다 채팅 기능 구현

- **2차 개발** (2023.09.13 ~ 2024.03.15)
    - 불필요한 코드 정리 및 반복되는 코드 리팩토링
    - 폴더 구조 명시적으로 수정 (각 페이지마다 필요한 컴포넌트를 저장하도록 폴더 생성)
    - `ExpressJS`, `Node.js` 이용한 백엔드 API 개발 및 `MongoDB`를 이용한 NoSQL DB 구축
    - 프론트에서 `Axios`를 이용해 백엔드 API와 통신하여 사용자 데이터를 저장하고 불러오거나 수정, 삭제하도록 기능 구현 
    - 프론트엔드 대시보드, 가계부, 게시판, 챌린지, 내 정보 페이지 및 핵심 CRUD 구현 및 이전 페이지 전체적인 디자인 수정, 더미데이터 삭제
    - `Redux`를 이용해 프로젝트 전반에 필요한 데이터 전역 관리
    - `JWT`를 이용한 로그인, 회원가입 기능 구현
    - 스프링부트 소셜 로그인 구현 및 node.js 사용한 채팅 기능 삭제
    - 프론트: `vercel`, 백엔드: `Koyeb`을 이용한 배포
    - `CSS Media Query`를 이용해 페이지 모바일-태블릿-PC 모든 기기의 viewport와 호환 가능한 반응형 디자인 완성

- **3차 개발** (2024.03.15 ~ 진행중)
    - 반복되는 코드를 통합하는 리팩토링 진행중
    - JavaSctipt -> TypeScript 마이그레이션 진행중

<br/>


## 🔗 블로그
개발 기록을 남긴 블로그 링크: https://tinyurl.com/29vmsshy

<br/>


## 🙋‍♀️ 배운 점
#### 1차 개발
* API 사용 없이 리액트만을 이용한 CRUD 구현 방법을 익혔습니다.
* `node.js`, `socket.io`를 사용해 채팅 기능을 구현하는 법을 익혔습니다.

#### 2차 개발
* `ExpressJS`와 `Node.js`, `MongoDB`를 이용해 백엔드를 직접 구축해 보는 기회를 가졌습니다.
  * 프론트 개발자로서 백엔드 제작은 메인이 아니었지만 직접 하나의 프로젝트를 완성해 보는 과정에서 **데이터의 전송 방식이나 데이터 흐름** 등을 익힐 수 있는 시간이었습니다.
* api를 직접 만들어 보며 endpoint에 대한 개념을 익혔습니다. 또한 해당 api 엔드포인트에 접근해 `Axios`를 이용하여 데이터를 프론트엔드로 가져오거나 백엔드로 보내는 방식을 익혔습니다.
* 상태 관리 라이브러리 `Redux`를 공부하여 직접 프로젝트에서 적용해 보았습니다.
  * `dispatch`를 이용해 저장소 데이터를 수정했습니다. 
  * `useSelector`를 이용해 직접 저장소에서 데이터를 꺼내오는 방식으로 데이터를 전역적으로 관리하였습니다.
  * 이를 통해 1차 개발에서 발생했던 props drilling 현상을 제거할 수 있었습니다.

<br/>


## 🚩 개선점
#### 1차 개발
* 서버 구현 실패 👉 node.js를 이용한 서버 개발 또는 🔥Firebase를 사용해 백엔드 구현보다 프론트엔드에 집중하기
* 코드의 중복이 많고 효율이 떨어지는 코드가 다수 존재한다. 👉 코드 리팩토링
* 초기 구상했던 기능을 넣지 못했다. 👉 친구 초대 기능 혹은 아예 기능을 빼기 / 수입지출 캘린더

#### 2차 개발 (추후 개발할 기능)
* 중복되는 코드 제거 및 리팩토링
* TS 마이그레이션
* 데이터 패치 실패 시 로딩 강제 종료 구현 (현재는 정상적으로 데이터를 가져올 때까지 계속 로딩이 돌아감)
* 회원정보 수정 기능 (유저의 비밀번호, 이름 변경이 가능하도록 수정)
* 회원가입 시 이메일 인증
* 회원탈퇴 기능
* 가계부 캘린더
* 가계부 카테고리 직접 추가 및 수정, 삭제 기능
* 챌린지 이메일 공개 여부 사용자가 직접 선택할 수 있도록 기능 추가
* 유저 간 채팅 기능 추가 (기존 채팅 코드 재활용)
* 커뮤니티 게시글 검색 기능
* 커뮤니티 카테고리별/사용자별 게시글 모아보기 기능
* 커뮤니티 대댓글 기능
