@echo off
chcp 65001 > nul
echo ========================================
echo 🔄 同步并发布
echo ========================================
echo.
echo 此脚本会:
echo 1. 从 GitHub 拉取最新的笔记
echo 2. 构建数据文件
echo 3. 部署到 GitHub
echo.
echo ========================================
echo.

cd /d "%~dp0"

REM 检查是否已初始化 Git
if not exist ".git" (
    echo [错误] 未找到 .git 目录
    echo.
    echo 请先运行一次 deploy.bat 初始化 Git 仓库
    pause
    exit /b 1
)

echo [步骤 1/3] 从 GitHub 拉取最新内容...
echo.

git fetch origin main
if errorlevel 1 (
    echo [错误] 拉取失败，请检查网络连接
    pause
    exit /b 1
)

echo [信息] 合并远程更改...
git merge origin/main --no-edit
if errorlevel 1 (
    echo.
    echo [警告] 合并时发现冲突
    echo 请手动解决冲突后重新运行此脚本
    pause
    exit /b 1
)

echo [完成] 同步完成
echo.
echo.

echo [步骤 2/3] 构建数据文件...
echo.
call build.bat
if errorlevel 1 (
    echo [错误] 构建失败
    pause
    exit /b 1
)

echo.
echo.

echo [步骤 3/3] 部署到 GitHub...
echo.

git add .
git commit -m "Update: 同步笔记并重新构建"
git push origin main

if errorlevel 1 (
    echo [错误] 推送失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ 同步并发布完成！
echo ========================================
echo.
echo 访问你的博客: https://bwx-0910.github.io
echo.
echo 提示: 等待 1-2 分钟后刷新浏览器（Ctrl + F5）
echo.
echo ========================================

pause
