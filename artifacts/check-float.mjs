const html = await (await fetch('https://www.tcawg.com/TRAVEL/講座主題俄羅斯-pv-160.html')).text()
for (const id of ['index-float-btn', 'sidebar', 'sidebar-share-btn']) {
  const i = html.indexOf(`id="${id}"`)
  console.log('\n==', id, i)
  if (i >= 0) console.log(html.slice(i, i + 400).replace(/\s+/g, ' '))
}
// find linked css mentioning sidebar
const links = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)].map(m => m[1])
console.log('css links', links.slice(0, 15))
