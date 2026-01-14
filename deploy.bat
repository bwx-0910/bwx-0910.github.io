@echo off
chcp 65001 > nul
echo ========================================
echo GitHub Pages 部署脚本
echo ========================================
echo.

REM 检查是否在正确的目录
if not exist "index.html" (
    echo [错误] 请在 blog 目录下运行此脚本
    pause
    exit /b 1
)

REM 检查 Git 是否安装
git --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 Git，请先安装 Git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [信息] Git 已安装
echo.

REM GitHub 用户名（已预设）
set USERNAME=bwx-0910

echo [信息] GitHub 用户名: %USERNAME%

echo.
echo ========================================
echo 准备部署到 GitHub Pages
echo ========================================
echo 仓库名称: %USERNAME%.github.io
echo 访问地址: https://%USERNAME%.github.io
echo ========================================
echo.

REM 初始化 Git 仓库
if not exist ".git" (
    echo [信息] 初始化 Git 仓库...
    git init
    echo [完成] Git 仓库初始化完成
    echo.
)

REM 添加所有文件
echo [信息] 添加文件到 Git...
git add .
echo [完成] 文件添加完成
echo.

REM 提交更改
echo [信息] 提交更改...
git commit -m "Deploy: 部署读书笔记博客"
if errorlevel 1 (
    echo [警告] 没有新的更改需要提交
    echo.
) else (
    echo [完成] 提交完成
    echo.
)

REM 设置分支名称
git branch -M main

REM 添加远程仓库（使用 SSH）
echo [信息] 添加远程仓库（SSH方式）...
git remote remove origin 2>nul
git remote add origin git@github.com:%USERNAME%/%USERNAME%.github.io.git
echo [完成] 远程仓库设置完成（SSH）
echo.

REM 推送到 GitHub
echo [信息] 推送到 GitHub...
echo [提示] 首次推送可能需要登录 GitHub
echo.
git push -u origin main --force
if errorlevel 1 (
    echo.
    echo [错误] 推送失败，请检查：
    echo 1. GitHub 用户名是否正确
    echo 2. 是否已在 GitHub 创建 %USERNAME%.github.io 仓库
    echo 3. 网络连接是否正常
    echo 4. Git 是否已配置登录凭据
    echo.
    echo 如果仓库不存在，请访问:
    echo https://github.com/new
    echo 创建名为 %USERNAME%.github.io 的公开仓库
    pause
    exit /b 1
)

echo.
echo ========================================
echo 🎉 部署成功！
echo ========================================
echo.
echo 访问地址: https://%USERNAME%.github.io
echo.
echo [提示] 首次部署可能需要等待 1-2 分钟生效
echo [提示] 如无法访问，请检查 GitHub 仓库的 Settings → Pages 设置
echo.
echo ========================================

pause
