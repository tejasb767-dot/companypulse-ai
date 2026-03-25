from pydantic import BaseModel


class CompanySuggestion(BaseModel):
    symbol: str
    name: str