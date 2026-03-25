from fastapi import APIRouter, Depends

from app.auth.current_user import get_current_user
from app.services.portfolio_service import PortfolioService
from app.schemas.portfolio_schema import WatchlistAdd, PortfolioAdd

router = APIRouter(prefix="/portfolio")

service = PortfolioService()


@router.get("/watchlist")
def watchlist(mobile: str = Depends(get_current_user)):
    return service.get_watchlist(mobile)


@router.post("/watchlist")
def add_watchlist(
    data: WatchlistAdd,
    mobile: str = Depends(get_current_user),
):
    return service.add_watchlist(mobile, data.symbol)


@router.delete("/watchlist/{symbol}")
def remove_watchlist(
    symbol: str,
    mobile: str = Depends(get_current_user),
):
    return service.remove_watchlist(mobile, symbol)


@router.get("/")
def portfolio(mobile: str = Depends(get_current_user)):
    return service.get_portfolio(mobile)


@router.post("/")
def add_portfolio(
    data: PortfolioAdd,
    mobile: str = Depends(get_current_user),
):
    return service.add_portfolio(
        mobile,
        data.symbol,
        data.qty,
        data.price,
    )