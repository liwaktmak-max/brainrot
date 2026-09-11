@echo off
REM Configura la URL publica de la web. Uso: configure.cmd tu-usuario [tu-repo]
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel%==0 (
  node configure.mjs %*
) else (
  "%ProgramFiles%\nodejs\node.exe" configure.mjs %*
)
