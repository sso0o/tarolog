# 타로그 (tarolog)

타로 카드 78장의 의미를 찾아보고(사전), 외웠는지 확인하는(플래시카드·퀴즈·카드-의미 매칭 게임) 학습 도구. 운세/리딩 서비스가 아니라 학습 참고서.

**데모:** https://sso0o.github.io/tarolog/

## 기술 스택

React + TypeScript + Vite (SPA, 백엔드 없음) · localStorage(학습 진도) · GitHub Pages(배포) · Capacitor(안드로이드 앱)

## 프로젝트 구조

```
docs/       설계 문서, 구현 계획 (docs/superpowers/)
frontend/   앱 소스 (Vite 프로젝트 루트)
  data/     카드 데이터 (cards.raw.json은 gitignore, cards.ko.json만 커밋)
  public/cards/  카드 이미지 (Wikimedia Commons, 퍼블릭 도메인)
  scripts/  1회성 데이터 수집/검증 스크립트
  src/      앱 코드
mobile/     안드로이드 앱 (Capacitor로 frontend/ 빌드를 감싼 네이티브 프로젝트)
  android/  안드로이드 네이티브 프로젝트
```

## 개발

```bash
cd frontend
npm install
npm run dev       # 개발 서버
npm run test      # 유닛 테스트 (lib/cards.ts, lib/progress.ts)
npm run build     # 프로덕션 빌드
```

## 카드 데이터 재생성

데이터는 리포에 커밋되어 있어 평소엔 실행할 필요 없음. 갱신이 필요할 때만:

```bash
cd frontend
node scripts/fetch-cards.mjs      # tarotapi.dev → data/cards.raw.json
node scripts/fetch-images.mjs     # Wikimedia Commons → public/cards/*.jpg
# data/cards.raw.json을 data/cards.ko.json으로 번역(LLM 보조) 후:
node scripts/validate-cards.mjs   # cards.ko.json 구조 검증
```

## 배포

```bash
cd frontend
npm run deploy     # gh-pages 브랜치로 push
```