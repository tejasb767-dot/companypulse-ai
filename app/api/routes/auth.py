from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.auth_service import AuthService
from app.schemas.auth_schema import (
    SendOTP,
    VerifyOTP,
    RegisterUser,
    LoginUser,
)

router = APIRouter(prefix="/auth")


@router.post("/send-otp")
def send_otp(data: SendOTP, db: Session = Depends(get_db)):
    service = AuthService(db)
    return service.send_otp(data.email)


@router.post("/verify-otp")
def verify(data: VerifyOTP, db: Session = Depends(get_db)):
    service = AuthService(db)
    return service.verify_otp(data.email, data.otp)


@router.post("/register")
def register(data: RegisterUser, db: Session = Depends(get_db)):
    service = AuthService(db)
    return service.register(
        data.email,
        data.password,
        data.country,
    )


@router.post("/login")
def login(data: LoginUser, db: Session = Depends(get_db)):
    service = AuthService(db)
    return service.login(
        data.email,
        data.password,
    )