from pydantic import BaseModel
from typing import List
from datetime import datetime


class CategoryOut(BaseModel):
    id: int
    name: str
    category_type: str
    description: str | None = None

    class Config:
        from_attributes = True


class PhotographerOut(BaseModel):
    id: str
    name: str
    url: str | None = None
    image_url: str | None = None
    description: str | None = None

    class Config:
        from_attributes = True


class RegionOut(BaseModel):
    id: int
    country: str
    state: str | None = None
    city: str | None = None
    district: str | None = None
    place: str | None = None

    class Config:
        from_attributes = True


class ProductCategoryOut(BaseModel):
    category: CategoryOut

    class Config:
        from_attributes = True


class ProductOut(BaseModel):
    id: int
    photographer_id: str
    name: str
    url: str | None = None
    price: int | None = None
    currency: str | None = None
    image_url: str | None = None
    region_id: int
    description: str | None = None
    display_start: datetime
    display_end: datetime | None = None
    photographer: PhotographerOut
    region: RegionOut
    product_category: List[ProductCategoryOut]

    class Config:
        from_attributes = True

