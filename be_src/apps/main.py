from fastapi import FastAPI

# FastAPI 앱 인스턴스 생성
app = FastAPI(
    title="Snapfit Backend API",
    description="Snapfit 프로젝트의 백엔드 API 서버입니다.",
    version="1.0.0"
)

# 기본 루트 엔드포인트
@app.get("/")
def read_root():
    return {"message": "🚀 Snapfit Backend is running!"}

# 예시 API 엔드포인트
@app.get("/health")
def health_check():
    return {"status": "ok"}
