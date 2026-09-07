const urls = [
  ['egypt', 'https://www.tcawg.com/TRAVEL/tours/CAI12A'],
  ['russia', 'https://www.tcawg.com/TRAVEL/%E8%AC%9B%E5%BA%A7%E4%B8%BB%E9%A1%8C%E4%BF%84%E7%BE%85%E6%96%AF-pv-160.html'],
  ['hub', 'https://www.tcawg.com/TRAVEL/%E8%AC%9B%E5%BA%A7%E7%B8%BD%E8%A6%BD%E9%A0%81-%E5%9B%9B%E4%B8%BB%E9%A1%8C%E5%90%88%E4%B8%80-pv-157.html'],
]

for (const [name, url] of urls) {
  const html = await (await fetch(url)).text()
  console.log('\n==', name, html.length)
  console.log('has 客製服務', html.includes('客製服務'))
  console.log('has 最愛', html.includes('最愛'))
  console.log('has lecture-expo', html.includes('lecture-expo'))
  console.log('has overflow-x:clip', /overflow-x\s*:\s*clip/i.test(html))
  console.log('has isolation', /isolation\s*:\s*isolate/i.test(html))
  console.log('has 50vw', html.includes('50vw'))

  const idx = html.indexOf('客製服務')
  if (idx >= 0) console.log('snip', html.slice(Math.max(0, idx - 200), idx + 250).replace(/\s+/g, ' '))

  // collect likely sidebar markup ids/classes
  const re = /id=["']([^"']*(?:side|tool|gotop|share|quick|float)[^"']*)["']/gi
  const ids = new Set()
  let m
  while ((m = re.exec(html))) ids.add(m[1])
  console.log('ids', [...ids].slice(0, 20))

  const re2 = /class=["']([^"']*(?:side|tool|gotop|share|quick|float|fix-bar)[^"']*)["']/gi
  const cls = new Set()
  while ((m = re2.exec(html))) cls.add(m[1].slice(0, 120))
  console.log('classes', [...cls].slice(0, 25))
}
