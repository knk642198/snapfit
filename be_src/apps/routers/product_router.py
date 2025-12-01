from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from be_src.apps.repositories.product_repository import ProductRepository
from be_src.apps.schemas.product_schema import ProductOut
from be_src.apps.database import get_db
from be_src.apps.services.s3_service import generate_presigned_url

router = APIRouter(tags=["Products"])


def convert_image_url_to_presigned(product):
    """Product의 image_url을 presigned URL로 변환"""
    if product and product.image_url:
        # image_url에서 키만 추출 (예: "KSH03777.jpg")
        s3_key = product.image_url.split('/')[-1]
        presigned_url = generate_presigned_url(s3_key)
        if presigned_url:
            product.image_url = presigned_url
    return product


@router.get(
    "/products", 
    response_model=List[ProductOut], 
    response_description="모든 Product 조회 (photographer, region, categories 조인)",
)
async def get_products_with_photographer_region_categories(
    db: Session = Depends(get_db)
):
    product_repository = ProductRepository(db)
    products = product_repository.get_all_with_photographer_region_categories()
    
    # 각 product의 image_url을 presigned URL로 변환
    for product in products:
        convert_image_url_to_presigned(product)
    
    return products


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
    
    # image_url을 presigned URL로 변환
    convert_image_url_to_presigned(product)
    
    return product

