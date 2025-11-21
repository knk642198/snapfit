from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select


class BaseRepository:
    """Base Repository 클래스 - 데이터베이스 세션 관리"""
    
    def __init__(self, database_session: Session) -> None:
        self.database_session = database_session
    
    def get_all(self, model):
        """전체 레코드 조회"""
        result = self.database_session.execute(select(model))
        return result.scalars().all()
    
    def get_by_id(self, model, object_id: int | str):
        """ID로 단일 레코드 조회"""
        result = self.database_session.execute(
            select(model).filter(model.id == object_id)
        )
        return result.scalar_one_or_none()
    
    def get_by_ids(self, model, record_ids: List[int | str]):
        """여러 ID로 레코드 조회"""
        result = self.database_session.execute(
            select(model).filter(model.id.in_(record_ids))
        )
        return result.scalars().all()
