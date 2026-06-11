from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from app.models import LoginRequest, TokenResponse, RefreshTokenRequest, TokenData
from app.auth import (
    authenticate_user,
    create_access_token,
    create_refresh_token,
    verify_token,
    ACCESS_TOKEN_EXPIRE_SECONDS
)

# Crear aplicación FastAPI
app = FastAPI(
    title="FastAPI JWT Authentication",
    description="API con autenticación JWT",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Esquema de seguridad
security = HTTPBearer()


@app.get("/", tags=["Health Check"])
async def read_root():
    """Endpoint para verificar que el servidor está activo"""
    return {
        "message": "Bienvenido a FastAPI JWT Authentication API",
        "version": "1.0.0"
    }


@app.post("/auth/login", response_model=TokenResponse, tags=["Authentication"])
async def login(login_request: LoginRequest):
    """
    Endpoint para obtener un token JWT
    
    Parámetros requeridos:
    - usuario: admin
    - password: admin123
    
    Retorna un token de acceso válido por 300 segundos
    """
    # Autenticar usuario
    user = authenticate_user(login_request.usuario, login_request.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Crear tokens
    access_token = create_access_token(
        data={"sub": user["usuario"]},
        expires_delta=timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS)
    )
    
    refresh_token = create_refresh_token(data={"sub": user["usuario"]})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_SECONDS,
        "refresh_token": refresh_token
    }


@app.post("/auth/refresh", response_model=TokenResponse, tags=["Authentication"])
async def refresh_token(refresh_request: RefreshTokenRequest):
    """
    Endpoint para refrescar un token JWT
    
    Utiliza un refresh_token válido para obtener un nuevo access_token
    """
    try:
        # Verificar el refresh token
        payload = verify_token(refresh_request.refresh_token)
        
        # Verificar que es un refresh token
        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido para refresco"
            )
        
        usuario = payload.get("sub")
        
        if not usuario:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token sin información de usuario"
            )
        
        # Crear nuevo access token
        new_access_token = create_access_token(
            data={"sub": usuario},
            expires_delta=timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS)
        )
        
        # Crear nuevo refresh token
        new_refresh_token = create_refresh_token(data={"sub": usuario})
        
        return {
            "access_token": new_access_token,
            "token_type": "bearer",
            "expires_in": ACCESS_TOKEN_EXPIRE_SECONDS,
            "refresh_token": new_refresh_token
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Error al refrescar el token"
        )


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> TokenData:
    """
    Dependencia para verificar y obtener el usuario actual del token
    """
    token = credentials.credentials
    payload = verify_token(token)
    usuario: str = payload.get("sub")
    
    if usuario is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No se pudo validar las credenciales",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return TokenData(usuario=usuario)


@app.get("/protected", tags=["Protected"])
async def protected_route(current_user: TokenData = Depends(get_current_user)):
    """
    Endpoint protegido que requiere un token válido
    
    Envía el token en el header: Authorization: Bearer <token>
    """
    return {
        "message": f"Hola {current_user.usuario}, tienes acceso al endpoint protegido",
        "usuario": current_user.usuario
    }


@app.get("/health", tags=["Health Check"])
async def health_check():
    """Endpoint para verificar el estado de salud de la aplicación"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
