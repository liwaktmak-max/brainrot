@echo off
REM Servidor estatico local para BRAINROT (sin dependencias).
cd /d "%~dp0"
echo BRAINROT dev server -^> http://localhost:3005
where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server 3005 --bind 127.0.0.1
) else (
  "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" -m http.server 3005 --bind 127.0.0.1
)
