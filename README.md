# SnapFit

## 환경 구성

### 로컬 개발 환경

1. **환경 변수 설정**
```bash
# fe_src/.env.development 파일 생성
echo "VITE_SERVICE_URL=http://localhost:8000" > fe_src/.env.development
```

2. **Docker Compose로 실행**
```bash
docker-compose up
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- 코드 변경 시 자동 리로드 (볼륨 마운트)

---

### 서버(프로덕션) 환경

1. **환경 변수 설정**
```bash
# fe_src/.env.production 파일 생성
echo "VITE_SERVICE_URL=http://44.245.228.226:8000" > fe_src/.env.production
```

2. **프로덕션 빌드 및 실행**
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

- Frontend: http://44.245.228.226:5173
- Backend: http://44.245.228.226:8000
- 최적화된 프로덕션 빌드
- 자동 재시작 설정

---

## 파일 구조

```
snapfit/
├── docker-compose.yml          # 로컬 개발용
├── docker-compose.prod.yml     # 서버 배포용
├── be_src/
│   ├── Dockerfile             # 개발용 (--reload)
│   └── Dockerfile.prod        # 프로덕션용
└── fe_src/
    ├── Dockerfile             # 개발용 (dev server)
    ├── Dockerfile.prod        # 프로덕션용 (빌드 + serve)
    ├── .env.development       # 로컬 환경 변수 (git 제외)
    └── .env.production        # 서버 환경 변수 (git 제외)
```

---

## 명령어 요약

| 환경 | 명령어 | 설명 |
|------|--------|------|
| 로컬 개발 | `docker-compose up` | 개발 서버 실행 (hot reload) |
| 서버 배포 | `docker-compose -f docker-compose.prod.yml up -d --build` | 프로덕션 빌드 및 실행 |
| 서버 중지 | `docker-compose -f docker-compose.prod.yml down` | 컨테이너 중지 |
| 로그 확인 | `docker-compose logs -f` | 실시간 로그 확인 |

---

## 환경별 차이점

### 로컬 개발
- ✅ 볼륨 마운트로 코드 변경 즉시 반영
- ✅ Hot reload 활성화
- ✅ 개발 서버 (빠른 빌드)
- ✅ 디버그 모드

### 서버(프로덕션)
- ✅ 최적화된 프로덕션 빌드
- ✅ 정적 파일 서빙
- ✅ 자동 재시작 설정
- ✅ 볼륨 마운트 없음 (이미지에 코드 포함)
