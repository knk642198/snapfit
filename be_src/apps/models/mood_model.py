from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from be_src.apps.database import Base

class Mood(Base):
    __tablename__ = 'moods'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)

    photographer_links = relationship(
        'PhotographerMood', back_populates='mood'
    )

class PhotographerMood(Base):
    __tablename__ = 'photographer_moods'
    photographer_id = Column(UUID(as_uuid=True), ForeignKey('photographers.id', ondelete='CASCADE'), primary_key=True)
    mood_id = Column(Integer, ForeignKey('moods.id', ondelete='CASCADE'), primary_key=True)

    mood = relationship('Mood', back_populates='photographer_links')
    # Photographer 모델에서 relationship('PhotographerMood', back_populates='photographer') 선언 필요
