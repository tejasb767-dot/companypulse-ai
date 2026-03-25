from sqlalchemy import Column, Integer, String
from app.db.base import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    mobile = Column(String, unique=True)

    name = Column(String)

    country = Column(String)

    created_at = Column(String)