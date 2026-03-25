from app.auth.user_store import users
from app.auth.otp_service import OTPService
from app.auth.jwt_service import JWTService
from app.repositories.user_db_repository import UserDBRepository


class AuthService:

    def __init__(self):
        self.repo = UserDBRepository()
        self.otp = OTPService()
        self.jwt = JWTService()

    def send_otp(self, mobile):

        self.otp.send_otp(mobile)

        return {"message": "OTP sent"}

    def verify_otp(self, mobile, otp):

        if not self.otp.verify_otp(mobile, otp):
            return {"error": "Invalid OTP"}

        user = self.repo.get_user_by_mobile(mobile)

        if not user:
            return {"new_user": True}

        token = self.jwt.create_token(mobile)

        return {
            "new_user": False,
            "token": token,
            "user": {
                "name": user.name,
                "country": user.country,
            },
        }

    def register(self, mobile, name, country):

        user = self.repo.create_user(
            mobile,
            name,
            country,
        )

        token = self.jwt.create_token(mobile)

        return {
            "token": token,
            "user": {
                "name": user.name,
                "country": user.country,
            },
        }

    def get_user(self, mobile):

        return users.get(mobile)