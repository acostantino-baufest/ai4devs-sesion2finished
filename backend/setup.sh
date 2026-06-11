#!/bin/bash

# Script de instalación y ejecución local

echo "=== FastAPI JWT Authentication Setup ==="
echo ""

# Verificar si Poetry está instalado
if ! command -v poetry &> /dev/null; then
    echo "Poetry no está instalado. Instalando..."
    curl -sSL https://install.python-poetry.org | python3 -
    export PATH="$HOME/.local/bin:$PATH"
fi

echo "Instalando dependencias con Poetry..."
poetry install

echo ""
echo "=== Instalación completada ==="
echo ""
echo "Para ejecutar la aplicación, usa:"
echo "  poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
echo ""
echo "O simplemente:"
echo "  poetry run python -m uvicorn app.main:app --reload"
echo ""
echo "La API estará disponible en: http://localhost:8000"
echo "Documentación interactiva: http://localhost:8000/docs"
