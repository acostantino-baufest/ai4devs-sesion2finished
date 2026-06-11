# Molinos Agro — Frontend

Aplicación web desarrollada en **React + Vite** que implementa autenticación con JWT contra el backend FastAPI de Molinos Agro.

## Características

- Página de **login** con validación y manejo de errores
- Página de **bienvenida** protegida (no accesible sin sesión activa)
- Token JWT almacenado en `sessionStorage` (se elimina al cerrar la pestaña)
- Redirección automática al login si la sesión expira o es inválida
- Diseño basado en el sistema de diseño **Molinos Agro** (DESIGN.md)
- Responsive: funciona en escritorio y móvil

## Requisitos

- Node.js 18+ y npm
- Backend FastAPI corriendo en `http://localhost:8000`

## Instalación

```bash
# 1. Navegar a la carpeta del frontend
cd frontend

# 2. Copiar el archivo de variables de entorno
copy .env.example .env

# 3. Instalar dependencias
npm install
```

## Uso

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

### Producción

```bash
npm run build
npm run preview
```

## Variables de entorno

| Variable       | Default                   | Descripción                   |
|----------------|---------------------------|-------------------------------|
| `VITE_API_URL` | `http://localhost:8000`   | URL base del backend FastAPI  |

## Credenciales de demo

| Campo    | Valor      |
|----------|------------|
| Usuario  | `admin`    |
| Password | `admin123` |

## Estructura del proyecto

```
frontend/
├── index.html              # Punto de entrada HTML (importa fuentes Google)
├── vite.config.js          # Configuración de Vite
├── package.json
├── .env.example            # Variables de entorno de ejemplo
└── src/
    ├── main.jsx            # Punto de entrada React
    ├── App.jsx             # Router principal con rutas protegidas
    ├── index.css           # Tokens de diseño y estilos globales
    ├── context/
    │   └── AuthContext.jsx # Estado global de autenticación (sessionStorage)
    ├── components/
    │   └── PrivateRoute.jsx # Guard que redirige a /login si no hay sesión
    ├── pages/
    │   ├── LoginPage.jsx   # Página de inicio de sesión
    │   └── WelcomePage.jsx # Dashboard protegido post-login
    └── services/
        └── authService.js  # Llamadas HTTP al backend (login, /protected)
```

## Flujo de autenticación

```
Usuario abre la app
       │
       ▼
   /login (pública)
       │
  Ingresa credenciales
       │
  POST /auth/login ──► Backend FastAPI
       │
  Guarda access_token en sessionStorage
       │
       ▼
  /welcome (protegida) ──► Llama a GET /protected
       │                         │
  Muestra bienvenida        Token inválido/expirado
       │                         │
  "Cerrar sesión"           Redirige a /login
       │
  Limpia sessionStorage
       │
  Redirige a /login
```

## Decisiones de diseño

- **`sessionStorage`** en lugar de `localStorage`: el token se elimina automáticamente al cerrar la pestaña, mejorando la seguridad.
- **React Router v6** con `PrivateRoute`: cualquier ruta no autenticada redirige a `/login`.
- **Fuente "Product"** sustituida por **Plus Jakarta Sans** (Google Fonts), fuente con perfil visual similar disponible públicamente.
- El token de acceso expira en **5 minutos** (configurado en el backend). Al expirar, la siguiente llamada a `/protected` fallará y el usuario será redirigido al login automáticamente.

## Ejecución conjunta (backend + frontend)

```bash
# Terminal 1 — Backend
cd backend
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2 — Frontend
cd frontend
npm run dev
```
