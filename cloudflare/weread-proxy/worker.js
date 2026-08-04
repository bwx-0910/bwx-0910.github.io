/**
 * 微信读书搜索代理 — 部署到 Cloudflare Workers 后供 admin.html 调用
 * 部署：npm i -g wrangler && wrangler deploy
 */
export default {
  async fetch(request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');
    if (!keyword) {
      return json({ err: 'missing keyword' }, 400, corsHeaders);
    }

    const target =
      'https://weread.qq.com/web/search/global?keyword=' +
      encodeURIComponent(keyword) +
      '&maxIdx=0&fragmentSize=120';

    const resp = await fetch(target, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BookAdmin/1.0)' },
    });

    return new Response(resp.body, {
      status: resp.status,
      headers: {
        ...corsHeaders,
        'Content-Type': resp.headers.get('Content-Type') || 'application/json; charset=utf-8',
      },
    });
  },
};

function json(obj, status, corsHeaders) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
