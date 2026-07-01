# ============================================
# app/limiter.py
# Rate limiting setup (10 requests/minute per IP)
# ============================================

from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)