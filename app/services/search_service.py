from app.repositories.search_repository import SearchRepository


class SearchService:

    def __init__(self):
        self.repo = SearchRepository()

    async def search(self, query: str):

        if not query:
            return []

        results = await self.repo.search_company(query)

        companies = []

        for item in results:

            symbol = item.get("symbol")
            name = item.get("description")
            type_ = item.get("type")

            # ✅ must exist
            if not symbol or not name:
                continue

            # ✅ only real stocks
            if type_ != "Common Stock":
                continue

            # ✅ remove foreign exchange symbols
            if "." in symbol:
                continue

            # ✅ remove long / weird symbols
            if len(symbol) > 5:
                continue

            companies.append(
                {
                    "symbol": symbol,
                    "description": name,
                }
            )

        # limit suggestions
        return companies[:10]