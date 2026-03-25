from jose import jwt
from datetime import datetime, timedelta

from app.config.settings import get_settings

settings = get_settings()

SECRET = settings.API_KEY
ALGO = "HS256"


class JWTService:

    def create_token(self, mobile):

        payload = {
            "mobile": mobile,
            "exp": datetime.utcnow() + timedelta(hours=12),
        }

        return jwt.encode(payload, SECRET, algorithm=ALGO)

    def decode_token(self, token):

        return jwt.decode(token, SECRET, algorithms=[ALGO])