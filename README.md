# SnapFit 📸

어려운 검색 없이, 원하는 분위기로 찾는 스냅 사진 작가 큐레이션 서비스.

## 시작하기

```bash
npm install
npm run dev
```

http://localhost:3000 접속.

## AI 검색 (선택)

`OPENAI_API_KEY`를 설정하면 `gpt-4o-mini`가 자연어 요청을 분석해 작가를 매칭합니다.
키가 없으면 `/api/search`는 로컬 키워드 매칭으로 자동 폴백하므로, 설정 없이도 바로 동작합니다.

```bash
cp .env.local.example .env.local
# .env.local 에 OPENAI_API_KEY 입력
```

## 데이터

작가 목록은 `data/photographers.json`에서 관리합니다. 항목을 추가/수정하면 바로 검색 결과에 반영됩니다.

## 배포

Vercel에 그대로 배포 가능 (무료 티어). `OPENAI_API_KEY`는 Vercel 프로젝트 환경 변수로 등록하세요.
