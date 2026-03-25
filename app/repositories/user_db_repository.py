from app.db.session import SessionLocal

from app.db.models.user import User
from app.db.models.watchlist import Watchlist
from app.db.models.portfolio import Portfolio


class UserDBRepository:

    def __init__(self):
        self.db = SessionLocal()

    # ---------- USER ----------

    def get_user_by_mobile(self, mobile):

        return (
            self.db.query(User)
            .filter(User.mobile == mobile)
            .first()
        )

    def create_user(self, mobile, name, country):

        user = User(
            mobile=mobile,
            name=name,
            country=country,
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user

    # ---------- WATCHLIST ----------

    def get_watchlist(self, user_id):

        return (
            self.db.query(Watchlist)
            .filter(Watchlist.user_id == user_id)
            .all()
        )

    def add_watchlist(self, user_id, symbol):

        w = Watchlist(
            user_id=user_id,
            symbol=symbol,
        )

        self.db.add(w)
        self.db.commit()

        return w

    def remove_watchlist(self, user_id, symbol):

        w = (
            self.db.query(Watchlist)
            .filter(
                Watchlist.user_id == user_id,
                Watchlist.symbol == symbol,
            )
            .first()
        )

        if w:
            self.db.delete(w)
            self.db.commit()

    # ---------- PORTFOLIO ----------

    def get_portfolio(self, user_id):

        return (
            self.db.query(Portfolio)
            .filter(Portfolio.user_id == user_id)
            .all()
        )

    def add_portfolio(
        self,
        user_id,
        symbol,
        qty,
        price,
    ):

        p = Portfolio(
            user_id=user_id,
            symbol=symbol,
            qty=qty,
            buy_price=price,
        )

        self.db.add(p)
        self.db.commit()

        return p