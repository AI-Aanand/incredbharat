@echo off
echo Pushing Unified UI, Sidebar, and Travel Stats updates...
git add .
git commit -m "feat: Unified UI, Collapsible Sidebar, and My Travel Stats"
git push origin main
echo Deployment triggered successfully!
pause
