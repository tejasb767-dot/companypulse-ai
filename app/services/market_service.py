import time
import httpx
import asyncio

from app.config.settings import get_settings

settings = get_settings()


SYMBOLS = {
    "S&P500": "^GSPC",
    "NASDAQ": "^IXIC",
    "DOW": "^DJI",
    "NIFTY": "^NSEI",
    "SENSEX": "^BSESN",

    "BTC": "BINANCE:BTCUSDT",
    "ETH": "BINANCE:ETHUSDT",

    "AAPL": "AAPL",
    "MSFT": "MSFT",
    "NVDA": "NVDA",
    "TSLA": "TSLA",
    "AMZN": "AMZN",
    "META": "META",
    "GOOGL": "GOOGL",
}


CACHE = {
    "data": [],
    "time": 0,
}


class MarketService:

    @staticmethod
    async def fetch_symbol(client, name, symbol):

        try:

            r = await client.get(
                "https://finnhub.io/api/v1/quote",
                params={
                    "symbol": symbol,
                    "token": settings.FINNHUB_API_KEY,
                },
            )

            j = r.json()

            price = j.get("c")
            prev = j.get("pc")

            if not price or not prev:
                return None

            change = (price - prev) / prev * 100

            return {
                "name": name,
                "price": round(price, 2),
                "change": round(change, 2),
            }

        except:
            return None


    @staticmethod
    async def get_global():

        now = time.time()

        if now - CACHE["time"] < 5 and CACHE["data"]:
            return CACHE["data"]

        async with httpx.AsyncClient(timeout=10) as client:

            tasks = [
                MarketService.fetch_symbol(client, n, s)
                for n, s in SYMBOLS.items()
            ]

            results = await asyncio.gather(*tasks)

        data = [r for r in results if r]

        if data:
            CACHE["data"] = data
            CACHE["time"] = now

        return CACHE["data"]


    async def get_global_market(self):
        return await self.get_global()