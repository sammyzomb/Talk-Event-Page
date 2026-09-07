const root = 'https://www.tcawg.com/data/images/202609/meting/Speaker/'
const names = [
  '謝其峻.jpg',
  '謝其峻-3.jpg',
  '張文譯.jpg',
  '張文譯2.jpg',
  '王秋萍.jpg',
  '王秋萍3.jpg',
  '陳妍方.jpg',
  '陳姸方.jpg',
]
for (const name of names) {
  const res = await fetch(root + encodeURI(name), { method: 'HEAD' })
  console.log(res.status, name, res.headers.get('content-length'))
}
