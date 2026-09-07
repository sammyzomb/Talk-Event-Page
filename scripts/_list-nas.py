# -*- coding: utf-8 -*-
from pathlib import Path

nas = Path(r'\\192.168.3.3\【行程總彙】\9-2.行銷文宣簡報\8.季刊\領隊照片')
out = Path(r'd:\GITHUB_2\講座活動頁\scripts\_nas-all.txt')
names = sorted(p.name for p in nas.iterdir() if p.is_file())
out.write_text('\n'.join(names), encoding='utf-8')
print(f'count={len(names)}')
print('\n'.join(names))
