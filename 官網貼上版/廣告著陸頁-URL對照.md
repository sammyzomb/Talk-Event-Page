# 廣告著陸頁 URL 對照

付費廣告請導向 **四主題獨立頁**（勿導向總覽頁）。

| 主題 | 著陸頁 URL | 建議 UTM | 狀態 |
|------|------------|----------|------|
| 俄羅斯（主力） | https://www.tcawg.com/TRAVEL/講座主題俄羅斯-pv-160.html | `?utm_source=facebook&utm_medium=paid&utm_campaign=lecture-russia` | 已上線 |
| 拉丁美洲 | https://www.tcawg.com/TRAVEL/講座主題拉丁美洲-pv-159.html | `?utm_source=facebook&utm_medium=paid&utm_campaign=lecture-latin-america` | 已上線 |
| 極光 | https://www.tcawg.com/TRAVEL/講座主題極光-pv-161.html | `?utm_source=facebook&utm_medium=paid&utm_campaign=lecture-aurora` | 已上線 |
| 古文明 | https://www.tcawg.com/TRAVEL/講座主題古文明-pv-162.html | `?utm_source=facebook&utm_medium=paid&utm_campaign=lecture-ancient-civilization` | 已上線 |

**總覽頁**（僅供 lectures.html 與 [主題推薦列表](https://www.tcawg.com/travel/popular.html) 導流，不建議打廣告）：
https://www.tcawg.com/TRAVEL/講座總覽頁-四主題合一-pv-157.html

四主題建立後，把正式網址填回 `src/data/cmsPages.js` 的 `path`，再執行 `npm run sync:all`。
