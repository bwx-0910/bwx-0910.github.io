@echo off
chcp 65001 > nul
echo ========================================
echo 📚 构建读书笔记数据
echo ========================================
echo.

REM 检查 Python 是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 Python
    echo.
    echo Python 是必需的，用于转换 Markdown 文件
    echo.
    echo 请访问以下网址下载安装 Python:
    echo https://www.python.org/downloads/
    echo.
    echo 安装时请勾选 "Add Python to PATH"
    echo.
    pause
    exit /b 1
)

echo [信息] Python 已安装
python --version
echo.

REM 检查 notes 目录
if not exist "notes" (
    echo [警告] notes 目录不存在，正在创建...
    mkdir notes
    echo [提示] 请在 notes 目录下添加你的 Markdown 笔记
    echo.
)

REM 统计笔记数量
set /a COUNT=0
for %%f in (notes\*.md) do (
    if /i not "%%~nf"=="笔记模板" if /i not "%%~nf"=="README" (
        set /a COUNT+=1
    )
)

echo [信息] 找到 %COUNT% 篇笔记
echo.

if %COUNT%==0 (
    echo [警告] 没有找到笔记文件
    echo.
    echo 请在 notes 目录下创建 .md 文件
    echo 或运行 add-note.bat 生成笔记模板
    echo.
    pause
    exit /b 0
)

echo [信息] 开始转换 Markdown 文件...
echo.

REM 运行 Python 转换脚本
python build.py

if errorlevel 1 (
    echo.
    echo [错误] 转换失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ 构建完成！
echo ========================================
echo.
echo 已生成: js\data.js
echo.
echo 下一步:
echo 1. 双击 index.html 本地预览
echo 2. 双击 deploy.bat 部署到 GitHub Pages
echo.
echo ========================================

pause
