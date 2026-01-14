# 📚 读书笔记 & 视频分享博客

一个美观、简洁的静态博客网站，用于展示读书笔记和视频分享。基于纯 HTML/CSS/JavaScript 开发，无需任何构建工具，直接部署到 GitHub Pages。

## ✨ 特点

- 📝 **读书笔记展示** - 支持 Markdown 格式
- 🎬 **视频分享** - 展示并链接到视频平台
- 🎨 **美观界面** - 现代化渐变设计
- 📱 **响应式** - 完美支持手机、平板、电脑
- ⚡ **零依赖** - 无需构建工具，开箱即用
- 🚀 **GitHub Pages** - 免费托管，外网可访问

## 📦 文件结构

```
blog/
├── index.html          # 主页面
├── css/
│   └── style.css      # 样式文件
├── js/
│   ├── data.js        # 数据配置（笔记和视频）
│   └── main.js        # 主逻辑
├── deploy.bat         # Windows 部署脚本
└── README.md          # 说明文档
```

## 🚀 快速开始

### 方法 1: 本地预览

1. **直接打开**
   - 双击 `index.html` 在浏览器中打开
   - 或使用 VS Code 的 Live Server 插件

2. **添加内容**
   - 编辑 `js/data.js` 文件
   - 添加你的读书笔记和视频

### 方法 2: 部署到 GitHub Pages

#### 步骤 1: 创建 GitHub 仓库

1. 登录 GitHub: https://github.com
2. 点击右上角的 "+" → "New repository"
3. **仓库名称必须是**: `你的用户名.github.io`
   - 例如：如果你的用户名是 `zhangsan`，则仓库名为 `zhangsan.github.io`
4. 选择 **Public**（公开）
5. **不要**勾选任何初始化选项
6. 点击 "Create repository"

#### 步骤 2: 部署网站

**Windows 用户**（推荐）:

双击 `deploy.bat`，按提示输入 GitHub 用户名即可。

**或手动部署**:

```bash
# 1. 进入 blog 目录
cd blog

# 2. 初始化 Git
git init

# 3. 添加文件
git add .

# 4. 提交
git commit -m "Deploy: 部署读书笔记博客"

# 5. 连接到 GitHub（替换为你的用户名）
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 6. 设置分支
git branch -M main

# 7. 推送
git push -u origin main
```

#### 步骤 3: 访问网站

等待 1-2 分钟后，访问：

```
https://你的用户名.github.io
```

例如：`https://zhangsan.github.io`

## 📝 添加内容

### 添加读书笔记

编辑 `js/data.js` 文件，在 `notes` 数组中添加：

```javascript
{
    id: 'note-xxx',                    // 唯一ID
    title: '《书名》读书笔记',          // 标题
    icon: '📖',                        // 图标（emoji）
    date: '2026-01-14',               // 日期
    category: '分类',                  // 分类
    tags: ['标签1', '标签2'],         // 标签
    excerpt: '简短摘要...',            // 摘要
    content: `
# 笔记标题

这里写 Markdown 格式的完整笔记内容...

## 二级标题

- 列表项
- 列表项

**粗体文字**

> 引用
    `
}
```

### 添加视频

编辑 `js/data.js` 文件，在 `videos` 数组中添加：

```javascript
{
    id: 'video-xxx',                   // 唯一ID
    title: '视频标题',                  // 标题
    thumbnail: '🎬',                   // 缩略图（emoji）
    date: '2026-01-14',               // 日期
    description: '视频描述...',        // 描述
    url: 'https://...',               // 视频链接
    tags: ['标签1', '标签2']          // 标签
}
```

### 支持的视频平台

- YouTube: `https://www.youtube.com/watch?v=xxx`
- B站: `https://www.bilibili.com/video/xxx`
- 腾讯视频: `https://v.qq.com/x/page/xxx.html`
- 任何视频链接

## 🎨 自定义样式

编辑 `css/style.css` 文件，修改颜色主题：

```css
:root {
    --primary-color: #667eea;      /* 主色调 */
    --secondary-color: #764ba2;    /* 次要色调 */
    --text-color: #333;            /* 文字颜色 */
    /* ... 更多变量 */
}
```

## 🔄 更新网站

修改内容后，重新部署：

```bash
cd blog
git add .
git commit -m "更新内容"
git push
```

或双击 `deploy.bat` 脚本。

## 💡 使用技巧

### 1. Markdown 语法

笔记内容支持完整的 Markdown 语法：

- 标题：`# H1`, `## H2`, `### H3`
- 粗体：`**粗体**`
- 斜体：`*斜体*`
- 列表：`- 项目` 或 `1. 项目`
- 引用：`> 引用内容`
- 代码：`` `代码` `` 或 ``` ```代码块``` ```
- 链接：`[文字](URL)`

### 2. Emoji 图标

使用 Emoji 作为图标：

- 📖 书籍
- 🧠 心理学
- 💰 理财
- 🎬 视频
- 💻 编程
- 🌌 科学

复制粘贴到 `icon` 或 `thumbnail` 字段即可。

### 3. 视频嵌入（高级）

如果想直接在网页中播放视频，可以使用 iframe：

```html
<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/视频ID" 
    frameborder="0" allowfullscreen>
</iframe>
```

### 4. 添加图片

笔记中可以添加图片：

```markdown
![图片描述](图片URL)
```

图片可以：
- 上传到图床（如 SM.MS、imgur）
- 使用 GitHub 仓库中的图片
- 使用外部链接

## 🐛 常见问题

### Q: 访问 GitHub Pages 显示 404

A: 
1. 检查仓库名是否为 `用户名.github.io`
2. 确认文件已推送成功
3. 等待 1-2 分钟让 GitHub 部署
4. 访问 Settings → Pages 检查状态

### Q: 如何修改网站标题？

A: 编辑 `index.html`，修改：
- `<title>` 标签
- `.site-title` 和 `.site-subtitle` 的内容

### Q: 视频无法播放？

A: 
- 检查视频链接是否正确
- 某些平台不允许外部嵌入
- 建议使用"打开链接"方式观看

### Q: 如何添加搜索功能？

A: `js/main.js` 中已预留 `searchPosts()` 函数，可扩展添加搜索框。

### Q: 能否连接到之前的 Flask 后端？

A: 可以！保留静态前端，通过 API 调用后端实现文件上传等功能。

## 🔮 未来扩展

这个静态博客可以轻松扩展为动态系统：

1. **添加评论** - 使用 Gitalk 或 Disqus
2. **添加统计** - 使用 Google Analytics
3. **添加搜索** - 本地搜索或 Algolia
4. **连接后端** - 调用 API 实现上传、编辑等功能
5. **自动化** - GitHub Actions 自动部署

## 📚 参考资源

- [GitHub Pages 文档](https://docs.github.com/cn/pages)
- [Markdown 语法](https://markdown.com.cn/)
- [Marked.js](https://marked.js.org/) - Markdown 解析器

## 📄 许可证

MIT License - 自由使用和修改

## 🤝 贡献

欢迎提出建议和改进！

---

**开始记录你的阅读之旅吧！** 📖✨
