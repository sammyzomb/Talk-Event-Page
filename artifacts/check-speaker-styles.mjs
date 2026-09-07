import { readFileSync } from 'node:fs'

for (const file of ['官網貼上版/總覽/貼上用-HTML區塊.html', '官網貼上版/俄羅斯/貼上用-HTML區塊.html']) {
  const html = readFileSync(file, 'utf8')
  console.log('\n', file)
  console.log('speaker-scale count', (html.match(/speaker-scale/g) ?? []).length)
  console.log('125%', html.includes('125%'))
  console.log('205%', html.includes('205%'))
  console.log('陳姸方 idx', html.indexOf('陳姸方'))
  console.log('張文譯 idx', html.indexOf('張文譯'))
}
