import { readFileSync } from 'node:fs'

const live = readFileSync('artifacts/live.html', 'utf8').length ? readFileSync('artifacts/live.html', 'utf8') : null
const url =
  'https://www.tcawg.com/TRAVEL/%E8%AC%9B%E5%BA%A7%E7%B8%BD%E8%A6%BD%E9%A0%81-%E5%9B%9B%E4%B8%BB%E9%A1%8C%E5%90%88%E4%B8%80-pv-157.html'
const html = live || (await (await fetch(url)).text())
if (!live) writeFileSync('artifacts/live.html', html, 'utf8')

const m620 = html.match(/@media \(max-width:620px\)\{[^}]*lex-root--hub[^}]*\}/)
const idx = html.indexOf('lex-root--hub .lex-theme-section-layout')
console.log('live chars', html.length)
console.log('hub layout rule index', idx)
if (idx > -1) console.log('snippet:', html.slice(idx, idx + 280))
console.log('has border none on hub layout in 620 block:', /max-width:620px[\s\S]{0,2000}lex-root--hub \.lex-theme-section-layout\{[^}]*border:none/.test(html))
