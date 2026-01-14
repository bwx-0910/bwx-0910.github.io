@echo off
chcp 65001 > nul
echo ========================================
echo 📝 读书笔记生成助手
echo ========================================
echo.

REM 检查 notes 目录
if not exist "notes" (
    echo [信息] 创建 notes 目录...
    mkdir notes
)

REM 获取书名
set /p BOOKNAME="请输入书名: "
if "%BOOKNAME%"=="" (
    echo [错误] 书名不能为空
    pause
    exit /b 1
)

REM 获取其他信息
set /p AUTHOR="请输入作者: "
set /p CATEGORY="请输入分类 (如: 心理学/历史/商业): "
set /p TAGS="请输入标签 (用逗号分隔): "
set /p EXCERPT="请输入简短摘要: "

REM 获取当前日期
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do (
    set TODAY=%%a-%%b-%%c
)

REM 生成文件名
set FILENAME=notes\%BOOKNAME%.md

echo.
echo ========================================
echo 正在生成笔记模板...
echo ========================================
echo.

REM 创建 Markdown 文件
(
echo ---
echo title: 《%BOOKNAME%》读书笔记
echo icon: 📖
echo date: %TODAY%
echo category: %CATEGORY%
echo tags: %TAGS%
echo excerpt: %EXCERPT%
echo ---
echo.
echo # 《%BOOKNAME%》读书笔记
echo.
echo **作者**：%AUTHOR%
echo **阅读日期**：%TODAY%
echo **推荐指数**：⭐⭐⭐⭐⭐
echo.
echo ---
echo.
echo ## 📚 基本信息
echo.
echo - **出版时间**：
echo - **页数**：
echo - **阅读耗时**：
echo.
echo ---
echo.
echo ## 🎯 核心观点
echo.
echo 1. 核心观点1...
echo 2. 核心观点2...
echo 3. 核心观点3...
echo.
echo ---
echo.
echo ## 📖 章节笔记
echo.
echo ### 第一部分
echo.
echo 主要内容...
echo.
echo ---
echo.
echo ## 💎 精彩摘录
echo.
echo ^> "精彩的句子..."
echo.
echo ---
echo.
echo ## 💡 我的思考
echo.
echo ### 启发一
echo.
echo 这本书让我...
echo.
echo ---
echo.
echo ## 🎯 实践应用
echo.
echo ### 在工作中
echo.
echo - 可以做什么...
echo.
echo ### 在生活中
echo.
echo - 如何改变...
echo.
echo ---
echo.
echo ## ⭐ 推荐理由
echo.
echo ### 适合人群
echo.
echo - 适合...
echo.
echo ### 为什么值得读
echo.
echo 这本书...
echo.
echo ---
echo.
echo ## 📝 总结
echo.
echo 用一句话总结...
echo.
echo ---
echo.
echo *记录于 %TODAY%*
) > "%FILENAME%"

echo ✅ 笔记模板已生成！
echo.
echo 文件位置: %FILENAME%
echo.
echo 下一步:
echo 1. 用文本编辑器打开这个文件
echo 2. 填写详细内容
echo 3. 保存后运行 deploy.bat 部署到网站
echo.
echo ========================================

REM 询问是否立即打开
set /p OPEN="是否立即打开编辑? (y/n): "
if /i "%OPEN%"=="y" (
    start "" "%FILENAME%"
)

pause
