#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Markdown 笔记转换脚本
将 notes/*.md 文件自动转换为 data.js
"""

import os
import re
import json
from pathlib import Path
from datetime import datetime

def parse_frontmatter(content):
    """解析 Markdown 文件的 Front Matter"""
    pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
    match = re.match(pattern, content, re.DOTALL)
    
    if not match:
        return None, content
    
    frontmatter_text = match.group(1)
    markdown_content = match.group(2)
    
    # 解析 YAML 风格的配置
    frontmatter = {}
    for line in frontmatter_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip()
    
    return frontmatter, markdown_content

def convert_notes_to_js():
    """转换所有笔记文件为 JavaScript 数据"""
    notes_dir = Path('notes')
    
    if not notes_dir.exists():
        print('❌ notes 目录不存在')
        return
    
    notes = []
    
    # 遍历所有 .md 文件
    for md_file in notes_dir.glob('*.md'):
        # 跳过模板和说明文件
        if md_file.name in ['笔记模板.md', 'README.md']:
            continue
        
        print(f'📝 处理: {md_file.name}')
        
        try:
            # 读取文件
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 解析 Front Matter
            frontmatter, markdown_content = parse_frontmatter(content)
            
            if not frontmatter:
                print(f'  ⚠️  跳过（没有 Front Matter）: {md_file.name}')
                continue
            
            # 生成 ID（从文件名）
            note_id = 'note-' + md_file.stem.lower().replace(' ', '-')
            
            # 构建笔记对象
            note = {
                'id': note_id,
                'title': frontmatter.get('title', md_file.stem),
                'icon': frontmatter.get('icon', '📖'),
                'date': frontmatter.get('date', datetime.now().strftime('%Y-%m-%d')),
                'category': frontmatter.get('category', '未分类'),
                'tags': [tag.strip() for tag in frontmatter.get('tags', '').split(',') if tag.strip()],
                'excerpt': frontmatter.get('excerpt', ''),
                'content': markdown_content.strip()
            }
            
            notes.append(note)
            print(f'  ✅ 成功')
            
        except Exception as e:
            print(f'  ❌ 错误: {e}')
    
    # 按日期排序（最新的在前）
    notes.sort(key=lambda x: x['date'], reverse=True)
    
    # 生成 JavaScript 文件
    generate_data_js(notes)
    
    print(f'\n✅ 转换完成！共处理 {len(notes)} 篇笔记')

def generate_data_js(notes):
    """生成 data.js 文件"""
    
    # JavaScript 字符串需要转义
    def escape_js_string(s):
        s = s.replace('\\', '\\\\')
        s = s.replace('`', '\\`')
        s = s.replace('${', '\\${')
        return s
    
    # 构建 JavaScript 代码
    js_code = '// 数据配置文件\n'
    js_code += '// 此文件由 build.py 自动生成，请勿手动编辑\n'
    js_code += '// 如需修改，请编辑 notes/*.md 文件，然后运行 build.bat\n\n'
    js_code += 'const postsData = {\n'
    js_code += '    notes: [\n'
    
    for i, note in enumerate(notes):
        js_code += '        {\n'
        js_code += f"            id: '{note['id']}',\n"
        js_code += f"            title: '{escape_js_string(note['title'])}',\n"
        js_code += f"            icon: '{note['icon']}',\n"
        js_code += f"            date: '{note['date']}',\n"
        js_code += f"            category: '{note['category']}',\n"
        js_code += f"            tags: {json.dumps(note['tags'], ensure_ascii=False)},\n"
        js_code += f"            excerpt: '{escape_js_string(note['excerpt'])}',\n"
        js_code += f"            content: `\n{escape_js_string(note['content'])}\n            `\n"
        js_code += '        }'
        
        if i < len(notes) - 1:
            js_code += ','
        js_code += '\n'
    
    js_code += '    ],\n'
    js_code += '    videos: [\n'
    
    # 保留原有的视频数据（如果存在）
    data_js_path = Path('js/data.js')
    if data_js_path.exists():
        with open(data_js_path, 'r', encoding='utf-8') as f:
            original_content = f.read()
            
        # 提取 videos 数组（改进的正则，使用字符类匹配到正确的闭合括号）
        # 使用更复杂的模式来正确匹配嵌套的数组
        videos_match = re.search(r'videos:\s*\[([\s\S]*)\]\s*\};', original_content)
        if videos_match:
            # 获取 videos 数组的内容（不包括最后的 ]};）
            videos_content = videos_match.group(1).strip()
            if videos_content:
                js_code += videos_content + '\n'
    
    js_code += '    ]\n'
    js_code += '};\n\n'
    js_code += '// 导出数据（用于其他 JS 文件引用）\n'
    js_code += 'window.postsData = postsData;\n'
    
    # 写入文件
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(js_code)
    
    print(f'📄 已生成: js/data.js')

if __name__ == '__main__':
    print('='*50)
    print('📚 Markdown 笔记转换工具')
    print('='*50)
    print()
    
    convert_notes_to_js()
    
    print()
    print('='*50)
    print('下一步: 运行 deploy.bat 部署到 GitHub Pages')
    print('='*50)
