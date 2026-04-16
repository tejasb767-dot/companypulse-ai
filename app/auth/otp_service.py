import random
import resend
from dotenv import load_dotenv
load_dotenv()
from os import getenv
from app.auth.user_store import otp_store

# Put your API key here temporarily
resend.api_key = getenv("RESEND_API_KEY")


class OTPService:

    def send_otp(self, email: str):
        otp = str(random.randint(100000, 999999))

        otp_store[email] = otp

        resend.Emails.send({
            "from": "CompanyPulse AI <otp@send.companypulseai.online>",
            "to": email,
            "subject": "Your CompanyPulse AI OTP",
            "html": f"""
                <div style="font-family: Arial; background:#0b0b0b; color:white; padding:30px; border-radius:20px;">
                    <h2 style="color:#22d3ee;">CompanyPulse AI</h2>
                    <p>Your verification code is:</p>

                    <div style="
                        margin:20px 0;
                        font-size:32px;
                        font-weight:bold;
                        letter-spacing:8px;
                        color:#4ade80;
                    ">
                        {otp}
                    </div>

                    <p>This OTP expires in 5 minutes.</p>
                </div>
            """
        })

        return {"message": "OTP sent"}

    def verify_otp(self, email: str, otp: str):
        if email not in otp_store:
            return False

        return otp_store[email] == otp