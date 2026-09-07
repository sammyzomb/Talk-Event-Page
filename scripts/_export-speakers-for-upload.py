# -*- coding: utf-8 -*-
"""從 NAS 匯出主講人 4:5 人像，供上傳官網後台。"""
from pathlib import Path
from PIL import Image

NAS = Path(r'\\192.168.3.3\【行程總彙】\9-2.行銷文宣簡報\8.季刊\領隊照片')
OUT = Path(r'd:\GITHUB_2\講座活動頁\artifacts\speakers-upload')
OUT.mkdir(parents=True, exist_ok=True)

TARGET_W, TARGET_H = 480, 600  # 上傳用較清楚，官網再縮即可
JPEG_QUALITY = 85

# (顯示名, 輸出檔名, NAS 候選檔, crop box left/top/right/bottom ratios)
JOBS = [
    ('張書元', 'zhang-shuyuan.jpg', ['張書元.jpg', '張書元2.jpg'], (0.15, 0.05, 0.85, 0.85)),
    ('許家樸', 'xu-jiapu.jpg', ['家樸 (2).jpg', '許家樸 (1).jpg'], (0.20, 0.05, 0.85, 0.80)),
    ('謝其峻', 'xie-qijun.jpg', ['謝其峻.jpg'], (0.15, 0.00, 0.85, 0.70)),
    ('林芮杋', 'lin-ruifan.jpg', ['林芮杋.jpg'], (0.35, 0.05, 1.0, 0.72)),
    ('郭厚璋', 'guo-houzhang.jpg', ['郭厚璋.jpg'], (0.30, 0.05, 1.0, 0.75)),
    ('耿曼綸', 'geng-manlun.jpg', ['耿曼綸.jpg'], (0.20, 0.55, 0.80, 1.0)),
    ('張文譯', 'zhang-wenyi.jpg', ['張文譯.JPG', '張文譯2.jpg'], (0.20, 0.05, 0.80, 0.75)),
    ('蔡孟谷', 'cai-menggu.jpg', ['蔡孟谷.jpg'], (0.20, 0.05, 0.80, 0.80)),
    ('曾文駿（JJ）', 'zeng-wenjun.jpg', ['JJ.png'], (0.15, 0.05, 0.85, 0.85)),
    ('馬筠家', 'ma-yunjia.jpg', ['馬筠家 1.jpg', '馬筠家 2.jpg'], (0.20, 0.05, 0.80, 0.80)),
    ('曾玟娸（VICKY）', 'zeng-wenqi.jpg', ['Monica.jpg', 'Monica-2.jpg', 'Monica-3.jpg'], (0.20, 0.05, 0.80, 0.80)),
    ('劉軒綸', 'liu-xuanlun.jpg', ['劉軒綸 (2).jpg', '劉軒綸 (1).JPG'], (0.20, 0.05, 0.80, 0.80)),
    ('呂適仲（Jack）', 'lu-shizhong.jpg', ['呂適仲 (2).JPEG', '呂適仲 (1).JPEG', '呂適仲 (3).jpg'], (0.20, 0.05, 0.80, 0.80)),
    ('陳姸方', 'chen-yanfang.jpg', ['陳妍方.jpg', '陳妍方03.jpg'], (0.20, 0.05, 0.80, 0.80)),
    # 以下 NAS 可能無完全同名
    ('李小萍', 'li-xiaoping.jpg', ['李小萍.jpg', '李小萍.png'], (0.20, 0.05, 0.80, 0.80)),
    ('徐維閔', 'xu-weimin.jpg', ['徐維閔.jpg', '徐維閔.png', '徐儀瑄.jpg'], (0.20, 0.05, 0.80, 0.80)),
]


def crop_box(img: Image.Image, left_r, top_r, right_r, bottom_r) -> Image.Image:
    w, h = img.size
    box = (int(left_r * w), int(top_r * h), int(right_r * w), int(bottom_r * h))
    cropped = img.convert('RGB').crop(box)
    cw, ch = cropped.size
    ratio = TARGET_W / TARGET_H
    if cw / ch > ratio:
        nw = int(ch * ratio)
        x0 = (cw - nw) // 2
        cropped = cropped.crop((x0, 0, x0 + nw, ch))
    else:
        nh = int(cw / ratio)
        y0 = max(0, (ch - nh) // 5)
        cropped = cropped.crop((0, y0, cw, y0 + nh))
    return cropped.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)


lines = ['# 主講人上傳清單（來源：NAS 領隊照片）', '']
ok = []
missing = []

for label, out_name, candidates, box in JOBS:
    src = next((NAS / n for n in candidates if (NAS / n).exists()), None)
    if not src:
        missing.append(label)
        lines.append(f'- ✗ **{label}** → 找不到：{", ".join(candidates)}')
        continue
    portrait = crop_box(Image.open(src), *box)
    dest = OUT / out_name
    portrait.save(dest, 'JPEG', quality=JPEG_QUALITY, optimize=True)
    ok.append(label)
    lines.append(
        f'- ✓ **{label}** ← `{src.name}` → `{out_name}`（{dest.stat().st_size // 1024} KB）'
    )

lines.extend([
    '',
    '## 上傳後請回覆',
    '請把檔案上傳到官網後台，然後告訴我其中任一完整網址，例如：',
    '`https://www.tcawg.com/travel/data/images/202609/speakers/zhang-shuyuan.jpg`',
    '我會把 `speakers.js` 全部改成官網遠端圖，並拿掉本地 base64。',
    '',
    f'成功匯出：{len(ok)}／找不到：{len(missing)}',
])

readme = OUT / 'README.md'
readme.write_text('\n'.join(lines), encoding='utf-8')
print(readme.read_text(encoding='utf-8'))
print('\nOUTPUT_DIR', OUT)
