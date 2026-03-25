import time
import httpx

from app.ai.ai_service import AIService
from app.config.settings import get_settings
from app.cache.redis_cache import cache
from app.tasks.task_runner import run_background
from app.tasks.queue import add_job
from app.tasks.ai_tasks import ai_job

settings = get_settings()


class CompanyService:

    def __init__(self):
        self.ai = AIService()

    async def get_company(self, symbol: str):

        cache_key = f"company:{symbol}"

        cached = cache.get(cache_key)

        if cached:
            return cached

        async with httpx.AsyncClient() as client:

            profile_res = await client.get(
                "https://finnhub.io/api/v1/stock/profile2",
                params={
                    "symbol": symbol,
                    "token": settings.FINNHUB_API_KEY,
                },
            )

            quote_res = await client.get(
                "https://finnhub.io/api/v1/quote",
                params={
                    "symbol": symbol,
                    "token": settings.FINNHUB_API_KEY,
                },
            )

            metrics_res = await client.get(
                "https://finnhub.io/api/v1/stock/metric",
                params={
                    "symbol": symbol,
                    "metric": "all",
                    "token": settings.FINNHUB_API_KEY,
                },
            )

            chart_res = await client.get(
                f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}",
                params={
                    "range": "5y",
                    "interval": "1d",
                },
                headers={
                    "User-Agent": "Mozilla/5.0"
                }
            )

        profile = profile_res.json()
        quote = quote_res.json()
        metrics = metrics_res.json()

        timestamps = []
        closes = []

        try:

            if chart_res.status_code == 200:

                chart_json = chart_res.json()

                result_chart = chart_json.get(
                    "chart", {}
                ).get("result", [])

                if result_chart:

                    timestamps = result_chart[0].get(
                        "timestamp", []
                    )

                    closes = (
                        result_chart[0]
                        .get("indicators", {})
                        .get("quote", [{}])[0]
                        .get("close", [])
                    )

        except Exception as e:
            print("Chart error:", e)

        metric = metrics.get("metric", {})

        filtered_metrics = {
            "pe_ttm": metric.get("peTTM"),
            "forward_pe": metric.get("forwardPE"),
            "ps_ttm": metric.get("psTTM"),
            "pb": metric.get("pb"),
            "eps_ttm": metric.get("epsTTM"),
            "net_margin": metric.get("netProfitMarginTTM"),
            "roe": metric.get("roeTTM"),
            "gross_margin": metric.get("grossMarginTTM"),
            "revenue_growth": metric.get("revenueGrowthTTM"),
            "eps_growth": metric.get("epsGrowthTTM"),
            "debt_equity": metric.get("totalDebt/totalEquityAnnual"),
            "current_ratio": metric.get("currentRatioAnnual"),
            "beta": metric.get("beta"),
            "52w_high": metric.get("52WeekHigh"),
            "52w_low": metric.get("52WeekLow"),
        }

        graph_5y = {
            "t": timestamps,
            "c": closes,
        }

        ai_input = {
            "profile": profile,
            "quote": quote,
            "metrics": filtered_metrics,
        }

        ai_key = f"ai:{symbol}"

        ai_cached = cache.get(ai_key)

        if not ai_cached:

            await add_job(
                lambda: ai_job(symbol, ai_input)
            )

            summary = "AI analysis generating..."
            ai_status = "generating"

        else:

            summary = ai_cached.get("summary")
            ai_status = "done"

        result = {

            "company": {
                "name": profile.get("name"),
                "ticker": profile.get("ticker"),
                "country": profile.get("country"),
                "exchange": profile.get("exchange"),
                "industry": profile.get("finnhubIndustry"),
                "logo": profile.get("logo"),
            },

            "price": {
                "current": quote.get("c"),
                "change": quote.get("d"),
                "percent": quote.get("dp"),
                "high": quote.get("h"),
                "low": quote.get("l"),
                "open": quote.get("o"),
                "prev_close": quote.get("pc"),
            },

            # ✅ FIX HERE
            "summary": summary,

            "valuation": {
                "pe": filtered_metrics["pe_ttm"],
                "forward_pe": filtered_metrics["forward_pe"],
                "ps": filtered_metrics["ps_ttm"],
                "pb": filtered_metrics["pb"],
            },

            "performance": {
                "eps": filtered_metrics["eps_ttm"],
                "net_margin": filtered_metrics["net_margin"],
                "roe": filtered_metrics["roe"],
                "gross_margin": filtered_metrics["gross_margin"],
            },

            "growth": {
                "revenue_growth": filtered_metrics["revenue_growth"],
                "eps_growth": filtered_metrics["eps_growth"],
            },

            "safety": {
                "debt_equity": filtered_metrics["debt_equity"],
                "current_ratio": filtered_metrics["current_ratio"],
                "beta": filtered_metrics["beta"],
            },

            "range": {
                "high_52w": filtered_metrics["52w_high"],
                "low_52w": filtered_metrics["52w_low"],
            },

            "chart": {
                "t": graph_5y["t"],
                "c": graph_5y["c"],
            },

            "ai_status": ai_status,
        }

        cache.set(cache_key, result, ttl=120)

        return result