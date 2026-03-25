from app.ai.ai_service import AIService
from app.cache.redis_cache import cache

ai = AIService()


async def ai_job(symbol, data):

    try:

        text = await ai.analyze_company(data)

        result = {
            "summary": text
        }

        ai_key = f"ai:{symbol}"

        cache.set(
            ai_key,
            result,
            ttl=300,
        )

        print("AI saved:", symbol)

        return result

    except Exception as e:

        print("AI ERROR:", e)

        return None