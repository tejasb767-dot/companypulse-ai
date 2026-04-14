from fastapi import APIRouter
from app.api.routes.search import router as search_router

from app.api.routes.health import router as health_router

from app.api.routes.company import router as company_router

from app.api.routes.auth import router as auth_router

from app.api.routes.portfolio import router as portfolio_router

from app.api.routes.chatbot import router as chatbot_router

from app.api.routes.market import router as market_router

api_router = APIRouter()

api_router.include_router(search_router)

api_router.include_router(health_router)

api_router.include_router(company_router)

api_router.include_router(auth_router)

api_router.include_router(portfolio_router)

api_router.include_router(chatbot_router, tags=["chatbot"])

api_router.include_router(market_router)