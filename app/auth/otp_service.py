import random
from app.auth.user_store import otp_store


class OTPService:

    def send_otp(self, mobile: str):

        otp = str(random.randint(1000, 9999))

        otp_store[mobile] = otp

        print("OTP for", mobile, "=", otp)

        return otp

    def verify_otp(self, mobile: str, otp: str):

        if mobile not in otp_store:
            return False

        return otp_store[mobile] == otp