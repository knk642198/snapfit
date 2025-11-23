FROM node:18
WORKDIR /usr/src/app

# .env.production만 복사
COPY .env.production .env.production

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# 프로덕션 빌드
RUN npm run build

# 빌드된 파일을 서빙하기 위한 간단한 서버 설치
RUN npm install -g serve

# 빌드된 dist 폴더의 정적 파일 서빙
CMD ["serve", "-s", "dist", "-l", "5173"]

EXPOSE 5173
