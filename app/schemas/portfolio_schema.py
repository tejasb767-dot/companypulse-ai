from pydantic import BaseModel


class WatchlistAdd(BaseModel):
    symbol: str


class PortfolioAdd(BaseModel):
    symbol: str
    qty: int
    price: float