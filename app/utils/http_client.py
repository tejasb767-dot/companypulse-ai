import httpx
from app.config.settings import get_settings

settings = get_settings()


async def get_client():
    timeout = httpx.Timeout(settings.REQUEST_TIMEOUT)

    async with httpx.AsyncClient(timeout=timeout) as client:
        yield client