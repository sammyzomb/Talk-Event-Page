# CMS 五頁上線對照（主題推薦）

五頁請在後台 **網站管理 → 主題推薦 → 新增** 各建一筆。列表頁為 [popular.html](https://www.tcawg.com/travel/popular.html)。

正式網址會自動變成：`/TRAVEL/{標題}-pv-{編號}.html`

## 快速對照

| 順序 | 用途 | 一般資料「標題」 | 貼上檔 | 正式 URL |
|------|------|------------------|--------|----------|
| 1 | **總覽頁** | 講座總覽頁（四主題合一） | `官網貼上版/總覽/貼上用-HTML區塊.html` | [前台 pv-157](https://www.tcawg.com/TRAVEL/講座總覽頁-四主題合一-pv-157.html)／[後台 id=157](https://www.tcawg.com/admin/popular.php?action=edit&id=157) |
| 2 | **俄羅斯**（廣告主力） | 講座主題俄羅斯 | `官網貼上版/俄羅斯/貼上用-HTML區塊.html` | [前台 pv-160](https://www.tcawg.com/TRAVEL/講座主題俄羅斯-pv-160.html)／[後台 id=160](https://www.tcawg.com/admin/popular.php?action=edit&id=160) |
| 3 | **拉丁美洲** | 講座主題拉丁美洲 | `官網貼上版/拉丁美洲/貼上用-HTML區塊.html` | [前台 pv-159](https://www.tcawg.com/TRAVEL/講座主題拉丁美洲-pv-159.html)／[後台 id=159](https://www.tcawg.com/admin/popular.php?action=edit&id=159) |
| 4 | **極光** | 講座主題極光 | `官網貼上版/極光/貼上用-HTML區塊.html` | [前台 pv-161](https://www.tcawg.com/TRAVEL/講座主題極光-pv-161.html)／[後台 id=161](https://www.tcawg.com/admin/popular.php?action=edit&id=161) |
| 5 | **古文明** | 講座主題古文明 | `官網貼上版/古文明/貼上用-HTML區塊.html` | [前台 pv-162](https://www.tcawg.com/TRAVEL/講座主題古文明-pv-162.html)／[後台 id=162](https://www.tcawg.com/admin/popular.php?action=edit&id=162) |

欄位逐項填法見 [`cms-meta-設定對照.md`](./cms-meta-設定對照.md)。

---

## 每一筆請這樣填

### 一般資料

1. **標題**：用上表短標題（會出現在主題推薦列表，也會組成網址）
2. **列表圖案**：上傳該主題主視覺（對照 cms-meta 的 og:image）
3. **背景底圖**：可同上或留空
4. **外部連結**：**務必留空**（填了會變成外連，消息內容不會當獨立頁）
5. **發佈時段**：開始日設今天；**不要勾「啟用結束時間」**
6. **排序**：總覽 50、俄羅斯 40、拉丁美洲 30、極光 20、古文明 10
7. **是否顯示**：ON
8. **顯示日期**：建議 OFF

首頁主題超連結請另到「廣告管理 > 主題廣告」設定；那是首頁區塊，不是這五頁本身。

### 消息內容

1. 切換為 HTML／原始碼模式
2. 貼上對應 `貼上用-HTML區塊.html` **全文**（含 `<style>` 與結尾 `<script>`）
3. 不要再加 h1（header 已有「鄉野旅行社 - 主題推薦」；標題會再以 h3 出現一次）

### 關連行程／關連出團

可略過。

### 其他資料

若有 Description／關鍵字欄位，請對照 `cms-meta-設定對照.md`。此模組通常會把 title 組成 `{標題}_主題推薦 | 航向世界旅遊`。

---

## 儲存後請做這兩件事

1. 用瀏覽器打開該筆，複製完整網址
2. 把四主題網址（以及若總覽改過）傳回專案，更新 `src/data/cmsPages.js` 的 `path` 後執行：

```bash
npm run sync:all
npm run cms:meta
```

再 **重貼一次** 五份 HTML（互連連結會寫進靜態頁）。

五個正式 URL 均已寫入 `src/data/cmsPages.js`。若之後改網址，更新 `path` 後執行 `npm run sync:all` 與 `npm run cms:meta`，再重貼五份 HTML。

---

## 上線後

| 項目 | 作法 |
|------|------|
| 講座列表導流 | 將 [`lectures-連結片段.html`](./lectures-連結片段.html) 加入 [lectures.html](https://www.tcawg.com/travel/lectures.html)（已指向總覽 pv-157） |
| 付費廣告 | 各主題廣告 → 對應獨立頁 + UTM（見 [`廣告著陸頁-URL對照.md`](./廣告著陸頁-URL對照.md)） |
| 場次更新 | GitHub Actions 每 2h sync；有變更下載 artifact **手動重貼「消息內容」** |
| Sitemap | 五個新 URL 加入 XML sitemap |

---

## 建置指令

```bash
cd d:\GITHUB_2\講座活動頁
npm run sync:all      # 同步場次 + 重建五頁 + 貼上版
npm run verify:paste  # 檢查五份貼上版
npm run cms:meta      # 產出對照表與 lectures 片段
```
