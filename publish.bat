@echo off
chcp 65001 > nul
echo ========================================
echo 🚀 一键发布到 GitHub Pages
echo ========================================
echo.
echo 此脚本会自动:
echo 1. 构建笔记数据 (build.bat)
echo 2. 部署到 GitHub (deploy.bat)
echo.
echo ========================================
echo.

REM 步骤 1: 构建
echo [步骤 1/2] 构建笔记数据...
echo.
call build.bat
if errorlevel 1 (
    echo.
    echo [错误] 构建失败，停止部署
    pause
    exit /b 1
)

echo.
echo.
echo ========================================
echo.

REM 步骤 2: 部署
echo [步骤 2/2] 部署到 GitHub Pages...
echo.
call deploy.bat

echo.
echo ========================================
echo 🎉 发布完成！
echo ========================================
echo.
echo 访问你的博客: https://bwx-0910.github.io
echo.
echo ========================================

pause
