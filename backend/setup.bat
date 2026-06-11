@echo off
REM Script de instalación y ejecución local para Windows

echo === FastAPI JWT Authentication Setup ===
echo.

REM Verificar si Poetry está instalado
poetry --version >nul 2>&1
if errorlevel 1 (
    echo Poetry no está instalado.
    echo Descárgalo desde: https://python-poetry.org/docs/
    echo O instálalo con: pip install poetry
    pause
    exit /b 1
)

echo Instalando dependencias con Poetry...
poetry install

echo.
echo === Instalación completada ===
echo.
echo Para ejecutar la aplicación, usa uno de estos comandos:
echo.
echo Opción 1 (con Poetry shell):
echo   poetry shell
echo   uvicorn app.main:app --reload
echo.
echo Opción 2 (sin activar shell):
echo   poetry run uvicorn app.main:app --reload
echo.
echo La API estará disponible en: http://localhost:8000
echo Documentación interactiva: http://localhost:8000/docs
echo.
pause
