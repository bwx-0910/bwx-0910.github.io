/**
 * 构建后封面多为 images/covers/ 本地路径。
 * 未镜像的豆瓣 URL 用 allorigins 预览（weserv 已不可用）。
 */
function proxyCoverUrl(url) {
    if (!url || typeof url !== 'string') return url || '';
    const u = url.trim().replace(/^http:\/\//i, 'https://');
    if (/^images\/covers\//i.test(u)) return u;
    if (!/doubanio\.com/i.test(u)) return u;
    return 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u);
}

function coverDisplayUrls(rawUrl) {
    if (!rawUrl) return [];
    const u = rawUrl.trim().replace(/^http:\/\//i, 'https://');
    if (/^images\/covers\//i.test(u)) return [u];
    if (!/doubanio\.com/i.test(u)) return [u];
    const enc = encodeURIComponent(u);
    return [
        'https://api.allorigins.win/raw?url=' + enc,
        'https://corsproxy.io/?' + enc
    ];
}
