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
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新导航激活状态
            navLinks.forEach(l => l.classList.remove('active'));
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
    renderVideos('videos-posts', postsData.videos);
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
