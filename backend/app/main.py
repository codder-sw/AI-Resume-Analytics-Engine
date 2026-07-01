# ============================================
# app/main.py
# ENTRY POINT — FastAPI server yahan se start hota hai
# ============================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler

from app.config import settings
from app.limiter import limiter
from app.core.database import connect_to_mongo, close_mongo_connection
from app.routers import resume

app = FastAPI(title="AI Resume Analytics Engine")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router)


@app.on_event("startup")
async def startup():
    connect_to_mongo()


@app.on_event("shutdown")
async def shutdown():
    close_mongo_connection()


@app.get("/")
async def root():
    return {"status": "ok", "message": "AI Resume Analytics Engine backend chal raha hai"}


@app.get("/health")
async def health():
    return {"status": "healthy"}