# frontend

타로그의 프론트엔드. React 19 + TypeScript + Vite로 만든 SPA이며 백엔드가 없습니다. 학습 진도는 localStorage에 저장합니다. 별도 상태관리 라이브러리 없이 `useState`/`useMemo`로 충분합니다.

## 코드 스타일

- 들여쓰기 4칸, 세미콜론 없음, 홑따옴표(`'`)
- 컴포넌트는 화살표 함수 상수가 아니라 `export function ComponentName()` 선언식을 씁니다.
- Props 타입은 `interface Props { ... }`로 선언합니다 (컴포넌트명을 접두사로 붙이지 않습니다).
- 타입 전용 import는 `import type { ... }`로 명시합니다 (`tsconfig.app.json`의 `verbatimModuleSyntax`와 일치).
- 모든 파일 최상단에 `// src/경로/파일명.tsx` 형태의 헤더 주석을 답니다. 예외: `types/card.ts`(순수 타입 파일), `main.tsx`(엔트리포인트).
- named export가 기본입니다. `default export`는 `main.tsx`가 요구하는 진입점(`App.tsx`)에만 씁니다.

## 폴더 역할

- `src/components/` — 재사용 가능한 UI 컴포넌트
- `src/pages/` — 화면 단위로 컴포넌트를 조합
- `src/lib/` — 순수 함수·비즈니스 로직. 테스트(`*.test.ts`)는 같은 위치에 둡니다.
- `src/types/` — 여러 곳에서 공유되는 타입

## 명령어

```bash
npm run dev       # 개발 서버
npm run test      # 유닛 테스트 (vitest)
npm run lint      # oxlint
npm run build     # 프로덕션 빌드
```

## 테스트 원칙

`src/lib/`의 순수 함수는 테스트를 작성합니다. 컴포넌트 테스트는 현재 없으며, 새로 강제하지 않습니다.
