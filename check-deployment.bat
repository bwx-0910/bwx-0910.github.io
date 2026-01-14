@echo off
chcp 65001 > nul
echo ========================================
echo 🔍 部署状态检查
echo ========================================
echo.

cd /d "%~dp0"

echo [检查 1] 本地 data.js 状态
echo ========================================
if exist "js\data.js" (
    echo ✅ js\data.js 存在
    echo.
    echo 文件大小:
    dir js\data.js | find "data.js"
    echo.
    echo 最后几行内容:
    powershell -Command "Get-Content js\data.js -Tail 10"
) else (
    echo ❌ js\data.js 不存在！
)
echo.
echo.

echo [检查 2] Git 状态
echo ========================================
git status
echo.
echo.

echo [检查 3] 最近的提交
echo ========================================
git log --oneline -3
echo.
echo.

echo [检查 4] 远程仓库状态
echo ========================================
echo 正在检查远程仓库...
git fetch origin main
git log origin/main --oneline -3
echo.
echo.

echo [检查 5] 本地和远程的差异
echo ========================================
git diff origin/main --name-only
echo.
if errorlevel 1 (
    echo ⚠️  本地和远程有差异
) else (
    echo ✅ 本地和远程一致
)
echo.
echo.

echo ========================================
echo 📊 检查完成
echo ========================================
echo.
echo 下一步:
echo 1. 访问 https://github.com/bwx-0910/bwx-0910.github.io/actions
echo    查看 GitHub Actions 状态
echo.
echo 2. 访问 https://raw.githubusercontent.com/bwx-0910/bwx-0910.github.io/main/js/data.js
echo    查看 GitHub 上的 data.js 内容
echo.
echo 3. 如果文件没有推送，运行:
echo    git push origin main
echo.
echo ========================================

pause
