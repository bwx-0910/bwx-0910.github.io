# ⚡ 快速开始 - bwx-0910

你的博客将部署到：**https://bwx-0910.github.io**

## 🚀 三步部署

### 第 1 步：创建 GitHub 仓库

1. **登录 GitHub**: https://github.com/bwx-0910
2. **点击右上角 "+"** → "New repository"
3. **仓库名称填写**: `bwx-0910.github.io`（必须严格匹配）
4. **选择 Public**（公开）
5. **不要勾选任何初始化选项**
6. **点击 "Create repository"**

### 第 2 步：运行部署脚本

1. **进入 blog 目录**
2. **双击 `deploy.bat`**
3. **等待部署完成**

就这么简单！脚本已经预设了你的用户名 `bwx-0910`。

### 第 3 步：访问你的博客

等待 1-2 分钟后，访问：

🌐 **https://bwx-0910.github.io**

## 📝 添加你的第一篇笔记

### 1. 打开数据文件

编辑文件：`blog/js/data.js`

### 2. 修改示例笔记

找到 `notes` 数组，修改或添加你自己的笔记：

```javascript
{
    id: 'my-note-1',
    title: '我的第一篇读书笔记',
    icon: '📖',
    date: '2026-01-14',
    category: '个人成长',
    tags: ['读书', '笔记'],
    excerpt: '今天读了一本好书，有很多收获...',
    content: `
# 我的第一篇笔记

## 主要内容

这里写你的笔记内容...

### 重点摘录

- 重点 1
- 重点 2

### 我的感悟

这里写你的想法...
    `
}
```

### 3. 重新部署

修改后，再次双击 `deploy.bat` 即可更新网站。

## 🎬 添加视频

编辑 `blog/js/data.js`，在 `videos` 数组中添加：

```javascript
{
    id: 'my-video-1',
    title: '推荐的视频',
    thumbnail: '🎬',
    date: '2026-01-14',
    description: '这是一个很有价值的视频...',
    url: 'https://www.bilibili.com/video/你的视频链接',
    tags: ['学习', '分享']
}
```

## 🎨 自定义博客

### 修改标题和副标题

编辑 `blog/index.html`，找到：

```html
<h1 class="site-title">📚 读书笔记 & 视频分享</h1>
<p class="site-subtitle">记录阅读，分享知识</p>
```

改成你喜欢的文字。

### 修改颜色主题

编辑 `blog/css/style.css`，找到：

```css
:root {
    --primary-color: #667eea;      /* 主色调 */
    --secondary-color: #764ba2;    /* 次色调 */
}
```

换成你喜欢的颜色代码。

### 修改关于页面

编辑 `blog/index.html`，找到关于部分，改成你的介绍。

## 🔄 日常更新流程

1. **编辑 `js/data.js`** - 添加或修改内容
2. **本地预览** - 双击 `index.html` 查看效果
3. **部署更新** - 双击 `deploy.bat`
4. **刷新网页** - 访问你的博客查看更新

## 💡 Markdown 语法提示

笔记支持 Markdown 格式：

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文字**
*斜体文字*

- 无序列表
- 列表项

1. 有序列表
2. 列表项

> 引用的文字

`代码`

[链接文字](URL)
```

## 📚 推荐的笔记结构

```markdown
# 《书名》读书笔记

## 基本信息
- 作者：
- 出版时间：
- 阅读日期：

## 核心观点
主要观点总结...

## 精彩摘录
> 原文摘录

## 个人思考
我的理解和感悟...

## 行动计划
读完这本书，我打算...

## 推荐指数
⭐⭐⭐⭐⭐ 5/5
```

## 🎯 检查清单

部署前确认：

- [ ] 已在 GitHub 创建 `bwx-0910.github.io` 仓库
- [ ] 仓库是公开的（Public）
- [ ] 已修改示例内容为自己的笔记
- [ ] 已本地预览过效果
- [ ] 准备好运行 `deploy.bat`

## 🆘 遇到问题？

### 推送失败

**可能需要登录 GitHub**：
- 会自动打开浏览器
- 点击授权即可

### 404 错误

- 检查仓库名是否为 `bwx-0910.github.io`
- 等待 1-2 分钟让 GitHub 部署
- 访问仓库 Settings → Pages 查看状态

### 样式没加载

- 确保文件结构完整
- 清除浏览器缓存（Ctrl + F5）

## 📖 更多帮助

- `README.md` - 完整功能说明
- `DEPLOY_GUIDE.md` - 超详细部署教程
- GitHub Issues - 提问反馈

## 🎊 准备好了吗？

开始你的部署之旅：

1. ✅ 创建 GitHub 仓库
2. ✅ 运行 `deploy.bat`
3. ✅ 访问 https://bwx-0910.github.io
4. ✅ 分享你的博客！

---

**祝部署顺利！** 🚀
