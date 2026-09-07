const url =
  'https://www.tcawg.com/travel/2022%E7%96%AB%E6%83%85%E4%B9%8B%E5%BE%8C-%E7%BE%8E%E5%A4%A2%E6%88%90%E7%9C%9F-%E5%85%A8%E7%9C%81%E5%92%96%E5%95%A1-%E6%97%85%E9%81%8A%E5%BA%A7%E8%AB%87%E6%9C%83-lv-24.html'
const html = await (await fetch(url)).text()
const items = html.match(/<div class="item">[\s\S]*?(?=<div class="item">|$)/g) ?? []
for (const item of items) {
  const id = item.match(/lecture-flow\.html\?id=(\d+)/)?.[1]
  const title = item.match(/class="locate-ti">([\s\S]*?)<\/div>/)?.[1]?.replace(/<[^>]+>/g, '').trim()
  const loc = item.match(/class="locate-loc">([\s\S]*?)<\/div>/)?.[1]?.replace(/<[^>]+>/g, '').trim()
  const date = item.match(/class="date"[\s\S]*?<div>([\s\S]*?)<\/div>/)?.[1]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  console.log(`${id}\t${date}\t${title}\t${loc}`)
}
