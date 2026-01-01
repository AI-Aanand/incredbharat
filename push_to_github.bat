@echo off
cd /d "C:\Users\anand\Gemini_Projects\003_Traveller"
"C:\Program Files\Git\cmd\git.exe" init
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Initial commit: IncredBharat tourism app"
"C:\Program Files\Git\cmd\git.exe" branch -M main
"C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/AI-Aanand/incredbharat.git
"C:\Program Files\Git\cmd\git.exe" push -u origin main
pause
