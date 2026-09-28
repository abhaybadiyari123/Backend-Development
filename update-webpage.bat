@echo off
cd /d "%~dp0"
echo ==============================================
echo  Updating GitHub Pages Webpage and Repository
echo ==============================================
echo.
git add index.html README.md
git commit -m "Update webpage with all lectures and experiments"
echo.
echo Pushing changes to GitHub...
git push origin main
echo.
echo ==============================================
echo  Done! Your webpage will be live in 1-2 minutes:
echo  https://abhaybadiyari123.github.io/Backend-Development/
echo ==============================================
echo.
pause
