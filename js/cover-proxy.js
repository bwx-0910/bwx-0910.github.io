/**
 * 豆瓣 img.doubanio.com 禁止外链，GitHub Pages 等站点需经图片代理加载。
 * 与 build.py 中 proxy_cover_url 逻辑一致；笔记 md 仍存原始豆瓣 URL。
 */
function proxyCoverUrl(url) {
    if (!url || typeof url !== 'string') return url || '';
    const u = url.trim().replace(/^http:\/\//i, 'https://');
    if (!/doubanio\.com/i.test(u)) return u;
    const hostPath = u.replace(/^https?:\/\//i, '');
    return 'https://images.weserv.nl/?url=' + encodeURIComponent(hostPath);
}

/** 豆瓣封面代理列表（主站失败时依次尝试） */
function coverDisplayUrls(rawUrl) {
    if (!rawUrl) return [];
    const u = rawUrl.trim().replace(/^http:\/\//i, 'https://');
    if (!/doubanio\.com/i.test(u)) return [u];
    const hostPath = u.replace(/^https?:\/\//i, '');
    const enc = encodeURIComponent(hostPath);
    return [
        'https://images.weserv.nl/?url=' + enc,
        'https://wsrv.nl/?url=' + enc
    ];
}
