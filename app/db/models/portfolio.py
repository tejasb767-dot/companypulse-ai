from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.db.base import Base


class Portfolio(Base):

    __tablename__ = "portfolio"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    symbol = Column(String)

    qty = Column(Integer)

    buy_price = Column(Float)