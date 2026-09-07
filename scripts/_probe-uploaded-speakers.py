# -*- coding: utf-8 -*-
"""探測官網是否已有 speakers-upload 檔名。"""
from pathlib import Path
import urllib.request

NAMES = [
    'zhang-shuyuan.jpg',
    'xu-jiapu.jpg',
    'xie-qijun.jpg',
    'lin-ruifan.jpg',
    'guo-houzhang.jpg',
    'geng-manlun.jpg',
    'zhang-wenyi.jpg',
    'cai-menggu.jpg',
    'zeng-wenjun.jpg',
    'ma-yunjia.jpg',
    'zeng-wenqi.jpg',
    'liu-xuanlun.jpg',
    'lu-shizhong.jpg',
    'chen-yanfang.jpg',
    'li-xiaoping.jpg',
    'xu-weimin.jpg',
]

BASES = [
    'https://www.tcawg.com/travel/data/images/202609/speakers/',
    'https://www.tcawg.com/travel/data/images/202609/speaker/',
    'https://www.tcawg.com/travel/data/images/202609/',
    'https://www.tcawg.com/data/images/202609/speakers/',
    'https://www.tcawg.com/data/images/202609/',
    'https://www.tcawg.com/travel/data/images/202603/speakers/',
    'https://www.tcawg.com/travel/data/images/speakers/',
    'https://www.tcawg.com/travel/data/images/202609/meting/',
]

# also Chinese filenames
CN = [
    '張書元.jpg',
    '許家樸.jpg',
    '謝其峻.jpg',
    '林芮杋.jpg',
    '郭厚璋.jpg',
    '耿曼綸.jpg',
    '張文譯.jpg',
    '蔡孟谷.jpg',
    '曾文駿.jpg',
    '馬筠家.jpg',
    '曾玟娸.jpg',
    '劉軒綸.jpg',
    '呂適仲.jpg',
    '陳姸方.jpg',
    '陳妍方.jpg',
    '李小萍.jpg',
    '徐維閔.jpg',
]


def head(url: str):
    req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=8) as resp:
        return resp.status, int(resp.headers.get('Content-Length') or 0)


found = []
lines = []
for base in BASES:
    hits = 0
    for name in NAMES + CN:
        from urllib.parse import quote
        url = base + quote(name)
        try:
            status, size = head(url)
            if status == 200 and size > 500:
                found.append((url, size))
                hits += 1
                lines.append(f'OK {size:>7} {url}')
        except Exception:
            pass
    lines.append(f'-- base {base} hits={hits}')

out = Path(r'd:\GITHUB_2\講座活動頁\scripts\_probe-uploaded.txt')
out.write_text('\n'.join(lines) if lines else 'none', encoding='utf-8')
print(f'found={len(found)}')
for u, s in found[:40]:
    print(s, u)
