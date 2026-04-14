from fastapi import APIRouter, BackgroundTasks

from app.services.company_service import CompanyService
from app.tasks.ai_tasks import ai_job
from app.cache.redis_cache import cache

router = APIRouter()


@router.get("/company/{symbol}")
async def get_company(symbol: str, background_tasks: BackgroundTasks):

    service = CompanyService()

    data = await service.get_company(symbol)

    ai_cache = cache.get(f"ai:{symbol}")

    if ai_cache:
        data["ai_summary"] = ai_cache["summary"]
    else:
        data["ai_summary"] = "AI analysis generating..."
        background_tasks.add_task(ai_job, symbol, data)

    return data