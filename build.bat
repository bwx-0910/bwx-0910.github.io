@echo off
chcp 65001 > nul
echo ========================================
echo 构建博客数据和笔记页面
echo ========================================
echo.

python build.py

echo.
echo ========================================
echo 构建完成！
echo ========================================
echo.
echo 提示：可运行 deploy.bat 部署到 GitHub Pages
pause
