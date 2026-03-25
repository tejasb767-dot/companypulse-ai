from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.base import Base


class Watchlist(Base):

    __tablename__ = "watchlists"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    symbol = Column(String)