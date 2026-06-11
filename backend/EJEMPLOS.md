# Ejemplos de Uso de la API

## 1. Usando cURL

### Login - Obtener Token
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","password":"admin123"}'
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

### Acceder a Endpoint Protegido
```bash
curl -X GET http://localhost:8000/protected \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Refrescar Token
```bash
curl -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
```

### Verificar Salud
```bash
curl http://localhost:8000/health
```

---

## 2. Usando Python Requests

```python
import requests
import time

BASE_URL = "http://localhost:8000"

# 1. Login
print("=== 1. Realizando login ===")
login_response = requests.post(
    f"{BASE_URL}/auth/login",
    json={"usuario": "admin", "password": "admin123"}
)
print(f"Status: {login_response.status_code}")
tokens = login_response.json()
print(f"Token obtenido: {tokens['access_token'][:50]}...")
print(f"Expira en: {tokens['expires_in']} segundos")
print()

access_token = tokens["access_token"]
refresh_token = tokens["refresh_token"]

# 2. Acceder a endpoint protegido
print("=== 2. Accediendo a endpoint protegido ===")
headers = {"Authorization": f"Bearer {access_token}"}
protected_response = requests.get(f"{BASE_URL}/protected", headers=headers)
print(f"Status: {protected_response.status_code}")
print(f"Respuesta: {protected_response.json()}")
print()

# 3. Intentar con token expirado (esperar 5 segundos para demostración)
print("=== 3. Esperando a que expire el token (puede tomar tiempo en desarrollo) ===")
print("En producción, esperaríamos 300 segundos...")
print()

# 4. Refrescar token
print("=== 4. Refrescando token ===")
refresh_response = requests.post(
    f"{BASE_URL}/auth/refresh",
    json={"refresh_token": refresh_token}
)
print(f"Status: {refresh_response.status_code}")
new_tokens = refresh_response.json()
print(f"Nuevo token: {new_tokens['access_token'][:50]}...")
print(f"Expira en: {new_tokens['expires_in']} segundos")
print()

# 5. Acceder con nuevo token
print("=== 5. Accediendo con nuevo token ===")
new_headers = {"Authorization": f"Bearer {new_tokens['access_token']}"}
new_protected_response = requests.get(f"{BASE_URL}/protected", headers=new_headers)
print(f"Status: {new_protected_response.status_code}")
print(f"Respuesta: {new_protected_response.json()}")
```

---

## 3. Usando Postman

### 1. Crear una nueva Request - POST
- **URL**: `http://localhost:8000/auth/login`
- **Method**: POST
- **Body** (JSON):
```json
{
  "usuario": "admin",
  "password": "admin123"
}
```

### 2. Guardar el token en una variable
- En la pestaña **Tests**, agregar:
```javascript
var jsonData = pm.response.json();
pm.environment.set("access_token", jsonData.access_token);
pm.environment.set("refresh_token", jsonData.refresh_token);
```

### 3. Crear request para endpoint protegido
- **URL**: `http://localhost:8000/protected`
- **Method**: GET
- **Headers**:
  - Key: `Authorization`
  - Value: `Bearer {{access_token}}`

---

## 4. Usando JavaScript/Fetch API

```javascript
// 1. Login
async function login() {
  const response = await fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario: 'admin',
      password: 'admin123'
    })
  });
  
  const data = await response.json();
  console.log('Tokens:', data);
  
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token
  };
}

// 2. Acceder a endpoint protegido
async function accessProtected(accessToken) {
  const response = await fetch('http://localhost:8000/protected', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  const data = await response.json();
  console.log('Respuesta protegida:', data);
  return data;
}

// 3. Refrescar token
async function refreshToken(refreshToken) {
  const response = await fetch('http://localhost:8000/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: refreshToken
    })
  });
  
  const data = await response.json();
  console.log('Nuevo token:', data);
  return data;
}

// Uso
(async () => {
  const tokens = await login();
  await accessProtected(tokens.accessToken);
  const newTokens = await refreshToken(tokens.refreshToken);
  await accessProtected(newTokens.accessToken);
})();
```

---

## Notas Importantes

- El **access_token** expira en **300 segundos** (5 minutos)
- El **refresh_token** expira en **7 días**
- Siempre incluir el token en el header: `Authorization: Bearer <token>`
- Las credenciales de demo son: `usuario: admin`, `password: admin123`
- Para cambiar las credenciales, editar `app/auth.py` en la sección `USERS_DB`
