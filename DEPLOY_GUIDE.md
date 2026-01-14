# 🚀 GitHub Pages 部署完整指南

5 分钟部署你的读书笔记博客到 GitHub Pages！

## 📋 准备工作

### 1. 注册 GitHub 账号

如果还没有 GitHub 账号：

1. 访问 https://github.com/signup
2. 填写邮箱、密码、用户名
3. 验证邮箱
4. 完成注册

**记住你的用户名**，后面会用到！

### 2. 安装 Git

**Windows 用户**:

1. 下载：https://git-scm.com/download/win
2. 双击安装，一路 Next
3. 打开 CMD 或 PowerShell，输入 `git --version` 验证安装

**Mac 用户**:

```bash
# 安装 Homebrew（如果还没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Git
brew install git
```

**Linux 用户**:

```bash
# Ubuntu/Debian
sudo apt install git

# CentOS/Fedora
sudo yum install git
```

## 🎯 方法一：一键部署（推荐）

### Windows 用户

1. **打开 blog 文件夹**
2. **双击 `deploy.bat`**
3. **输入你的 GitHub 用户名**
4. **等待部署完成**

就这么简单！🎉

### 首次部署可能需要登录

如果提示需要登录 GitHub：

1. **使用浏览器登录**（推荐）
   - 会自动打开浏览器
   - 点击授权即可

2. **或使用 Personal Access Token**
   - 访问：https://github.com/settings/tokens
   - 点击"Generate new token (classic)"
   - 勾选 `repo` 权限
   - 生成并复制 token
   - 在 Git 要求输入密码时，粘贴 token

## 🎯 方法二：手动部署

### 步骤 1: 创建 GitHub 仓库

1. **登录 GitHub**: https://github.com

2. **创建新仓库**:
   - 点击右上角 "+" → "New repository"

3. **仓库配置**:
   - **Repository name**: `你的用户名.github.io`
     - ⚠️ 必须严格按照这个格式！
     - 例如：用户名是 `zhangsan`，则填 `zhangsan.github.io`
   - **Public**: 必须选择公开
   - **不要勾选任何初始化选项**
   - 点击 "Create repository"

### 步骤 2: 部署到 GitHub

```bash
# 1. 打开命令行，进入 blog 目录
cd blog

# 2. 初始化 Git 仓库
git init

# 3. 配置 Git 用户信息（首次使用）
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 4. 添加所有文件
git add .

# 5. 提交
git commit -m "Deploy: 部署读书笔记博客"

# 6. 设置主分支
git branch -M main

# 7. 连接远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 8. 推送到 GitHub
git push -u origin main
```

### 步骤 3: 等待生效

1. 推送成功后，等待 **1-2 分钟**
2. 访问 `https://你的用户名.github.io`
3. 看到你的博客！🎉

### 检查部署状态

如果无法访问：

1. 访问你的仓库页面
2. 点击 **Settings**（设置）
3. 左侧找到 **Pages**
4. 查看部署状态

应该显示：
```
Your site is published at https://你的用户名.github.io
```

## 📝 添加你的第一篇笔记

### 1. 编辑数据文件

打开 `blog/js/data.js`，找到 `notes` 数组。

### 2. 添加新笔记

复制下面的模板，修改内容：

```javascript
{
    id: 'my-note-1',  // 改成你的ID
    title: '《你读的书》读书笔记',  // 改成你的标题
    icon: '📖',
    date: '2026-01-14',  // 改成今天的日期
    category: '分类名称',  // 改成你的分类
    tags: ['标签1', '标签2'],  // 改成你的标签
    excerpt: '这里写简短摘要，会显示在卡片上...',
    content: `
# 笔记标题

## 要点一

这里写具体内容...

## 要点二

继续写内容...

### 小标题

- 列表项 1
- 列表项 2

> 引用的文字

**这是粗体**

*这是斜体*
    `
}
```

### 3. 保存并重新部署

```bash
cd blog
git add .
git commit -m "添加新笔记"
git push
```

或直接运行 `deploy.bat`。

