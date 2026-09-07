const names = ['王秋萍3.jpg', '王秋萍.jpg', '秋萍.jpg', '秋萍3.jpg', '李小萍.jpg']
const root = 'https://www.tcawg.com/data/images/202609/meting/Speaker/'
for (const name of names) {
  const url = root + encodeURI(name)
  const res = await fetch(url, { method: 'HEAD' })
  console.log(res.status, name)
}
