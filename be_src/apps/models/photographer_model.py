import uuid
from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from be_src.apps.database import Base

class Photographer(Base):
    __tablename__ = 'photographers'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    url = Column(String(255), nullable=True)
    price = Column(Integer, nullable=True)
    currency = Column(String(10), nullable=True)
    image_url = Column(String(255), nullable=True)
    region = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=True)
    created_by = Column(String(50), nullable=True)
    updated_at = Column(DateTime, nullable=True)
    updated_by = Column(String(50), nullable=True)
    use_flag = Column(Boolean, default=True, nullable=True)
    delete_flag = Column(Boolean, default=False, nullable=True)
    moods = relationship('PhotographerMood', back_populates='photographer')
