from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from be_src.apps.database import Base

class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    category_type = Column(String(50), nullable=False)  # 'location(실내외)', 'camera(아이폰,dslr)', 'concept(웨딩,우정,커플)', 'duration(1시간,2시간)', 'mood(러블ㄹ,시크,키치,차분함)'
    description = Column(Text, nullable=True)

    delete_flag = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    created_by = Column(String(50), nullable=False)
    updated_at = Column(DateTime, nullable=True)
    updated_by = Column(String(50), nullable=True)

    photographer_links = relationship(
        'PhotographerCategory', back_populates='category'
    )
    product_links = relationship(
        'ProductCategory', back_populates='category'
    )
class PhotographerCategory(Base):
    __tablename__ = 'photographer_categories'
    photographer_id = Column(UUID, ForeignKey('photographers.id), primary_key=True)
    category_id = Column(Integer, ForeignKey('categories.id'), primary_key=True)

    category = relationship('Category', back_populates='photographer_links')
    photographer = relationship('Photographer', back_populates='category_links')

class ProductCategory(Base):
    __tablename__ = 'product_categories'
    product_id = Column(Integer, ForeignKey('products.id'), primary_key=True)
    category_id = Column(Integer, ForeignKey('categories.id'), primary_key=True)

    category = relationship('Category', back_populates='product_links')
    product = relationship('Product', back_populates='category_links')

