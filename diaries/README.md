# 日记目录

每天一篇 Markdown，文件名建议为 **`YYYY-MM-DD.md`**（与 `date` 字段一致），便于与后台「按日期保存」对应。

## Front Matter 示例

```yaml
---
date: 2026-03-24
title: 今日随笔
---

正文支持 **Markdown**，可写多段。
```

构建命令：`build.bat` 或 `python build.py`，会写入 `js/data.js` 并在首页「日记」栏展示。
