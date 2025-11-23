from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apps.database import engine, Base
from apps.routers import router

from apps.models.photographer_model import Photographer
from apps.models.product_model import Product
from apps.models.region_model import Region
from apps.models.category_model import Category, PhotographerCategory, ProductCategory

app = FastAPI(
    title="Snapfit Backend API",
    description="Snapfit 프로젝트의 백엔드 API 서버입니다.",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(engine)

# Router 등록
app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "🚀 Snapfit Backend is running!"}
