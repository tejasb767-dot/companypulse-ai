from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse


PUBLIC_PATHS = [
    "/search",
    "/market",
    "/company",
    "/auth",
    "/docs",
    "/openapi",
    "/chatbot",
    "/api/chatbot",   # add this
]


class APIKeyMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request, call_next):

        path = request.url.path

        # allow browser CORS preflight
        if request.method == "OPTIONS":
            return await call_next(request)

        # allow public routes
        for p in PUBLIC_PATHS:
            if path.startswith(p):
                return await call_next(request)

        api_key = request.headers.get("x-api-key")

        if api_key != "dev":
            return JSONResponse(
                {"error": "Invalid API key"},
                status_code=403,
            )

        return await call_next(request)