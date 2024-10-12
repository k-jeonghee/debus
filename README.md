# Debus(디버스)

## Project Info

개발자 스터디 팀 매칭을 위한 오픈채팅 서비스

---

**배포**

[🚌 Debus에 탑승하세요!](https://debus-project.vercel.app/)

- 익명 로그인으로 가입 없이 테스트를 해보실 수 있습니다.
- 채팅방에 참여 인원이 1명일 때, 나가기를 하면 채팅방과 메시지가 모두 삭제됩니다.

---

**기간:** 2024.01 ~ 2024.06

**기여도:** 100%

**버전:** v1.1.0

**패키지매니저:** npm

**사용한 기술**

React, TypeScript, PostCSS, RadixUI, Jotai, TanStack-Query, React-Router-Dom, Firebase, Vercel

---

**자세히**

[🔗 프로젝트 알아보기](https://heeheehoho.notion.site/Debus-13d6dc51036b429e8bc2d5ed62288a97?pvs=4)

- 상세한 기획 배경 및 트러블 슈팅 기록은 위 링크에서 확인하실 수 있습니다.

### 필요성

현재 모각코 또는 스터디 팀 모집을 위한 과정들은 여러 플랫폼에 분산되어 있습니다. 모집글을 발행하고, 참여 의사가 있으면 이메일 또는 오픈채팅 링크를 통해 서로 소통하는 과정을 거치게 됩니다. 이를 하나의 플랫폼에서 제공하면 좋겠다는 생각으로 기획을 시작했습니다.

### **결과 요약**

핵심 기능인 익명으로 참여하는 오픈채팅을 구현했습니다. 현재는 Firebase의 한계로 추가적인 구현은 어려운 상황이지만, 프로젝트를 더 발전시키기 위한 기획을 보완 중입니다. 이와 동시에, 백엔드 개발자와 새로운 프로젝트를 진행하며, 이번 프로젝트에서 사용한 로직을 점진적으로 개선하고 부족한 부분을 채워 나가고 있습니다.

---

## 성능 최적화

- 성능 분석 도구: lighthouse
- 개선 성과: **LCP** **5.4**ms → **0.5**ms (▼ 4.7ms)
  1. LCP 개선을 통해 사용자 경험을 향상시키고, 전체 채팅방 목록과 같은 첫 번째 주요 콘텐츠를 더 빠르게 로드하여 페이지 초기 반응성 개선
  2. **CSR**에서의 **LCP** 최적화에는 한계가 있음을 경험하며, **SSR**의 필요성을 깨달음
- 주요 성능 개선 방법
  1. **Dynamic Import** 및 **Code Splitting**을 통해 필요한 컴포넌트만 로드, 불필요한 자원 낭비를 최소화하여 초기 로딩 시간 단축
  2. **@font-face** 규칙을 사용해 웹 폰트를 **woff2**로 최적화, **`swap`** 속성으로 폰트 로드 중에도 텍스트가 바로 표시되어 사용자 경험 개선

---

## 구현

### 전역 Modal 추상화

ContextAPI를 이용해 재사용성을 고려한 전역 모달 컴포넌트를 추상화했습니다. 프로젝트에 사용하고 있는 Jotai로 구현 후 ContextAPI로 리팩토링하며 10회가 넘는 리팩토링을 거쳤습니다. 컴포넌트, 커스텀 훅, Context의 역할을 명확히 분리하여 유지보수성과 확장성을 높였으며, 이 과정에서 모달의 비동기 처리와 상태 관리를 보다 일관성 있게 처리할 수 있었습니다.

**⚒️ 개선점**

모듈화된 컴포넌트들에 커스텀 CSS의 외부 주입을 충분히 고려하지 못한 점이 있었고, ModuleCSS와 classnames 라이브러리를 사용하면서 의존성이 높아지는 문제가 있어 이후 프로젝트에 개선하였습니다.

### Radix UI를 활용한 Toast 구현

응답이 필요하지 않는 단순 알람 역할로 RadixUI를 활용한 로직을 구현했습니다. Headless UI의 편리함이 좋았지만, 이 또한 모달과 비슷하게 라이브러리 의존성이 생겨 전체적인 CSS를 맞추지 않으면 일관성을 해칠 수 있다고 느꼈습니다.

### 실시간 데이터 동기화

Firebase의 RealTime Database를 이용하여 실시간 통신을 구현했습니다. Firebase가 제공하는 API는 비교적 간편하지만, 클라이언트에서 데이터 동기화를 안정적으로 처리하기 위해 여러 가지 고려 사항이 있었습니다. 특히, 비동기 데이터를 처리할 때 Suspense를 활용해 컴포넌트의 로딩 상태를 효율적으로 관리하였으며, 비동기 작업과 동기 렌더링 간의 상호작용을 최적화하기 위해 `startTransition`을 사용해 UI의 깜빡임을 해결했습니다. 또한, React Query의 refetch 메커니즘을 활용해 데이터 일관성을 유지하며, 통신 시 발생할 수 있는 지연을 최소화했습니다. 이 과정에서 클라이언트와 서버 간의 통신 속도를 개선하여 딜레이 없이 실시간 데이터를 처리할 수 있도록 최적화 했습니다.

---

## 미리보기

- light/dark 모드
- 실시간 데이터 동기화
  <p align="center">
    <img src="https://github.com/user-attachments/assets/8e0696cc-86a5-4307-9a3e-7ca8e268bb77" alt="sync">
  </p>

- 채팅방별 닉네임 설정
  <p align="center">
    <img src="https://github.com/user-attachments/assets/3a174539-b94a-43ce-9a0a-c4fe37760201" alt="nickname">
  </p>

- 사용자별 참여중인 채팅방 모아보기
  <p align="center">
    <img src="https://github.com/user-attachments/assets/e5fa1339-4e80-4b8a-befd-d5230547371d" alt="operation">
  </p>

- 비동기 처리가 가능한 전역 모달
  <p align="center">
    <img src="https://github.com/user-attachments/assets/39a9b0f5-dd9b-4835-9202-4fbc3e8612db" alt="modal1">
  </p>

- 마이페이지 정보 수정
  <p align="center">
    <img src="https://github.com/user-attachments/assets/42277e50-4eac-41ee-8561-c794c4f352e8" alt="mypage">
  </p>
