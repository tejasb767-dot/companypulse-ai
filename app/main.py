from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import get_settings
from app.core.logging import setup_logging
from app.api.router import api_router
from app.middleware.api_key import APIKeyMiddleware

settings = get_settings()
logger = setup_logging()

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        debug=settings.DEBUG,
    )

    # ✅ CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ✅ API KEY middleware
    app.add_middleware(APIKeyMiddleware)

    # ✅ Routers
    app.include_router(api_router)

    return app

app = create_app()

import os

if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)