// 数据配置文件
// 此文件由 build.py 自动生成，请勿手动编辑
// 如需修改，请编辑 notes/*.md 文件，然后运行 build.bat

const postsData = {
    notes: [
        {
            id: 'note-123',
            title: '《原则》读书笔记',
            icon: '📊',
            date: '2026-01-14',
            category: '管理',
            tags: ["管理", "决策", "原则"],
            excerpt: '达利欧分享的人生和工作原则，帮助我建立系统化思维...',
            content: `
# 《原则》读书笔记

这本书让我学到了...
            `
        },
        {
            id: 'note-少有人走的路',
            title: '少有人走的路',
            icon: '📖',
            date: '2026-01-14',
            category: '心理学',
            tags: [],
            excerpt: '123213',
            content: `
123123
            `
        }
    ],
    videos: [






        {
            id: 'video-1',
            title: 'TED演讲：如何在压力下保持冷静',
            thumbnail: '🎤',
            date: '2026-01-12',
            description: '这个TED演讲分享了在高压环境下保持冷静的科学方法。演讲者通过神经科学研究，揭示了压力对大脑的影响，以及如何通过简单的技巧来管理压力。',
            url: 'https://www.youtube.com/watch?v=example1',
            tags: ['TED', '心理学', '压力管理'                        ]
};

// 导出数据（用于其他 JS 文件引用）
window.postsData = postsData;
