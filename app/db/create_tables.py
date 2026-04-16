from app.db.base import Base
from app.db.session import engine

from app.db.models.user import User
from app.db.models.watchlist import Watchlist
from app.db.models.portfolio import Portfolio


def create_tables():
    Base.metadata.create_all(bind=engine)


create_tables()