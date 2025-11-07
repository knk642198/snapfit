from sqlalchemy.orm import Session
from be_src.apps.models.photographer_model import Photographer, Mood, PhotographerMood

class PhotographerRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, skip: int = 0, limit: int = 100):
        return self.db.query(Photographer).offset(skip).limit(limit).all()

    def get_by_id(self, id):
        return self.db.query(Photographer).filter(Photographer.id == id).first()
