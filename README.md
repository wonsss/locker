# 사물함 배정

## 기능 구현 목록

- 홈(/home)
  - [x] `새롭게 사물함 배정하기` 버튼을 클릭할 수 있다. 클릭 시, `/name` 경로로 이동한다.
  - [x] 기존에 배정된 사물함 배정 결과를 확인 및 삭제할 수 있다.
  - [x] 저장된 이름 목록을 확인 및 삭제할 수 있다.
  - [x] 저장된 사물함 목록을 확인 및 삭제할 수 있다.
- 이름(/name)
  - [x] 배정할 이름들의 목록을 띄어쓰기하여 입력하면, `공백`을 기준으로 구분하여 배열로 읽히며, 동시에 렌더링된다.
  - [x] 목록의 제목을 입력 후, `다음` 버튼을 누르면 `/locker` 경로로 이동한다.
  - [x] 입력한 이름의 목록은 `로컬스토리지`에 자동으로 저장된다.
  - [x] 이름 목록 선택칸에 `로컬스토리지`에 저장된 데이터가 표시된다.
  - [x] 선택한 이름 목록을 `로컬스토리지`에서 삭제할 수 있다.
- 사물함(/locker)
  - [x] 사물함의 사이즈(세로 개수, 가로 개수)와 사물함명을 입력하면, 동시에 예상 사물함이 렌더링된다.
  - [x] 사물함의 제목을 입력 후, `랜덤으로 배정하기` 버튼을 누르면 `/result` 경로로 이동한다.
  - [x] 입력한 사물함의 사이즈는 `로컬스토리지`에 자동으로 저장된다.
  - [x] 사물함 사이즈 선택칸에 `로컬스토리지`에 저장된 데이터가 표시된다.
  - [x] 선택한 사물함을 `로컬스토리지`에서 삭제할 수 있다.
- 랜덤 배정(/result)
  - [x] 사물함이 랜덤으로 배정되어 표시된다.
  - [x] 사물함 배정 결과(배정 제목, 이름 정보, 사물함 정보)는 함께 `로컬스토리지`에 저장된다.
  - [x] 배정된 결과를 이미지로 다운받을 수 있다.

- 기타
  - [x] 이름(1단계), 사물함(2단계), 랜덤 배정(3단계)를 지나는 동안 페이지 레이아웃 최상단에 현재 단계를 상태바로 표시한다.
  - [x] 전역상태는 Recoil로 관리한다.

* `로컬스토리지`는 필요시 `서버`로 대체될 수 있다. 서버로 대체될 경우, 인증 및 인가가 필요할 수 있다.

- 배포: GCP 도커라이즈

## 실행

node version : 14.17.0

- 설치

```bash
yarn
```

- development 모드로 구동

```bash
yarn run start:dev
```

- production 모드로 빌드

```bash
yarn run build:prod
```

- 테스트

```bash
yarn run test
```

- 스토리북

```bash
yarn run storybook
```
