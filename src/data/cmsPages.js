/**
 * 官網 CMS 五頁設定（單一來源）
 * 模組：網站管理 → 主題推薦
 * 正式 URL 格式：/travel/{標題}-pv-{編號}.html
 * 建立後若 path 不同，改這裡再執行 npm run sync:all
 */
export const CMS_ORIGIN = 'https://www.tcawg.com'

export const CMS_MODULE = {
  nav: '網站管理',
  section: '主題推薦',
  listUrl: 'https://www.tcawg.com/travel/popular.html',
  adminEditBase: 'https://www.tcawg.com/admin/popular.php?action=edit&id=',
  urlPattern: '/TRAVEL/{標題}-pv-{編號}.html',
  titleSuffix: '_主題推薦 | 航向世界旅遊',
}

/** @param {number | string | undefined} popularId */
export function adminEditUrl(popularId) {
  if (popularId == null || popularId === '') return ''
  return `${CMS_MODULE.adminEditBase}${popularId}`
}

/** @param {string} path */
export function toPageUrl(path) {
  return `${CMS_ORIGIN}${path}`
}

export const CMS_HUB = {
  key: 'all',
  folder: '總覽',
  pasteFile: '官網貼上版/總覽/貼上用-HTML區塊.html',
  previewFile: '官網貼上版/總覽/完整頁面.html',
  cmsTitle: '講座總覽頁（四主題合一）',
  sort: 50,
  pathConfirmed: true,
  popularId: 157,
  path: '/TRAVEL/講座總覽頁-四主題合一-pv-157.html',
  cmsSlugHint: 'pv-157',
  meta: {
    title: '本月全台主題講座｜俄羅斯・中南美・極光・古文明｜航向世界旅遊',
    description:
      '航向世界旅遊本月全台主題講座，涵蓋俄羅斯、拉丁美洲、極光、古文明四大主題，台北台中高雄等地免費開講，歡迎報名。',
    ogTitle: '本月全台主題講座｜俄羅斯・中南美・極光・古文明｜航向世界旅遊',
    ogDescription: '航向世界旅遊本月全台主題講座，四大主題全台開講，免費報名。',
    ogImage:
      'https://www.tcawg.com/travel/data/images/202605/ATUM/3%20(1).jpg',
    themeColor: '#0eaec4',
  },
}

