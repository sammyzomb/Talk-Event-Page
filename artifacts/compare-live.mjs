import { readFileSync, writeFileSync } from 'node:fs'

const paste = readFileSync('官網貼上版/總覽/貼上用-HTML區塊.html', 'utf8')
const url =
  'https://www.tcawg.com/TRAVEL/%E8%AC%9B%E5%BA%A7%E7%B8%BD%E8%A6%BD%E9%A0%81-%E5%9B%9B%E4%B8%BB%E9%A1%8C%E5%90%88%E4%B8%80-pv-157.html'

const res = await fetch(url)
const live = await res.text()

function scan(label, html) {
  return {
    label,
    chars: html.length,
    hasLectureExpo: html.includes('id="lecture-expo"'),
    faqDetails: (html.match(/<details class="lex-theme-faq/g) || []).length,
    hubMobilePadding0: html.includes('lex-root--hub .lex-theme-section-layout{padding:0'),
    hubMobile620: html.includes('max-width:620px') && html.includes('lex-root--hub'),
    layoutClampImportant: html.includes('.lex-theme-section-layout{padding:clamp'),
    now去俄羅斯: html.includes('現在去俄羅斯安全嗎'),
    黃刀鎮北歐: html.includes('黃刀鎮、北歐、摩爾曼斯克'),
  }
}

const report = { paste: scan('paste', paste), live: scan('live', live) }
console.log(JSON.stringify(report, null, 2))

const liveSnippet = live.includes('lecture-expo')
  ? live.slice(live.indexOf('lecture-expo') - 20, live.indexOf('lecture-expo') + 200)
  : 'NO lecture-expo'
writeFileSync('artifacts/live-snippet.txt', liveSnippet, 'utf8')
