// 主 JavaScript 文件

// 初始化 marked.js（Markdown 渲染）
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true,
        gfm: true
    });
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    renderAllPosts();
    initModal();
});

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-tab]'); // 只选择有 data-tab 的链接
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新导航激活状态
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // 切换内容区域
            const tabName = this.getAttribute('data-tab');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(`${tabName}-section`).classList.add('active');
        });
    });
}

// 渲染所有文章
function renderAllPosts() {
    renderNotes('all-posts', postsData.notes);
    renderNotes('notes-posts', postsData.notes);
    renderPoems('poems-posts', postsData.poems || []);
    renderDiaries('diary-posts', postsData.diaries || []);
    renderVideos('videos-posts', postsData.videos);
}

function escapeHtmlText(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// 渲染日记（Markdown，按日期一篇）
function renderDiaries(containerId, diaries) {
    const container = document.getElementById(containerId);

    if (!diaries || diaries.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📔</div>
                <p>暂无日记</p>
            </div>
        `;
        return;
    }

    container.innerHTML = diaries.map(d => {
        const raw = d.content || '';
        const len = raw.length;
        let sizeClass = 'diary-short';
        if (len > 600) {
            sizeClass = 'diary-long';
        } else if (len > 200) {
            sizeClass = 'diary-medium';
        }

        let bodyHtml = raw;
        if (typeof marked !== 'undefined') {
            bodyHtml = marked.parse(raw);
        } else {
            bodyHtml = '<p>' + escapeHtmlText(raw).replace(/\n/g, '</p><p>') + '</p>';
        }

        const title = d.title || '日记';

        return `
            <article class="diary-card ${sizeClass}">
                <header class="diary-header">
                    <time class="diary-date" datetime="${escapeHtmlText(d.date)}">${escapeHtmlText(d.date)}</time>
                    <h3 class="diary-title">${escapeHtmlText(title)}</h3>
                </header>
                <div class="diary-body">${bodyHtml}</div>
            </article>
        `;
    }).join('');
}

// 渲染笔记
function renderNotes(containerId, notes) {
    const container = document.getElementById(containerId);
    
    if (!notes || notes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <p>暂无笔记</p>
            </div>
        `;
        return;
    }

    container.innerHTML = notes.map(note => {
        // 生成笔记页面链接
        const noteLink = `note-${note.id.replace('note-', '')}.html`;
        
        return `
        <a href="${noteLink}" class="post-card-link">
            <div class="post-card">
                <div class="post-header">
                    <div class="post-icon">${note.icon}</div>
                    <h3 class="post-title">${note.title}</h3>
                    <div class="post-meta">
                        <span>📅 ${note.date}</span>
                        <span>📂 ${note.category}</span>
                    </div>
                </div>
                <div class="post-excerpt">
                    ${note.excerpt}
                </div>
                <div class="post-tags">
                    ${note.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            </div>
        </a>
        `;
    }).join('');
}

// 渲染摘录（自适应大小）
function renderPoems(containerId, poems) {
    const container = document.getElementById(containerId);
    
    if (!poems || poems.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📜</div>
                <p>暂无摘录</p>
            </div>
        `;
        return;
    }

    container.innerHTML = poems.map(poem => {
        // 根据内容长度确定大小类
        const contentLength = poem.content.length;
        let sizeClass = '';
        
        if (contentLength < 30) {
            sizeClass = 'poem-short';
        } else if (contentLength < 100) {
            sizeClass = 'poem-medium';
        } else {
            sizeClass = 'poem-long';
        }
        
        return `
            <div class="poem-card ${sizeClass}">
                ${poem.image ? `<img src="${poem.image}" alt="${poem.source}" class="poem-image">` : ''}
                <div class="poem-quote">${poem.content}</div>
                <div class="poem-source">——《${poem.source}》</div>
            </div>
        `;
    }).join('');
}

// 渲染视频
function renderVideos(containerId, videos) {
    const container = document.getElementById(containerId);
    
    if (!videos || videos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🎬</div>
                <p>暂无视频</p>
            </div>
        `;
        return;
    }

    container.innerHTML = videos.map(video => `
        <div class="video-card">
            <div class="video-thumbnail">
                ${video.thumbnail}
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="post-meta">
                    <span>📅 ${video.date}</span>
                </div>
                <p class="video-description">${video.description}</p>
                <div class="post-tags">
                    ${video.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <a href="${video.url}" target="_blank" class="video-link">观看视频 →</a>
            </div>
        </div>
    `).join('');
}

// 显示文章详情
function showPost(postId, type) {
    const modal = document.getElementById('postModal');
    const modalBody = document.getElementById('modal-body');
    
    let post;
    if (type === 'note') {
        post = postsData.notes.find(p => p.id === postId);
    }
    
    if (!post) return;

    // 渲染 Markdown 内容
    let content = post.content;
    if (typeof marked !== 'undefined') {
        content = marked.parse(post.content);
    }

    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

// 初始化模态框
function initModal() {
    const modal = document.getElementById('postModal');
    const closeBtn = document.querySelector('.close');

    // 点击关闭按钮
    closeBtn.addEventListener('click', closeModal);

    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC 键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('postModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // 恢复滚动
}

// 搜索功能（可选，留待扩展）
function searchPosts(keyword) {
    keyword = keyword.toLowerCase();
    
    const filteredNotes = postsData.notes.filter(note => 
        note.title.toLowerCase().includes(keyword) ||
        note.excerpt.toLowerCase().includes(keyword) ||
        note.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
    
    const filteredVideos = postsData.videos.filter(video =>
        video.title.toLowerCase().includes(keyword) ||
        video.description.toLowerCase().includes(keyword) ||
        video.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
    
    return {
        notes: filteredNotes,
        videos: filteredVideos
    };
}
