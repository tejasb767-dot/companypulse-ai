from app.auth.otp_service import OTPService
from app.auth.jwt_service import JWTService
from app.db.models.user import User


class AuthService:

    def __init__(self, db):
        self.db = db
        self.otp = OTPService()
        self.jwt = JWTService()

    def send_otp(self, email):
        existing_user = self.db.query(User).filter(User.email == email).first()

        if existing_user:
            return {
                "success": False,
                "message": "Account already exists. Please log in."
            }

        self.otp.send_otp(email)

        return {
            "success": True,
            "message": "OTP sent"
        }
    def verify_otp(self, email, otp):
        if not self.otp.verify_otp(email, otp):
            return {
                "success": False,
                "message": "Invalid OTP"
            }

        return {
            "success": True
        }

    def register(self, email, password, country):
        existing_user = self.db.query(User).filter(User.email == email).first()

        if existing_user:
            return {
                "success": False,
                "message": "Account already exists. Please login."
            }

        user = User(
            email=email,
            password=password,
            country=country
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        token = self.jwt.create_token(email)

        return {
            "success": True,
            "message": "Account created",
            "token": token,
        }

    def login(self, email, password):
        user = self.db.query(User).filter(User.email == email).first()

        if not user:
            return {
                "success": False,
                "message": "Invalid account. Please create an account."
            }

        if user.password != password:
            return {
                "success": False,
                "message": "Invalid password"
            }

        token = self.jwt.create_token(email)

        return {
            "success": True,
            "message": "Welcome back",
            "token": token,
        }