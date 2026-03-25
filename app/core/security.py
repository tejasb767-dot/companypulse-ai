from fastapi import Header, HTTPException, Depends

from app.config.settings import get_settings

settings = get_settings()


async def verify_api_key(
    x_api_key: str = Header(None)
):

    if x_api_key != settings.API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Invalid API Key"
        )

    return x_api_key