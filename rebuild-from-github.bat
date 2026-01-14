@echo off
chcp 65001 > nul
echo ========================================
echo 🔄 从 GitHub 重建数据文件
echo ========================================
echo.
echo 这个脚本会:
echo 1. 清除本地文件
echo 2. 从 GitHub 克隆最新内容
echo 3. 构建 data.js
echo 4. 推送回 GitHub
echo.
echo ⚠️  警告: 会删除本地的 .git 文件夹
echo.
set /p CONFIRM="确定要继续吗? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo 已取消
    pause
    exit /b 0
)
echo.
echo ========================================
echo.

cd /d "%~dp0"

REM 1. 备份重要文件
echo [步骤 1/5] 备份配置文件...
if exist ".git" (
    echo [信息] 删除旧的 .git 目录...
    rmdir /s /q .git
)
echo [完成]
echo.

REM 2. 克隆仓库
echo [步骤 2/5] 从 GitHub 克隆仓库...
echo.
git clone git@github.com:bwx-0910/bwx-0910.github.io.git temp_repo
if errorlevel 1 (
    echo [错误] 克隆失败
    echo.
    echo 可能的原因:
    echo 1. 网络问题
    echo 2. SSH 密钥未配置
    echo 3. 仓库地址错误
    echo.
    pause
    exit /b 1
)

echo [完成]
echo.

REM 3. 复制 notes 文件到当前目录
echo [步骤 3/5] 复制最新的笔记文件...
xcopy /s /y temp_repo\notes notes\
echo [完成]
echo.

REM 4. 清理临时目录
echo [步骤 4/5] 清理临时文件...
rmdir /s /q temp_repo
echo [完成]
echo.

REM 5. 构建 data.js
echo [步骤 5/5] 构建 data.js...
echo.
call build.bat
if errorlevel 1 (
    echo [错误] 构建失败
    pause
    exit /b 1
)
echo.

REM 6. 初始化并推送
echo [步骤 6/6] 推送到 GitHub...
echo.
git init
git add .
git commit -m "重建: 基于 GitHub 上的笔记重新生成 data.js"
git branch -M main
git remote add origin git@github.com:bwx-0910/bwx-0910.github.io.git
git push -f origin main

if errorlevel 1 (
    echo [错误] 推送失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ 重建完成！
echo ========================================
echo.
echo 所有笔记已从 GitHub 同步
echo data.js 已重新生成并推送
echo.
echo 访问: https://bwx-0910.github.io
echo 等待 1-2 分钟后刷新（Ctrl + F5）
echo.
echo ========================================

pause
