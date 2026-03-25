import httpx
from app.config.settings import get_settings

settings = get_settings()


class MarketRepository:

    def __init__(self):
        self.base = "https://finnhub.io/api/v1"

    async def get_quote(self, symbol: str):

        async with httpx.AsyncClient() as client:

            r = await client.get(
                f"{self.base}/quote",
                params={
                    "symbol": symbol,
                    "token": settings.FINNHUB_API_KEY,
                },
            )

            return r.json()