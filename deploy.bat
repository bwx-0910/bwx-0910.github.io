@echo off
chcp 65001 > nul
echo ========================================
echo GitHub Pages 部署脚本
echo ========================================
echo.

set USERNAME=bwx-0910
set REPO=%USERNAME%.github.io

echo [信息] GitHub 用户名: %USERNAME%
echo [信息] 仓库名称: %REPO%
echo.

REM 添加所有修改
echo [信息] 添加文件...
git add .

REM 提交修改
echo [信息] 提交修改...
git commit -m "更新博客内容"

REM 推送到 GitHub
echo [信息] 推送到 GitHub...
git push origin main

echo.
echo ========================================
echo 🎉 部署完成！
echo ========================================
echo.
echo 访问地址: https://%USERNAME%.github.io
echo.
echo [提示] 首次部署可能需要等待 1-2 分钟生效
pause
