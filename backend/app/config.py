# ============================================
# app/config.py
# .env file se saari settings load karta hai
# ============================================

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    mongodb_uri: str
    database_name: str = "resume_analytics"
    ai_api_key: str
    ai_provider: str = "groq"
    groq_model: str = "llama-3.3-70b-versatile"
    allowed_origins: str = "http://localhost:5173"
    environment: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()