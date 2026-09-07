# 航向世界旅遊・主題講座活動頁

四個主題獨立著陸頁（廣告用）+ 一個總覽頁。場次資料自官網 [lv-24 講座列表](https://www.tcawg.com/travel/2022%E7%96%AB%E6%83%85%E4%B9%8B%E5%BE%8C-%E7%BE%8E%E5%A4%A2%E6%88%90%E7%9C%9F-%E5%85%A8%E7%9C%81%E5%92%96%E5%95%A1-%E6%97%85%E9%81%8A%E5%BA%A7%E8%AB%87%E6%9C%83-lv-24.html) 同步。

## 頁面

| 檔案 | 用途 |
|------|------|
| `all.html` | 總覽頁（四主題合一） |
| `russia.html` | 俄羅斯主題（廣告著陸頁） |
| `latin-america.html` | 拉丁美洲主題 |
| `aurora.html` | 極光主題 |
| `ancient-civilization.html` | 古文明主題 |

## 開發

```bash
npm install
npm run dev          # 開啟後選擇頁面：/all.html、/russia.html 等
npm run sync:all     # 同步場次 + 建置 + 產出貼上版
```

## 同步

- `npm run sync:sessions`：自 lv-24 抓取場次 → `src/data/sessions/synced.js`
- 已過期場次自動隱藏；只顯示當月場次
- 報名連結：`lecture-flow.html?id={lectureFlowId}`

GitHub Actions 於台灣時間 **09:00–17:00 每 2 小時** 自動 sync（cron UTC 01,03,05,07,09）。有變更時下載 artifact `lecture-paste-html`，**手動貼回 CMS**。

## 官網貼上

`npm run build:all` 產出：

- `官網貼上版/*/貼上用-HTML區塊.html` — 貼入 CMS 自訂 HTML
- `官網貼上版/*/完整頁面.html` — 本地預覽

上線前在 CMS 設定：正式 URL、title、description、canonical（見各 `*.html` head）。

## 設定

- 各頁 CMS URL：`src/data/themes.js` 的 `pageUrl`
- 主題分類關鍵字：`src/data/sessions/themeRules.js`
- lv-24 來源 URL：`src/data/company.js` → `LECTURE.listUrl`
