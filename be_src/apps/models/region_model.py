from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from be_src.apps.database import Base

class Region(Base):
    __tablename__ = 'region'
    id = Column(Integer, primary_key=True, autoincrement=True)
    country = Column(String(100), nullable=False)
    state = Column(String(100), nullable=True)  # 미국/호주/중국 등 주 단위
    city = Column(String(100), nullable=True)
    district = Column(String(100), nullable=True)  # 한국: 구
    place = Column(String(100), nullable=True)

    delete_flag = Column(Boolean, default=False, nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    created_by = Column(String(100), nullable=False)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=True)
    updated_by = Column(String(100), nullable=True)

    products = relationship('Product', back_populates='region')

