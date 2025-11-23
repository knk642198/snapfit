from sqlalchemy import TIMESTAMP, Column, String, Integer, Boolean, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from be_src.apps.database import Base
from sqlalchemy import ForeignKey, func


class Product(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True, autoincrement=True)
    photographer_id = Column(String(300), ForeignKey('photographer.id'), nullable=False)
    name = Column(String(100), nullable=False)
    url = Column(String(300), nullable=True)
    price = Column(Integer, nullable=True)
    currency = Column(String(100), nullable=True)
    image_url = Column(String(300), nullable=True)
    region_id = Column(Integer, ForeignKey('region.id'), nullable=False)
    description = Column(Text, nullable=True)
    display_start = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    display_end = Column(TIMESTAMP, nullable=True)

    use_flag = Column(Boolean, default=True, nullable=False)
    delete_flag = Column(String(1), server_default='N', nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    created_by = Column(String(100), nullable=False)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False)
    updated_by = Column(String(100), nullable=True)

    photographer = relationship('Photographer', back_populates='products')
    region = relationship('Region', back_populates='products')
    product_category = relationship('ProductCategory', back_populates='product')
