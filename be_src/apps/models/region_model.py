from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from be_src.apps.database import Base

class Region(Base):
    __tablename__ = 'regions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    country = Column(String(100), nullable=False)
    state = Column(String(100), nullable=True)  # 미국/호주/중국 등 주 단위
    city = Column(String(100), nullable=True)
    district = Column(String(100), nullable=True)  # 한국: 구
    place = Column(String(100), nullable=True)
    delete_flag = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime, nullable=False)
    created_by = Column(String(50), nullable=False)
    updated_at = Column(DateTime, nullable=True)
    updated_by = Column(String(50), nullable=True)

    products = relationship('Product', back_populates='region')

