import httpx
import time
import asyncio

from app.config.settings import get_settings

settings = get_settings()


class FinanceRepository:

    BASE_URL = "https://finnhub.io/api/v1"

    # -----------------------------
    # SAFE REQUEST WITH RETRY
    # -----------------------------
    async def safe_get(self, url, params):

        for _ in range(3):

            try:

                async with httpx.AsyncClient(
                    timeout=settings.REQUEST_TIMEOUT
                ) as client:

                    r = await client.get(url, params=params)

                    r.raise_for_status()

                    return r.json()

            except Exception:
                await asyncio.sleep(1)

        return {}

    # -----------------------------
    # PROFILE
    # -----------------------------
    async def get_profile(self, symbol: str):

        url = f"{self.BASE_URL}/stock/profile2"

        params = {
            "symbol": symbol.upper(),
            "token": settings.FINNHUB_API_KEY,
        }

        data = await self.safe_get(url, params)

        return data or {}

    # -----------------------------
    # QUOTE
    # -----------------------------
    async def get_quote(self, symbol: str):

        url = f"{self.BASE_URL}/quote"

        params = {
            "symbol": symbol.upper(),
            "token": settings.FINNHUB_API_KEY,
        }

        data = await self.safe_get(url, params)

        return data or {}

    # -----------------------------
    # HISTORY
    # -----------------------------
    async def get_history(self, symbol: str, days: int = 365):

        url = f"{self.BASE_URL}/stock/candle"

        now = int(time.time())
        past = now - days * 86400

        params = {
            "symbol": symbol.upper(),
            "resolution": "D",
            "from": past,
            "to": now,
            "token": settings.FINNHUB_API_KEY,
        }

        data = await self.safe_get(url, params)

        if data.get("s") != "ok":
            return {}

        return data

    # -----------------------------
    # METRICS / RATIOS
    # -----------------------------
    async def get_metrics(self, symbol: str):

        url = f"{self.BASE_URL}/stock/metric"

        params = {
            "symbol": symbol.upper(),
            "metric": "all",
            "token": settings.FINNHUB_API_KEY,
        }

        data = await self.safe_get(url, params)

        return data.get("metric", {})

    # -----------------------------
    # NEWS
    # -----------------------------
    async def get_news(self, symbol: str):

        url = f"{self.BASE_URL}/company-news"

        params = {
            "symbol": symbol.upper(),
            "from": "2024-01-01",
            "to": "2025-12-31",
            "token": settings.FINNHUB_API_KEY,
        }

        data = await self.safe_get(url, params)

        if not isinstance(data, list):
            return []

        return data