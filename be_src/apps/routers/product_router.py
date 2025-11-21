from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from be_src.apps.repositories.product_repository import ProductRepository
from be_src.apps.schemas.product_schema import ProductOut
from be_src.apps.database import get_db

router = APIRouter(tags=["Products"])


@router.get(
    "/products", 
    response_model=List[ProductOut], 
    response_description="모든 Product 조회 (photographer, region, categories 조인)",
)
async def get_products_with_photographer_region_categories(
    db: Session = Depends(get_db)
):
    product_repository = ProductRepository(db)
    return product_repository.get_all_with_photographer_region_categories()


@router.get(
    "/products/{product_id}", 
    response_model=ProductOut,
    response_description="ID로 Product 조회 (photographer, region, categories 조인)"
)
async def get_product_with_photographer_region_categories_by_id(
    product_id: int,
    db: Session = Depends(get_db)
):
    product_repository = ProductRepository(db)
    product = product_repository.get_by_id_with_photographer_region_categories(product_id)
    return product

