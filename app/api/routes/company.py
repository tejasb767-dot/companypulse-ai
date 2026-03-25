from fastapi import APIRouter

from app.services.company_service import CompanyService

router = APIRouter()

service = CompanyService()


@router.get("/company/{symbol}")
async def get_company(symbol: str):

    data = await service.get_company(symbol)

    return data