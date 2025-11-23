import uuid
from sqlalchemy import TIMESTAMP, Column, String, Boolean, DateTime, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from apps.database import Base

class Photographer(Base):
    __tablename__ = 'photographer'
    id = Column(String(300), primary_key=True)
    name = Column(String(100), nullable=False)
    url = Column(String(300), nullable=True)
    image_url = Column(String(300), nullable=True)
    description = Column(Text, nullable=True)

    use_flag = Column(Boolean, default=True, nullable=True)
    delete_flag = Column(String(1), server_default='N', nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    created_by = Column(String(100), nullable=False)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False)
    updated_by = Column(String(100), nullable=False)

    products = relationship('Product', back_populates='photographer')
    photographer_category = relationship('PhotographerCategory', back_populates='photographer')
