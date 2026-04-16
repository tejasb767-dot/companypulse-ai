from pydantic import BaseModel


class SendOTP(BaseModel):
    email: str


class VerifyOTP(BaseModel):
    email: str
    otp: str


class RegisterUser(BaseModel):
    email: str
    password: str
    country: str


class LoginUser(BaseModel):
    email: str
    password: str