# tarolog

타로 카드 78장의 의미를 찾아보고(사전), 외웠는지 확인하는(플래시카드) 학습 도구. 자세한 소개는 [README.md](README.md) 참고.

## 폴더 구조

앱은 루트에 평판(flat)으로 나열합니다. 현재 `frontend/`(React+TS+Vite SPA)와 `mobile/`(Capacitor 기반 안드로이드 앱)이 있으며, 앞으로 `backend/` 등이 추가될 수 있습니다. `docs/`는 설계 문서·구현 계획(`docs/superpowers/`) 전용입니다.

## 새 앱을 추가할 때

1. 루트에 새 디렉토리를 만듭니다 (`apps/`로 묶지 않습니다).
2. 그 디렉토리 안에 `CLAUDE.md`를 만들어 기술 스택, 코드 스타일, 실행 명령어를 문서화합니다.
3. 루트 [README.md](README.md)의 "프로젝트 구조" 섹션을 갱신합니다.

## 앱별 세부 규칙

각 앱 디렉토리의 `CLAUDE.md`를 참고하세요. (현재: [frontend/CLAUDE.md](frontend/CLAUDE.md), [mobile/CLAUDE.md](mobile/CLAUDE.md))