export const CMS_THEME_PAGES = {
  russia: {
    themeId: 'russia',
    folder: '俄羅斯',
    pasteFile: '官網貼上版/俄羅斯/貼上用-HTML區塊.html',
    previewFile: '官網貼上版/俄羅斯/完整頁面.html',
    cmsTitle: '講座主題俄羅斯',
    sort: 40,
    pathConfirmed: true,
    popularId: 160,
    path: '/TRAVEL/講座主題俄羅斯-pv-160.html',
    cmsSlugHint: 'pv-160',
    adUtmCampaign: 'lecture-russia',
    meta: {
      title: '俄羅斯旅遊講座｜本月全台場次｜航向世界旅遊',
      description:
        '航向世界旅遊俄羅斯主題講座，本月於台北、台中、高雄等地舉辦，介紹西伯利亞大鐵路、莫斯科、北極光等行程，免費報名。',
      ogTitle: '俄羅斯旅遊講座｜本月全台場次｜航向世界旅遊',
      ogDescription: '俄羅斯主題講座本月全台開講，免費報名。',
      ogImage: 'https://www.tcawg.com/data/images/202606/TRAVLE/1559274940321047600.jpg',
      themeColor: '#1e4a7a',
    },
  },
  'latin-america': {
    themeId: 'latin-america',
    folder: '拉丁美洲',
    pasteFile: '官網貼上版/拉丁美洲/貼上用-HTML區塊.html',
    previewFile: '官網貼上版/拉丁美洲/完整頁面.html',
    cmsTitle: '講座主題拉丁美洲',
    sort: 30,
    pathConfirmed: true,
    popularId: 159,
    path: '/TRAVEL/講座主題拉丁美洲-pv-159.html',
    cmsSlugHint: 'pv-159',
    adUtmCampaign: 'lecture-latin-america',
    meta: {
      title: '拉丁美洲旅遊講座｜本月全台場次｜航向世界旅遊',
      description:
        '航向世界旅遊拉丁美洲主題講座，本月全台開講，涵蓋秘魯、巴西、阿根廷、墨西哥等行程，免費報名。',
      ogTitle: '拉丁美洲旅遊講座｜本月全台場次｜航向世界旅遊',
      ogDescription: '拉丁美洲主題講座本月全台開講，免費報名。',
      ogImage:
        'https://www.tcawg.com/travel/data/images/202506/06261/%E5%A4%A9%E7%A9%BA%E4%B9%8B%E9%8F%A1shutterstock_674040442.jpg',
      themeColor: '#b45309',
    },
  },
  aurora: {
    themeId: 'aurora',
    folder: '極光',
    pasteFile: '官網貼上版/極光/貼上用-HTML區塊.html',
    previewFile: '官網貼上版/極光/完整頁面.html',
    cmsTitle: '講座主題極光',
    sort: 20,
    pathConfirmed: true,
    popularId: 161,
    path: '/TRAVEL/講座主題極光-pv-161.html',
    cmsSlugHint: 'pv-161',
    adUtmCampaign: 'lecture-aurora',
    meta: {
      title: '極光旅遊講座｜本月全台場次｜航向世界旅遊',
      description:
        '航向世界旅遊極光主題講座，本月於台北、台中、台南等地舉辦，介紹黃刀鎮、北歐、摩爾曼斯克等極光行程，免費報名。',
      ogTitle: '極光旅遊講座｜本月全台場次｜航向世界旅遊',
      ogDescription: '極光主題講座本月全台開講，免費報名。',
      ogImage: 'https://www.tcawg.com/travel/data/images/202605/AROR/28_01.jpg',
      themeColor: '#0f766e',
    },
  },
  'ancient-civilization': {
    themeId: 'ancient-civilization',
    folder: '古文明',
    pasteFile: '官網貼上版/古文明/貼上用-HTML區塊.html',
    previewFile: '官網貼上版/古文明/完整頁面.html',
    cmsTitle: '講座主題古文明',
    sort: 10,
    pathConfirmed: true,
    popularId: 162,
    path: '/TRAVEL/講座主題古文明-pv-162.html',
    cmsSlugHint: 'pv-162',
    adUtmCampaign: 'lecture-ancient-civilization',
    meta: {
      title: '古文明旅遊講座｜本月全台場次｜航向世界旅遊',
      description:
        '航向世界旅遊古文明主題講座，本月全台開講，聚焦南亞秘境與南印度、寮國、印尼、不丹等深度行程，免費報名。',
      ogTitle: '古文明旅遊講座｜本月全台場次｜航向世界旅遊',
      ogDescription: '古文明主題講座本月全台開講，免費報名。',
      ogImage: 'https://www.tcawg.com/travel/data/images/202605/Casia/30.jpg',
      themeColor: '#92400e',
    },
  },
}

/** @param {{ path: string }} page */
export function canonicalUrl(page) {
  return toPageUrl(page.path)
}

/** @param {string} themeId */
export function getCmsThemePage(themeId) {
  const page = CMS_THEME_PAGES[themeId]
  if (!page) throw new Error(`Unknown CMS theme page: ${themeId}`)
  return page
}

export const CMS_PAGE_LIST = [
  { label: '總覽頁', ...CMS_HUB, url: toPageUrl(CMS_HUB.path) },
  ...Object.values(CMS_THEME_PAGES).map((p) => ({
    label: p.folder,
    ...p,
    url: toPageUrl(p.path),
  })),
]
