from fastapi import APIRouter

from app.services.market_service import MarketService

router = APIRouter(prefix="/market", tags=["market"])

service = MarketService()


@router.get("/global")
async def global_market():

    return await service.get_global_market()