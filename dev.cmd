@echo off
REM Servidor estático local para BRAINROT (sin dependencias).
cd /d "%~dp0"
echo BRAINROT dev server -> http://localhost:3005
"C:\Users\deloper\AppData\Local\Programs\Python\Python312\python.exe" -m http.server 3005 --bind 127.0.0.1
