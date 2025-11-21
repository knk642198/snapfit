from typing import List
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select
from be_src.apps.models.product_model import Product
from be_src.apps.models.category_model import ProductCategory
from be_src.apps.repositories.base_repository import BaseRepository


class ProductRepository(BaseRepository):
    """Product Repository - BaseRepository 상속"""
    
    def get_all_with_photographer_region_categories(self) -> List[Product]:
        """모든 Product 조회 (photographer, region, categories 조인)"""
        stmt = (
            select(Product)
            .options(
                joinedload(Product.photographer),
                joinedload(Product.region),
                joinedload(Product.product_category).joinedload(ProductCategory.category)
            )
            .filter(Product.delete_flag == 'N')
            .filter(Product.use_flag == True)
        )
        result = self.database_session.execute(stmt)
        return result.scalars().all()

    def get_by_id_with_photographer_region_categories(
        self, 
        product_id: int
    ) -> Product | None:
        """ID로 Product 조회 (photographer, region, categories 조인)"""
        stmt = (
            select(Product)
            .options(
                joinedload(Product.photographer),
                joinedload(Product.region),
                joinedload(Product.product_category).joinedload(ProductCategory.category)
            )
            .filter(Product.id == product_id)
            .filter(Product.delete_flag == 'N')
            .filter(Product.use_flag == True)
        )
        result = self.database_session.execute(stmt)
        return result.scalar_one_or_none()


