"""
Archivo de pruebas para la API JWT

Para ejecutar: pytest
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_read_root():
    """Prueba el endpoint raíz"""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()


def test_health_check():
    """Prueba el endpoint de health check"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_login_success():
    """Prueba login exitoso con credenciales válidas"""
    response = client.post(
        "/auth/login",
        json={"usuario": "admin", "password": "admin123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"
    assert data["expires_in"] == 300


def test_login_invalid_credentials():
    """Prueba login con credenciales inválidas"""
    response = client.post(
        "/auth/login",
        json={"usuario": "admin", "password": "wrongpassword"}
    )
    assert response.status_code == 401
    assert "Credenciales inválidas" in response.json()["detail"]


def test_login_nonexistent_user():
    """Prueba login con usuario inexistente"""
    response = client.post(
        "/auth/login",
        json={"usuario": "nonexistent", "password": "password"}
    )
    assert response.status_code == 401


def test_protected_route_with_token():
    """Prueba acceso a endpoint protegido con token válido"""
    # Primero obtenemos el token
    login_response = client.post(
        "/auth/login",
        json={"usuario": "admin", "password": "admin123"}
    )
    access_token = login_response.json()["access_token"]
    
    # Luego accedemos al endpoint protegido
    response = client.get(
        "/protected",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert response.status_code == 200
    assert "admin" in response.json()["message"]


def test_protected_route_without_token():
    """Prueba acceso a endpoint protegido sin token"""
    response = client.get("/protected")
    assert response.status_code == 403


def test_refresh_token():
    """Prueba refresco de token"""
    # Obtener tokens iniciales
    login_response = client.post(
        "/auth/login",
        json={"usuario": "admin", "password": "admin123"}
    )
    refresh_token = login_response.json()["refresh_token"]
    
    # Refrescar token
    response = client.post(
        "/auth/refresh",
        json={"refresh_token": refresh_token}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_refresh_with_invalid_token():
    """Prueba refresco con token inválido"""
    response = client.post(
        "/auth/refresh",
        json={"refresh_token": "invalid_token"}
    )
    assert response.status_code == 401
