from fastapi import APIRouter, HTTPException, Query
from typing import List
from be_src.apps.services.s3_service import (
    generate_presigned_url,
    list_s3_objects,
    get_all_images_with_presigned_urls
)

router = APIRouter(prefix="/s3", tags=["S3"])


@router.get(
    "/presigned-url",
    response_description="특정 S3 객체의 presigned URL 생성"
)
async def get_presigned_url(
    key: str = Query(..., description="S3 객체 키 (예: images/photo1.jpg)"),
    expiration: int = Query(3600, description="URL 유효 시간 (초, 기본값 1시간)")
):
    """
    S3 객체에 대한 presigned URL을 생성합니다.
    """
    presigned_url = generate_presigned_url(key, expiration)
    
    if not presigned_url:
        raise HTTPException(status_code=500, detail="Presigned URL 생성에 실패했습니다.")
    
    return {
        "key": key,
        "presigned_url": presigned_url,
        "expiration_seconds": expiration
    }


@router.get(
    "/objects",
    response_description="S3 버킷의 객체 목록 조회"
)
async def get_s3_objects(
    prefix: str = Query("", description="필터링할 접두사 (예: images/)")
):
    """
    S3 버킷의 객체 목록을 조회합니다.
    """
    objects = list_s3_objects(prefix)
    return {
        "count": len(objects),
        "objects": objects
    }


@router.get(
    "/images",
    response_description="모든 이미지와 presigned URL 조회"
)
async def get_all_images(
    prefix: str = Query("", description="필터링할 접두사"),
    expiration: int = Query(3600, description="URL 유효 시간 (초)")
):
    """
    S3 버킷의 모든 이미지와 presigned URL을 반환합니다.
    """
    images = get_all_images_with_presigned_urls(prefix, expiration)
    return {
        "count": len(images),
        "images": images
    }

