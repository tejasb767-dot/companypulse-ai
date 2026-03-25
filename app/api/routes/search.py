from fastapi import APIRouter, Query, Depends

from app.services.search_service import SearchService
from app.core.security import verify_api_key

router = APIRouter()

service = SearchService()


@router.get("/search")
async def search_company(
    q: str = Query(..., min_length=1),
    api_key: str = Depends(verify_api_key),
):

    results = await service.search(q)

    if not results:
        return {"message": "No company found"}

    return results