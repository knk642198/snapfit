from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from be_src.apps.database import Base
from sqlalchemy import ForeignKey, func


class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, autoincrement=True)
    photographer_id = Column(UUID, ForeignKey('photographers.id'), nullable=False)
    name = Column(String(100), nullable=False)
    url = Column(String(255), nullable=True)
    price = Column(Integer, nullable=True)
    currency = Column(String(10), nullable=True)
    image_url = Column(String(255), nullable=True)
    region_id = Column(Integer, ForeignKey('regions.id', ondelete='SET NULL'), nullable=True)
    description = Column(Text, nullable=True)
    display_start = Column(DateTime, server_default=func.now(), nullable=False)
    display_end = Column(DateTime, nullable=True)

    use_flag = Column(Boolean, default=True, nullable=True)
    delete_flag = Column(Boolean, default=False, nullable=True)

    created_at = Column(DateTime, nullable=True)
    created_by = Column(String(50), nullable=True)
    updated_at = Column(DateTime, nullable=True)
    updated_by = Column(String(50), nullable=True)

    photographer = relationship('Photographer', back_populates='products')
    region = relationship('Region', back_populates='products')
    category_links = relationship('ProductCategory', back_populates='product')
