#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
拉取 B 站用户投稿列表，写入 js/bilibili-videos.json（供首页「视频」区展示）。
接口：GET https://api.bilibili.com/x/space/arc/list （需 Referer，无需登录）

用法：在 blog 目录执行  python scripts/fetch_bilibili_videos.py
"""
from __future__ import annotations

import json
import ssl
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

# 你的 B 站空间 mid（空间页 URL 中的一串数字）
MID = 23821947
SPACE_URL = f"https://space.bilibili.com/{MID}/upload/video"
PS = 30
MAX_PAGES = 20

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)


def cn_date(ts: int) -> str:
    """时间戳 -> 北京时间日期"""
    tz = timezone(timedelta(hours=8))
    return datetime.fromtimestamp(ts, tz=tz).strftime("%Y-%m-%d")


def format_duration(sec: int) -> str:
    sec = int(sec)
    h, sec = divmod(sec, 3600)
    m, s = divmod(sec, 60)
    if h:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m}:{s:02d}"


def https_pic(url: str) -> str:
    if url.startswith("http://"):
        return "https://" + url[7:]
    return url


def fetch_page(mid: int, pn: int, ps: int) -> dict | None:
    api = (
        f"https://api.bilibili.com/x/space/arc/list?"
        f"mid={mid}&ps={ps}&pn={pn}&order=pubdate"
    )
    req = Request(
        api,
        headers={
            "User-Agent": UA,
            "Referer": "https://space.bilibili.com/",
            "Accept": "application/json",
        },
    )
    ctx = ssl.create_default_context()
    with urlopen(req, timeout=30, context=ctx) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    out = root / "js" / "bilibili-videos.json"

    all_items: list[dict] = []
    pn = 1
    total_count = None

    while pn <= MAX_PAGES:
        try:
            raw = fetch_page(MID, pn, PS)
        except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as e:
            print(f"请求失败 pn={pn}: {e}", file=sys.stderr)
            return 1

        if not raw or raw.get("code") != 0:
            msg = (raw or {}).get("message", "unknown")
            print(f"API 错误: code={raw.get('code') if raw else None} {msg}", file=sys.stderr)
            return 1

        data = raw["data"]
        archives = data.get("archives") or []
        page = data.get("page") or {}
        if total_count is None:
            total_count = page.get("count", len(archives))

        if not archives:
            break

        for a in archives:
            bvid = a.get("bvid", "")
            title = a.get("title", "")
            pic = https_pic(a.get("pic") or "")
            pub = a.get("pubdate") or 0
            stat = a.get("stat") or {}
            views = stat.get("view", 0)
            likes = stat.get("like", 0)
            dur = a.get("duration") or 0

            all_items.append(
                {
                    "id": bvid or str(a.get("aid", "")),
                    "title": title,
                    "pic": pic,
                    "thumbnail": pic,
                    "date": cn_date(pub),
                    "description": f"播放 {views} · 点赞 {likes} · 时长 {format_duration(dur)}",
                    "url": f"https://www.bilibili.com/video/{bvid}",
                    "tags": ["哔哩哔哩"],
                }
            )

        if len(all_items) >= (total_count or 0) or len(archives) < PS:
            break
        pn += 1

    payload = {
        "source": "bilibili",
        "mid": MID,
        "spaceUrl": SPACE_URL,
        "updatedAt": datetime.now(timezone(timedelta(hours=8))).isoformat(timespec="seconds"),
        "videos": all_items,
    }

    out.parent.mkdir(parents=True, exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"已写入 {out.relative_to(root)}，共 {len(all_items)} 个视频")
    return 0


if __name__ == "__main__":
    sys.exit(main())
