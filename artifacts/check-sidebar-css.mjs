const html = await (await fetch('https://www.tcawg.com/TRAVEL/講座主題俄羅斯-pv-160.html')).text()
const start = html.indexOf('id="sidebar"')
console.log(html.slice(start - 50, start + 800))
// find css for #sidebar
const cssIdx = html.search(/#sidebar\s*\{/)
console.log('\nCSS around #sidebar:', html.slice(cssIdx, cssIdx + 600))
const media = [...html.matchAll(/@media[^{]+\{[^}]*#sidebar[^}]*\}/g)].map(m => m[0].slice(0,200))
console.log('\nmedia hits', media.length)
// search display none for sidebar in media
const re = /@media\s*\([^)]+\)[^{]*\{(?:[^{}]|\{[^{}]*\})*#sidebar(?:[^{}]|\{[^{}]*\})*\}/g
let m, n=0
while ((m = re.exec(html)) && n < 5) {
  console.log('---', m[0].slice(0,300))
  n++
}
