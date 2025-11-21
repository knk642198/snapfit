from sqlalchemy import TIMESTAMP, Column, Integer, String, Text, ForeignKey, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from be_src.apps.database import Base

class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    category_type = Column(String(100), nullable=False)  # 'location(실내외)', 'camera(아이폰,dslr)', 'concept(웨딩,우정,커플)', 'duration(1시간,2시간)', 'mood(러블ㄹ,시크,키치,차분함)'
    description = Column(Text, nullable=True)

    delete_flag = Column(String(1), server_default='N', nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    created_by = Column(String(100), nullable=False)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False)
    updated_by = Column(String(100), nullable=False)

    photographer_category = relationship('PhotographerCategory', back_populates='category')
    product_category = relationship('ProductCategory', back_populates='category')


class PhotographerCategory(Base):
    __tablename__ = 'photographer_category'
    photographer_id = Column(String(300), ForeignKey('photographer.id'), primary_key=True)
    category_id = Column(Integer, ForeignKey('category.id'), primary_key=True)

    category = relationship('Category', back_populates='photographer_category')
    photographer = relationship('Photographer', back_populates='photographer_category')


class ProductCategory(Base):
    __tablename__ = 'product_category'
    product_id = Column(Integer, ForeignKey('product.id'), primary_key=True)
    category_id = Column(Integer, ForeignKey('category.id'), primary_key=True)

    category = relationship('Category', back_populates='product_category')
    product = relationship('Product', back_populates='product_category')

