# ============================================
# backend/app/main.py
# ENTRY POINT — FastAPI server yahan se start hota hai
# ============================================

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler

from app.config import settings
from app.limiter import limiter
from app.core.database import connect_to_mongo, close_mongo_connection
from app.routers import resume


# ──────────────────────────────────────────
# Lifespan: startup + shutdown dono yahan
# (Ye FastAPI ka naya recommended tarika hai)
# ──────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Server start hote hi MongoDB connect karo
    connect_to_mongo()
    yield
    # Server band hote hi MongoDB disconnect karo
    close_mongo_connection()


# ──────────────────────────────────────────
# FastAPI App banana
# ──────────────────────────────────────────
app = FastAPI(
    title="AI Resume Analytics Engine",
    description="Resume parsing, NLP analysis, and AI insights API",
    version="1.0.0",
    lifespan=lifespan,
)

# ──────────────────────────────────────────
# Rate Limiter attach karo
# ──────────────────────────────────────────
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ──────────────────────────────────────────
# CORS Middleware — Frontend ko allow karna
# ──────────────────────────────────────────
# Allowed origins build karte hain:
# 1. .env se jo bhi settings.allowed_origins mein hai
# 2. Hardcoded Netlify URL (backup ke liye)
_origins_from_env = [
    o.strip()
    for o in settings.allowed_origins.split(",")
    if o.strip()
]

_extra_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://agent-6a454a7295ab546345b22f3f--ai-resume0.netlify.app",
]

# Dono lists merge karo, duplicates hata do
allowed_origins = list(set(_origins_from_env + _extra_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────
# Routers include karo
# ──────────────────────────────────────────
app.include_router(resume.router)


# ──────────────────────────────────────────
# Health Check Routes
# ──────────────────────────────────────────
@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "AI Resume Analytics Engine backend chal raha hai",
        "version": "1.0.0",
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}