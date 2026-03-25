from fastapi import APIRouter

from app.services.auth_service import AuthService
from app.schemas.auth_schema import SendOTP, VerifyOTP, RegisterUser

router = APIRouter(prefix="/auth")

service = AuthService()


@router.post("/send-otp")
def send_otp(data: SendOTP):
    return service.send_otp(data.mobile)


@router.post("/verify-otp")
def verify(data: VerifyOTP):
    return service.verify_otp(
        data.mobile,
        data.otp,
    )


@router.post("/register")
def register(data: RegisterUser):
    return service.register(
        data.mobile,
        data.name,
        data.country,
    )