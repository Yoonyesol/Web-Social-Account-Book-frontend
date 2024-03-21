# 👨‍👨‍👦‍👦소셜 가계부
![creative-mockup-of-an-imac-standing-with-keyboard-and-mouse-a20680 - 복사본](https://github.com/Yoonyesol/Web-Social-Account-Book/assets/51500821/aa68b0d1-4f51-43f7-ac1b-f96cfbb70a37)

## 👀 소개글
> `소셜 가계부`는 나의 `수입/지출` 기록을 등록할 수 있는 기본 가계부 기능에 `게시판` 및 `챌린지` 기능을 더한 가계부 웹 어플리케이션입니다.   
> `게시판`을 이용해 재테크에 관심있는 사람들과 정보를 공유하고, `챌린지` 기능을 통해 이용자 간 지출 랭킹을 확인하며🔥 즐겁게 소비 관리를 할 수 있습니다.😆
​
<br/>


## 🚖 기능 소개
### 1. 대시보드
- 이번 달 예산, 총 지출, 총 수입을 확인할 수 있습니다.
- 지출 카테고리를 분석하여 원형 그래프 형식으로 제공합니다. 이번 달에 가장 많은 지출이 발생한 카테고리도 확인할 수 있습니다.
- 최근 1년 간 지출 기록을 그래프로 볼 수 있습니다. 전월 대비 금월의 지출 퍼센테이지(%)도 체크할 수 있습니다.
- 공감🧡을 누른 게시판 글을 모아서 볼 수 있습니다.
- 기본 정보(이름, 이메일)를 확인 가능한 설정 페이지로 바로 이동 가능합니다. 

### 2. 가계부
- 나의 `수입/지출` 기록을 통해 돈의 흐름을 파악할 수 있습니다.
- 예산 수정 기능을 통해 이번 달 예산을 지정할 수 있습니다.

### 3. 게시판
- 게시판에 다른 사용자들과 공유하고 싶은 글을 등록할 수 있습니다.
- 다른 사람이 남긴 글에 댓글을 달고 `공감` 버튼을 누를 수 있습니다.
- 얼마나 많은 사용자가 글을 조회했는지, `조회수`를 확인 가능합니다.

### 4. 챌린지
- 매월 `예산 대비 지출`을 계산하여 전체 유저의 랭킹을 매깁니다.
- 비슷한 예산(±10%)을 가진 사용자들끼리의 지출 랭킹도 확인할 수 있습니다.
- 단, 이번 달 설정한 예산이 0원인 경우, 랭킹 서비스가 제공되지 않습니다!

### 5. 내 정보
- 내 정보 페이지에서는 나의 정보(`이메일`, `이름`)을 확인할 수 있습니다.


<br/>


## 🎢 개발 기록
- **1차 개발** (2022.03.20 ~ 2022.06.06)
    - 프론트엔드 대시보드, 가계부, 게시판, 내 정보 페이지 및 핵심 CRUD 구현(백엔드와 연동x, 더미데이터 사용)
    - 스프링부트와 연동해 소셜 로그인 구현
    - node.js, socket.io 사용해 채팅 기능 구현

- **2차 개발** (2023.09.13 ~ 2024.03.15)
    - 불필요한 코드 정리 및 반복되는 코드 리팩토링
    - 폴더 구조 명시적으로 수정 (각 페이지마다 필요한 컴포넌트를 저장하도록 폴더 생성)
    - ExpressJS, Node.js 이용한 백엔드 API 개발 및 MongoDB를 이용한 NoSQL DB 구축 (프론트엔드에서 데이터를 가져올 백엔드를 구축하기 위해 chat GPT의 도움을 받아 구현)
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


​
## ⚙️ 기술 스택
### ✔️Frond-end
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

### ✔️Back-end
<img src="https://img.shields.io/badge/nodedotjs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

### ✔️DB
<img src="https://img.shields.io/badge/​mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
​

## 🎞 데모 영상

​
## 🔮 동작 화면
|||
|:---:|:---:|
|<img src="https://github.com/Yoonyesol/Web-Social-Account-Book/assets/51500821/f5f82c7c-e5fc-4b3a-ad55-0d483401b99c" width="400">|<img src="https://github.com/Yoonyesol/Web-Social-Account-Book/assets/51500821/f3458168-f1f5-46bc-bf33-f78a3a5128b9" width="400">|
|진입화면: 로그인/회원가입|메인화면: 대시보드|
|<img src="https://github.com/Yoonyesol/Web-Social-Account-Book/assets/51500821/99cc54af-95d9-47dc-ac7a-ee3114c093fb" width="400">|<img src="https://github.com/Yoonyesol/Web-Social-Account-Book/assets/51500821/4f379407-b2b9-49e0-9588-1319f8fd4149" width="400">|
|가계부|커뮤니티|
|<img src="https://github.com/Yoonyesol/Web-Social-Account-Book/assets/51500821/13639a27-a028-4a07-b693-f9eb557abbf2" width="400">|<img src="https://github.com/Yoonyesol/Web-Social-Account-Book/assets/51500821/8d2d9d62-c91b-4421-a792-befb4718c28f" width="400">|
|채팅|내 정보|

<br/>


## 🔗 개발 기록
개발 기록을 남긴 블로그 링크: https://tinyurl.com/29vmsshy

<br/>


## 🙋‍♀️ 배운 점
#### 2차 개발
* chat GPT의 도움을 받아 백엔드를 직접 구축해 보며 전체적인 웹의 동작방식을 익힐 수 있었습니다.
  * 백엔드 제작은 메인이 아니었지만 직접 하나의 프로젝트를 완성해 보는 과정에서 **데이터의 전송 방식이나 데이터 흐름** 등을 익힐 수 있는 시간이었습니다.
* api를 직접 만들어 보며 endpoint에 대한 개념을 익혔습니다. 또한 해당 api 엔드포인트에 접근해 `Axios`를 이용하여 데이터를 프론트엔드로 가져오거나 백엔드로 보내는 방식을 익혔습니다.
* `Redux`를 공부하여 직접 프로젝트에서 적용해 보았습니다.
  * `dispatch`를 이용해 저장소 데이터를 수정했습니다. 
  * `useSelector`를 이용해 직접 저장소에서 데이터를 꺼내오는 방식으로 데이터를 전역적으로 관리하였습니다.
  * 이를 통해 1차 개발에서 발생했던 props drilling 현상을 제거할 수 있었습니다.

<br/>


## 🚩 개선점
#### 1차 개발
* 서버 구현 실패 👉 node.js를 이용한 서버 개발 또는 🔥Firebase를 사용해 백엔드 구현보다 프론트엔드에 집중하기
* 코드의 중복이 많고 효율이 떨어지는 코드가 다수 존재한다. 👉 코드 리팩토링
* 초기 구상했던 기능을 넣지 못했다. 👉 친구 초대 기능 혹은 아예 기능을 빼기 / 수입지출 캘린더

#### 2차 개발



