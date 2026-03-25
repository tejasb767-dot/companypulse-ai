from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # ---------- APP ----------
    APP_NAME: str = "CompanyPulse AI"
    DEBUG: bool = False

    # ---------- API ----------
    FINNHUB_API_KEY: str
    GROQ_API_KEY: str
    API_KEY: str
    FMP_API_KEY: str = ""

    # ---------- DB ----------
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str
    DB_USER: str
    DB_PASS: str

    # ---------- CONFIG ----------
    REQUEST_TIMEOUT: int = 10

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )

    # ✅ IMPORTANT
    @property
    def DATABASE_URL(self):

        return (
            f"postgresql://{self.DB_USER}:"
            f"{self.DB_PASS}@"
            f"{self.DB_HOST}:"
            f"{self.DB_PORT}/"
            f"{self.DB_NAME}"
        )


@lru_cache
def get_settings():
    return Settings()