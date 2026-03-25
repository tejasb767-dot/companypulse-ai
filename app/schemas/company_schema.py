from pydantic import BaseModel


class CompanyRequest(BaseModel):
    symbol: str