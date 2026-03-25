from app.auth.user_store import users

watchlists = {}
portfolios = {}


class UserRepository:

    def get_user(self, mobile):
        return users.get(mobile)

    def get_watchlist(self, mobile):
        return watchlists.get(mobile, [])

    def add_watchlist(self, mobile, symbol):

        if mobile not in watchlists:
            watchlists[mobile] = []

        if symbol not in watchlists[mobile]:
            watchlists[mobile].append(symbol)

        return watchlists[mobile]

    def remove_watchlist(self, mobile, symbol):

        if mobile not in watchlists:
            return []

        if symbol in watchlists[mobile]:
            watchlists[mobile].remove(symbol)

        return watchlists[mobile]

    def get_portfolio(self, mobile):
        return portfolios.get(mobile, [])

    def add_portfolio(self, mobile, symbol, qty, price):

        if mobile not in portfolios:
            portfolios[mobile] = []

        portfolios[mobile].append({
            "symbol": symbol,
            "qty": qty,
            "buy_price": price
        })

        return portfolios[mobile]