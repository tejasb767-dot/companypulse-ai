from app.repositories.user_db_repository import UserDBRepository


class PortfolioService:

    def __init__(self):
        self.repo = UserDBRepository()

    def get_watchlist(self, user):

        u = self.repo.get_user_by_mobile(user)

        return self.repo.get_watchlist(u.id)

    def add_watchlist(self, user, symbol):

        u = self.repo.get_user_by_mobile(user)

        return self.repo.add_watchlist(
            u.id,
            symbol,
        )

    def remove_watchlist(self, user, symbol):

        u = self.repo.get_user_by_mobile(user)

        self.repo.remove_watchlist(
            u.id,
            symbol,
        )

    def get_portfolio(self, user):

        u = self.repo.get_user_by_mobile(user)

        return self.repo.get_portfolio(u.id)

    def add_portfolio(
        self,
        user,
        symbol,
        qty,
        price,
    ):

        u = self.repo.get_user_by_mobile(user)

        return self.repo.add_portfolio(
            u.id,
            symbol,
            qty,
            price,
        )