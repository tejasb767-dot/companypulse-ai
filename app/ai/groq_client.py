from groq import Groq

from app.config.settings import get_settings

settings = get_settings()


def get_groq_client():

    client = Groq(
        api_key=settings.GROQ_API_KEY
    )

    return client