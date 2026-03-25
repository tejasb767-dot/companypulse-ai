import httpx
import time

from app.config.settings import get_settings

settings = get_settings()

CACHE = {
    "data": None,
    "time": 0,
}


class SearchRepository:

    async def search_company(self, query: str):

        now = time.time()

        # ✅ cache 2 seconds to avoid 429
        if CACHE["data"] and now - CACHE["time"] < 2:
            return CACHE["data"]

        url = "https://finnhub.io/api/v1/search"

        params = {
            "q": query,
            "token": settings.FINNHUB_API_KEY,
        }

        async with httpx.AsyncClient() as client:

            response = await client.get(
                url,
                params=params,
            )

            # do NOT crash on 429
            if response.status_code != 200:
                return []

            data = response.json().get("result", [])

            CACHE["data"] = data
            CACHE["time"] = now

            return data