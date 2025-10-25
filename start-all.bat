@echo off
echo Starting Ticketing System - Full Stack Application
echo.
echo This will start both backend and frontend servers.
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.
echo Press any key to continue...
pause

start "Backend Server" cmd /k "cd backend && npm install && npm start"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd frontend && npm install && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause

