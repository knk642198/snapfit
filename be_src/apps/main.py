from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from be_src.apps.database import engine, Base
from be_src.apps.routers import router

from be_src.apps.models.photographer_model import Photographer
from be_src.apps.models.product_model import Product
from be_src.apps.models.region_model import Region
from be_src.apps.models.category_model import Category, PhotographerCategory, ProductCategory

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
