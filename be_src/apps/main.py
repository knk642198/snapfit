from fastapi import FastAPI
from be_src.apps.database import engine, Base
from be_src.apps.models.photographer_model import Photographer
from be_src.apps.models.category_model import Category, PhotographerCategory, ProductCategory
from be_src.apps.models.product_model import Product
from be_src.apps.models.region_model import Region

app = FastAPI(
    title="Snapfit Backend API",
    description="Snapfit 프로젝트의 백엔드 API 서버입니다.",
    version="1.0.0"
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(engine)

@app.get("/")
def read_root():
    return {"message": "🚀 Snapfit Backend is running!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
