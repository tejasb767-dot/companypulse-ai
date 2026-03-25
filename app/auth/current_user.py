from fastapi import Header, HTTPException

from app.auth.jwt_service import JWTService

jwt_service = JWTService()


def get_current_user(
    authorization: str = Header(None),
):

    if not authorization:
        raise HTTPException(401, "No token")

    token = authorization.replace("Bearer ", "")

    try:
        data = jwt_service.decode_token(token)
    except:
        raise HTTPException(401, "Invalid token")

    return data["mobile"]