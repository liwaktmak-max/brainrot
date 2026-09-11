@echo off
REM Configura la URL publica de la web. Uso: configure.cmd tu-usuario [tu-repo]
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" configure.mjs %*
