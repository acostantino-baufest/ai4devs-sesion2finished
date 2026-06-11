# FastAPI JWT Authentication API

Una aplicación Web API desarrollada con **FastAPI** y **Python** que implementa autenticación mediante **JWT (JSON Web Tokens)**.

## Características

✅ Autenticación con JWT  
✅ Token de acceso con expiración de 300 segundos (5 minutos)  
✅ Token de refresco para renovar la sesión  
✅ Endpoint protegido con validación de token  
✅ Gestión de dependencias con Poetry  
✅ Containerización con Docker y Docker Compose  
✅ CORS habilitado para solicitudes cross-origin  

## Requisitos

- Python 3.9+
- Poetry (gestor de dependencias de Python)
- Docker y Docker Compose (opcional, para despliegue en contenedores)

## Instalación y Configuración

### Opción 1: Instalación Local

1. **Navegar a la carpeta del proyecto**
```bash
cd backend
```

2. **Instalar dependencias con Poetry**
```bash
poetry install
```

3. **Ejecutar la aplicación**
```bash
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

*Nota: Para activar una shell interactiva con el entorno virtual, usa:*
```bash
poetry env activate
```

La API estará disponible en: `http://localhost:8000`

### Opción 2: Usando Docker Compose

1. **Navegar a la carpeta del proyecto**
```bash
cd backend
```

2. **Construir e iniciar los contenedores**
```bash
docker-compose up --build
```

3. **Para detener la aplicación**
```bash
docker-compose down
```

## Documentación Interactiva

Una vez que la aplicación esté en ejecución, puede acceder a:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Endpoints Disponibles

### 1. Health Check
```http
GET /health
```

**Respuesta:**
```json
{
  "status": "healthy"
}
```

### 2. Login (Obtener Token)
```http
POST /auth/login
Content-Type: application/json

{
  "usuario": "admin",
  "password": "admin123"
}
```

**Respuesta Exitosa (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 300,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Credenciales de Demo:**
- Usuario: `admin`
- Contraseña: `admin123`

### 3. Refrescar Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 300,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Endpoint Protegido
```http
GET /protected
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Hola admin, tienes acceso al endpoint protegido",
  "usuario": "admin"
}
```

**Respuesta sin Token o Token Expirado (401):**
```json
{
  "detail": "Token inválido o expirado"
}
```

## Flujo de Autenticación

```
1. Usuario envía credenciales (usuario + password)
   ↓
2. API valida las credenciales
   ↓
3. Si son válidas, genera:
   - access_token: válido por 300 segundos
   - refresh_token: válido por 7 días
   ↓
4. Cliente usa access_token en el header Authorization: Bearer <token>
   ↓
5. Cuando access_token expira, usa refresh_token para obtener uno nuevo
   ↓
6. Se genera nuevo access_token y refresh_token
```

## Estructura del Proyecto

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # Aplicación FastAPI y endpoints
│   ├── auth.py          # Lógica de JWT y autenticación
│   └── models.py        # Modelos Pydantic
├── pyproject.toml       # Configuración de dependencias (Poetry)
├── Dockerfile           # Configuración para Docker
├── docker-compose.yml   # Orquestación con Docker Compose
└── README.md            # Este archivo
```

## Archivos Importantes

### pyproject.toml
Define las dependencias del proyecto:
- **fastapi**: Framework web
- **uvicorn**: Servidor ASGI
- **python-jose**: Librería para JWT
- **passlib**: Encriptación de contraseñas
- **pydantic**: Validación de datos

### Dockerfile
Configura la imagen Docker con Python 3.11 y todas las dependencias.

### docker-compose.yml
Orquesta el servicio, expone el puerto 8000 y habilita el modo de recarga automática.

## Variables de Entorno

Para cambiar la configuración, edita los valores en `app/auth.py`:

- `SECRET_KEY`: Clave secreta para firmar tokens (⚠️ Cambiar en producción)
- `ALGORITHM`: Algoritmo JWT (por defecto: HS256)
- `ACCESS_TOKEN_EXPIRE_SECONDS`: Expiración del access_token (por defecto: 300)
- `REFRESH_TOKEN_EXPIRE_DAYS`: Expiración del refresh_token (por defecto: 7)

## Ejemplo de Uso con cURL

```bash
# 1. Obtener token
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","password":"admin123"}'

# 2. Usar token en endpoint protegido
curl -X GET http://localhost:8000/protected \
  -H "Authorization: Bearer <access_token>"

# 3. Refrescar token
curl -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token":"<refresh_token>"}'
```

## Ejemplo de Uso con Python

```python
import requests

BASE_URL = "http://localhost:8000"

# 1. Login
response = requests.post(
    f"{BASE_URL}/auth/login",
    json={"usuario": "admin", "password": "admin123"}
)
tokens = response.json()
access_token = tokens["access_token"]

# 2. Acceder endpoint protegido
headers = {"Authorization": f"Bearer {access_token}"}
response = requests.get(f"{BASE_URL}/protected", headers=headers)
print(response.json())

# 3. Refrescar token
refresh_token = tokens["refresh_token"]
response = requests.post(
    f"{BASE_URL}/auth/refresh",
    json={"refresh_token": refresh_token}
)
new_tokens = response.json()
print(new_tokens)
```

## Seguridad en Producción

⚠️ **IMPORTANTE**: Antes de desplegar en producción:

1. **Cambiar SECRET_KEY** a una cadena aleatoria segura y compleja
2. **Usar una base de datos real** en lugar de USERS_DB en memoria
3. **Implementar HTTPS** con certificados SSL/TLS
4. **Usar variables de entorno** para configuración sensible
5. **Agregar CORS restrictivo** permitiendo solo dominios confiables
6. **Implementar rate limiting** para prevenir ataques de fuerza bruta
7. **Agregar logging y monitoreo**

## Solución de Problemas

### Error: "Token inválido o expirado"
- El token ha expirado (después de 300 segundos)
- Usar el refresh_token para obtener uno nuevo

### Error: "Credenciales inválidas"
- Verificar usuario y contraseña
- Las credenciales de demo son: `admin` / `admin123`

### Error de conexión a Docker
- Asegurarse de que Docker está corriendo
- Verificar que el puerto 8000 no esté en uso

## Licencia

MIT

## Autor

Desarrollado como ejemplo de autenticación JWT con FastAPI
