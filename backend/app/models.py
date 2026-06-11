from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class LoginRequest(BaseModel):
    """Modelo para solicitud de login"""
    usuario: str
    password: str


class TokenResponse(BaseModel):
    """Modelo para respuesta de token"""
    access_token: str
    token_type: str
    expires_in: int


class RefreshTokenRequest(BaseModel):
    """Modelo para solicitud de refresco de token"""
    refresh_token: str


class TokenData(BaseModel):
    """Modelo para datos contenidos en el token"""
    usuario: Optional[str] = None