## 🎬 添加视频

### 1. 编辑数据文件

打开 `blog/js/data.js`，找到 `videos` 数组。

### 2. 添加新视频

```javascript
{
    id: 'my-video-1',
    title: '视频标题',
    thumbnail: '🎬',  // 可以换成其他 emoji
    date: '2026-01-14',
    description: '视频的描述...',
    url: 'https://www.bilibili.com/video/你的视频链接',
    tags: ['标签1', '标签2']
}
```

### 3. 支持的平台

- YouTube
- B站
- 优酷
- 腾讯视频
- 任何视频网站

## 🎨 自定义外观

### 修改颜色

编辑 `blog/css/style.css`，找到顶部的 `:root`：

```css
:root {
    --primary-color: #667eea;      /* 改成你喜欢的颜色 */
    --secondary-color: #764ba2;    /* 改成你喜欢的颜色 */
    /* ... */
}
```

### 修改标题

编辑 `blog/index.html`，找到：

```html
<h1 class="site-title">📚 读书笔记 & 视频分享</h1>
<p class="site-subtitle">记录阅读，分享知识</p>
```

改成你想要的文字。

## 🔄 日常更新流程

### 1. 修改内容

- 添加新笔记到 `js/data.js`
- 或修改现有内容

### 2. 本地预览

双击 `index.html` 在浏览器中预览。

### 3. 部署更新

**Windows**: 双击 `deploy.bat`

**或手动**:
```bash
cd blog
git add .
git commit -m "更新内容"
git push
```

### 4. 等待生效

刷新网页（可能需要清除缓存：Ctrl + F5）

## 🆘 常见问题

### ❌ 推送失败：permission denied

**原因**: 没有登录或没有权限

**解决**:
1. 检查用户名是否正确
2. 配置 Git 凭据：
   ```bash
   git config --global credential.helper store
   ```
3. 重新推送，输入 GitHub 用户名和 Token

### ❌ 网页显示 404

**可能原因**:
1. 仓库名不正确（必须是 `用户名.github.io`）
2. 仓库不是公开的
3. 刚部署，还没生效（等 1-2 分钟）

**解决**:
1. 检查仓库设置 → Pages
2. 确认 Source 设置为 `main` 分支
3. 等待绿色勾号出现

### ❌ 样式没有加载

**原因**: 路径问题

**解决**: 确保文件结构正确：
```
blog/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── data.js
    └── main.js
```

### ❌ 中文乱码

**解决**: 确保所有文件保存为 **UTF-8 编码**。

在 VS Code 中：
- 右下角点击编码
- 选择 "Save with Encoding"
- 选择 "UTF-8"

## 🎓 进阶技巧

### 1. 绑定自定义域名

1. 购买域名（阿里云、腾讯云等）
2. 添加 DNS 记录：
   ```
   类型: CNAME
   主机记录: www
   记录值: 你的用户名.github.io
   ```
3. 在仓库根目录创建 `CNAME` 文件，写入你的域名
4. 等待生效

### 2. 启用 HTTPS

GitHub Pages 自动支持 HTTPS，访问时使用：
```
https://你的用户名.github.io
```

### 3. 添加统计

在 `</body>` 前添加 Google Analytics 或百度统计代码。

### 4. 添加评论

使用 Gitalk 或 Giscus 添加评论功能。

## 📚 学习资源

- [Git 教程](https://git-scm.com/book/zh/v2)
- [GitHub Pages 文档](https://docs.github.com/cn/pages)
- [Markdown 语法](https://markdown.com.cn/)
- [HTML/CSS 教程](https://www.runoob.com/html/html-tutorial.html)

## 💡 下一步

1. ✅ 部署成功
2. ✅ 添加第一篇笔记
3. ✅ 分享给朋友
4. 🔮 考虑后续扩展（文件上传、评论等）

---

**恭喜你完成部署！开始记录你的阅读之旅吧！** 📖✨

有问题？查看：
- `README.md` - 完整使用说明
- GitHub Issues - 提问和反馈
