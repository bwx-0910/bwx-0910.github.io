// 数据配置文件
// 此文件由 build.py 自动生成，请勿手动编辑
// 如需修改，请编辑 notes/*.md 或 poems/*.md 文件，然后运行 build.bat

const postsData = {
    notes: [
        {
            id: 'note-少有人走的路',
            title: '少有人走的路',
            icon: '📖',
            date: '2026-01-16',
            category: '心理学',
            tags: ["excerpt: 123213"],
            excerpt: '123213',
            content: `
1234
            `
        }
    ],
    poems: [
        {
            id: 'poem-阿房宫赋',
            source: '阿房宫赋',
            date: '2026-01-16',
            image: '',
            content: `呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦；使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。`
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
            tags: ['TED', '心理学', '压力管理']
        }
    ]
};

// 导出数据（用于其他 JS 文件引用）
window.postsData = postsData;
