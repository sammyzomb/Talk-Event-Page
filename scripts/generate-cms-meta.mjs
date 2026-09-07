/**
 * 產出 CMS 主題推薦對照、lectures 連結片段、廣告 URL 對照
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  CMS_HUB,
  CMS_MODULE,
  CMS_PAGE_LIST,
  CMS_THEME_PAGES,
  adminEditUrl,
  canonicalUrl,
} from '../src/data/cmsPages.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pasteDir = join(root, '官網貼上版')

const lines = [
  '# CMS Meta 設定對照',
  '',
  `後台位置：**${CMS_MODULE.nav} → ${CMS_MODULE.section} → 新增**`,
  '',
  `正式網址格式：\`${CMS_MODULE.urlPattern}\`（儲存後才會產生編號）`,
  '',
  `瀏覽器 title 會變成「{標題}${CMS_MODULE.titleSuffix}」，無法完全自訂建議 SEO title。`,
  '',
  '| 頁面 | 標題（一般資料） | 貼上檔 | 正式 URL | 後台編輯 | 狀態 |',
  '|------|------------------|--------|----------|----------|------|',
]

for (const p of CMS_PAGE_LIST) {
  const status = p.pathConfirmed ? '已上線' : '待建立後回填 path'
  const edit = p.popularId ? adminEditUrl(p.popularId) : '新增後會得到 id'
  lines.push(`| ${p.label} | ${p.cmsTitle} | \`${p.pasteFile}\` | ${p.url} | ${edit} | ${status} |`)
}

lines.push('', '---', '', '## 每頁欄位填法', '')

function section(title, page) {
  const m = page.meta
  const confirmed = page.pathConfirmed ? '已確認' : 'placeholder，建立後請把瀏覽器網址貼回 `src/data/cmsPages.js` 的 path'
  return [
    `## ${title}`,
    '',
    '### 一般資料',
    '',
    `- **標題**：${page.cmsTitle}`,
    `- **列表圖案**：上傳或沿用 ${m.ogImage}`,
    `- **背景底圖**：同上（可留空）`,
    '- **外部連結**：**留空**（填了會變成外連，本頁內容不會當獨立頁）',
    '- **發佈時段**：開始日可設今天；**不要勾「啟用結束時間」**（避免 9/16 自動下架）',
    `- **排序**：${page.sort}（數字愈大愈前面，視後台規則微調）`,
    '- **是否顯示**：ON',
    '- **顯示日期**：可 OFF（列表較乾淨）',
    '',
    '### 消息內容',
    '',
    `- 切換編輯器為 **HTML / 原始碼**`,
    `- 貼上 \`${page.pasteFile}\` **全文**（含 \`<style>\` 與結尾 \`<script>\`）`,
    '',
    '### 關連行程／關連出團',
    '',
    '- 可略過（非講座活動頁必要）',
    '',
    '### 其他資料',
    '',
    `- **建議 Description**（若有欄位）：${m.description}`,
    `- **Canonical / og:url**（若有欄位）：\`${canonicalUrl(page)}\`（${confirmed}）`,
    page.popularId ? `- **後台編輯**：${adminEditUrl(page.popularId)}` : '- **後台編輯**：新增儲存後複製網址中的 `id=`',
    `- CMS 預設 title：\`${page.cmsTitle}${CMS_MODULE.titleSuffix}\``,
    '',
    '官網 header 已有 h1「鄉野旅行社 - 主題推薦」；主題推薦會把「標題」再顯示一次（多為 h3）。活動區主標題為 h2，請勿在消息內容再加 h1。',
    '',
  ]
}

lines.push(...section('1. 總覽頁', CMS_HUB))
for (const page of Object.values(CMS_THEME_PAGES)) {
  lines.push(...section(`${page.folder}（${page.themeId}）`, page))
}

lines.push('## 廣告 UTM 範例', '')
lines.push('廣告請導向四主題獨立頁。四主題正式 URL 建立後會取代下表 placeholder。', '')
for (const page of Object.values(CMS_THEME_PAGES)) {
  lines.push(
    `- **${page.folder}**：\`${canonicalUrl(page)}?utm_source=facebook&utm_medium=paid&utm_campaign=${page.adUtmCampaign}\``,
  )
}

writeFileSync(join(pasteDir, 'cms-meta-設定對照.md'), `${lines.join('\n')}\n`, 'utf8')

const hubUrl = canonicalUrl(CMS_HUB)
const themeLinks = Object.values(CMS_THEME_PAGES)
  .map((p) => `    <a href="${canonicalUrl(p)}">${p.folder}</a>`)
  .join(' ·\n')

const lecturesHtml = `<!--
  用途：加入 https://www.tcawg.com/travel/lectures.html 講座列表頁
  建議位置：講座列表上方或「本月主題講座」區塊
  URL 來源：src/data/cmsPages.js（修改 path 後需 npm run cms:meta 與 npm run sync:all）
-->
<section class="lecture-hub-promo" style="margin:1.5rem 0;padding:1.25rem 1.5rem;background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;">
  <h2 style="margin:0 0 .75rem;font-size:1.25rem;color:#0f766e;">本月全省主題講座</h2>
  <p style="margin:0 0 1rem;line-height:1.6;color:#334155;">
    俄羅斯、拉丁美洲、極光、古文明四大主題，台北・台中・高雄等地免費開講。
  </p>
  <p style="margin:0;">
    <a href="${hubUrl}" style="display:inline-block;padding:.6rem 1.25rem;background:#0eaec4;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;">
      查看本月全部場次 →
    </a>
  </p>
  <p style="margin:1rem 0 0;font-size:.875rem;color:#64748b;">
    依主題瀏覽：
${themeLinks}
  </p>
</section>
`

writeFileSync(join(pasteDir, 'lectures-連結片段.html'), lecturesHtml, 'utf8')

const adLines = [
  '# 廣告著陸頁 URL 對照',
  '',
  '付費廣告請導向 **四主題獨立頁**（勿導向總覽頁）。',
  '',
  '| 主題 | 著陸頁 URL | 建議 UTM | 狀態 |',
  '|------|------------|----------|------|',
]
for (const page of Object.values(CMS_THEME_PAGES)) {
  adLines.push(
    `| ${page.folder}${page.themeId === 'russia' ? '（主力）' : ''} | ${canonicalUrl(page)} | \`?utm_source=facebook&utm_medium=paid&utm_campaign=${page.adUtmCampaign}\` | ${page.pathConfirmed ? '已上線' : '待建立'} |`,
  )
}
adLines.push(
  '',
  `**總覽頁**（僅供 lectures.html 與 [主題推薦列表](${CMS_MODULE.listUrl}) 導流，不建議打廣告）：`,
  canonicalUrl(CMS_HUB),
  '',
  '四主題建立後，把正式網址填回 `src/data/cmsPages.js` 的 `path`，再執行 `npm run sync:all`。',
  '',
)
writeFileSync(join(pasteDir, '廣告著陸頁-URL對照.md'), adLines.join('\n'), 'utf8')

console.log('已產出 cms-meta-設定對照.md、lectures-連結片段.html、廣告著陸頁-URL對照.md')
