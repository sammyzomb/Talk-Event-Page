import { CMS_HUB, CMS_THEME_PAGES, toPageUrl } from './cmsPages.js'

export const HUB = {
  id: 'all',
  title: '本月全台主題講座',
  pageUrl: toPageUrl(CMS_HUB.path),
  pagePath: CMS_HUB.path,
  seoTitle: CMS_HUB.meta.title,
  seoDescription: CMS_HUB.meta.description,
  heroLead: '四大主題・全台開講',
}

export const THEMES = [
  {
    id: 'russia',
    name: '俄羅斯主題講座',
    shortName: '俄羅斯',
    pageUrl: toPageUrl(CMS_THEME_PAGES.russia.path),
    pagePath: CMS_THEME_PAGES.russia.path,
    accent: '#1e4a7a',
    accentSoft: '#e8f1fa',
    heroImage: 'https://www.tcawg.com/data/images/202606/TRAVLE/1559274940321047600.jpg',
    heroPosition: 'center 42%',
    heroPositionMobile: 'center 36%',
    showcaseImage:
      'https://images.unsplash.com/photo-1714485474179-608d89de25a9?auto=format&fit=crop&w=1800&h=1200&q=80&fp-x=0.72&fp-y=0.38',
    showcasePosition: '58% 40%',
    showcasePositionMobile: '72% 44%',
    sectionImage: 'https://www.tcawg.com/data/images/202607/russ%20a/08-50-38-utc.jpg',
    sectionPosition: 'center 46%',
    sectionPositionMobile: 'center 40%',
    storyImage:
      'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=1600&q=80',
    storyPosition: 'center 42%',
    heroLead: '西伯利亞大鐵路・莫斯科・北極光',
    tagline: '從歐俄古都到西伯利亞大鐵路，探索俄羅斯的遼闊與深度。',
    imageAlt: '聖彼得堡古典建築與河畔風光',
    storyEyebrow: '橫跨歐亞的壯闊旅程',
    storyTitle: '從帝國古都，駛向西伯利亞無垠大地',
    story:
      '一場講座帶您理解俄羅斯旅行的尺度：華麗宮殿、世界級藝術、跨越八個時區的鐵道，以及冬季藍冰與北境極光。',
    highlights: ['莫斯科與聖彼得堡', '西伯利亞大鐵路', '貝加爾湖與北境極光'],
    seoTitle: CMS_THEME_PAGES.russia.meta.title,
    seoDescription: CMS_THEME_PAGES.russia.meta.description,
    ogImage: CMS_THEME_PAGES.russia.meta.ogImage,
  },
  {
    id: 'latin-america',
    name: '拉丁美洲主題講座',
    shortName: '拉丁美洲',
    pageUrl: toPageUrl(CMS_THEME_PAGES['latin-america'].path),
    pagePath: CMS_THEME_PAGES['latin-america'].path,
    accent: '#b45309',
    accentSoft: '#fef3c7',
    heroImage:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80',
    heroPosition: 'center 38%',
    heroPositionMobile: 'center 32%',
    showcaseImage:
      'https://www.tcawg.com/travel/data/images/202506/06261/%E5%A4%A9%E7%A9%BA%E4%B9%8B%E9%8F%A1shutterstock_674040442.jpg',
    showcasePosition: 'center 52%',
    showcasePositionMobile: 'center 46%',
    sectionImage:
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1600&q=80',
    sectionPosition: 'center 46%',
    sectionPositionMobile: 'center 40%',
    storyImage:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1600&q=80',
    storyPosition: 'center 40%',
    heroLead: '印加文明・亞馬遜・亡靈節',
    tagline: '從馬丘比丘到復活節島，走進中南美洲的奇幻世界。',
    imageAlt: '玻利維亞烏尤尼天空之鏡倒映雲海',
    storyEyebrow: '文明與自然的萬花筒',
    storyTitle: '沿著安地斯山脈，走進拉丁世界的生命力',
    story:
      '從印加石城、天空之鏡到熱情節慶，講座整理高海拔旅行、跨國動線與文化體驗，讓遙遠的中南美洲變得清晰可行。',
    highlights: ['秘魯印加文明', '玻利維亞天空之鏡', '巴西・阿根廷・墨西哥節慶'],
    seoTitle: CMS_THEME_PAGES['latin-america'].meta.title,
    seoDescription: CMS_THEME_PAGES['latin-america'].meta.description,
    ogImage: CMS_THEME_PAGES['latin-america'].meta.ogImage,
  },
  {
    id: 'aurora',
    name: '極光主題講座',
    shortName: '極光',
    pageUrl: toPageUrl(CMS_THEME_PAGES.aurora.path),
    pagePath: CMS_THEME_PAGES.aurora.path,
    accent: '#0f766e',
    accentSoft: '#ccfbf1',
    heroImage: CMS_THEME_PAGES.aurora.meta.ogImage,
    heroPosition: 'center 42%',
    heroPositionMobile: 'center 36%',
    showcaseImage: 'https://www.tcawg.com/travel/data/images/202605/AROR/0304.JPG',
    showcasePosition: 'center 48%',
    showcasePositionMobile: 'center 42%',
    sectionImage: 'https://www.tcawg.com/travel/data/images/202605/AROR/0514.jpg',
    sectionPosition: 'center 44%',
    sectionPositionMobile: 'center 38%',
    storyImage:
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=80',
    storyPosition: 'center 40%',
    heroLead: '黃刀鎮・北歐・摩爾曼斯克',
    tagline: '追逐北極光，從加拿大到北歐、俄羅斯北境。',
    imageAlt: '綠色極光映照北境雪地與群山',
    storyEyebrow: '追光者的北境指南',
    storyTitle: '選對地點與季節，讓極光不只是運氣',
    story:
      '比較加拿大黃刀鎮、北歐與俄羅斯北境的氣候、交通及觀測方式，從拍攝準備到禦寒裝備，一次建立完整追光概念。',
    highlights: ['黃刀鎮高機率觀測', '北歐峽灣與雪境', '摩爾曼斯克北境體驗'],
    seoTitle: CMS_THEME_PAGES.aurora.meta.title,
    seoDescription: CMS_THEME_PAGES.aurora.meta.description,
    ogImage: CMS_THEME_PAGES.aurora.meta.ogImage,
  },
  {
    id: 'ancient-civilization',
    name: '古文明主題講座',
    shortName: '古文明',
    pageUrl: toPageUrl(CMS_THEME_PAGES['ancient-civilization'].path),
    pagePath: CMS_THEME_PAGES['ancient-civilization'].path,
    accent: '#92400e',
    accentSoft: '#ffedd5',
    heroImage: CMS_THEME_PAGES['ancient-civilization'].meta.ogImage,
    heroPosition: 'center 34%',
    heroPositionMobile: 'center 28%',
    showcaseImage:
      'https://www.tcawg.com/travel/data/images/202605/Casia/shutterstock_2575415831.jpg',
    showcasePosition: 'center 48%',
    showcasePositionMobile: 'center 42%',
    sectionImage: 'https://www.tcawg.com/travel/data/images/202605/Casia/01.jpg',
    sectionPosition: 'center 48%',
    sectionPositionMobile: 'center 42%',
    storyImage: 'https://www.tcawg.com/data/images/202609/meting/Speaker/1037.jpg',
    storyPosition: 'center 38%',
    heroLead: '南亞秘境・南印度・寮國・印尼・不丹',
    tagline: '走訪古文明與絲路遺跡，探索人類文明的燦爛足跡。',
    imageAlt: '南印度馬杜賴米納克希神廟彩色塔樓',
    storyEyebrow: '穿越千年的文明現場',
    storyTitle: '不只看遺跡，更讀懂文明如何相遇',
    story:
      '本月古文明講座聚焦南亞秘境，涵蓋南印度、寮國、印尼、不丹等方向；實際開講主題依當月場次而定，請見下方日期與講座重點。',
    highlights: ['南印度文化與古蹟', '寮國佛教遺產', '印尼・不丹秘境'],
    seoTitle: CMS_THEME_PAGES['ancient-civilization'].meta.title,
    seoDescription: CMS_THEME_PAGES['ancient-civilization'].meta.description,
    ogImage: CMS_THEME_PAGES['ancient-civilization'].meta.ogImage,
  },
]

export function getThemeById(id) {
  const theme = THEMES.find((t) => t.id === id)
  if (!theme) throw new Error(`Unknown theme: ${id}`)
  return theme
}

/** @typedef {'hero' | 'showcase' | 'section' | 'story'} ThemeImageSlot */

/** @param {typeof THEMES[number]} theme @param {ThemeImageSlot} slot */
export function getThemeImage(theme, slot = 'hero') {
  if (slot === 'showcase') return theme.showcaseImage ?? theme.heroImage
  if (slot === 'section') return theme.sectionImage ?? theme.showcaseImage ?? theme.heroImage
  if (slot === 'story') return theme.storyImage ?? theme.showcaseImage ?? theme.sectionImage ?? theme.heroImage
  return theme.heroImage
}

/** @param {typeof THEMES[number]} theme @param {ThemeImageSlot} slot */
export function getThemeImagePosition(theme, slot = 'hero') {
  if (slot === 'showcase') return theme.showcasePosition ?? theme.heroPosition
  if (slot === 'section') return theme.sectionPosition ?? theme.showcasePosition ?? theme.heroPosition
  if (slot === 'story') return theme.storyPosition ?? theme.showcasePosition ?? theme.heroPosition
  return theme.heroPosition
}

/** @param {typeof THEMES[number]} theme @param {ThemeImageSlot} slot */
export function getThemeImagePositionMobile(theme, slot = 'hero') {
  if (slot === 'showcase') {
    return theme.showcasePositionMobile ?? theme.showcasePosition ?? theme.heroPositionMobile ?? theme.heroPosition
  }
  if (slot === 'section') {
    return theme.sectionPositionMobile
      ?? theme.sectionPosition
      ?? theme.showcasePositionMobile
      ?? theme.showcasePosition
      ?? theme.heroPosition
  }
  if (slot === 'story') {
    return theme.storyPositionMobile
      ?? theme.storyPosition
      ?? theme.showcasePositionMobile
      ?? theme.showcasePosition
      ?? theme.heroPosition
  }
  return theme.heroPositionMobile ?? theme.heroPosition
}

/** @param {typeof THEMES[number]} theme @param {ThemeImageSlot} slot */
export function getThemeImagePositions(theme, slot = 'hero') {
  return {
    desktop: getThemeImagePosition(theme, slot),
    mobile: getThemeImagePositionMobile(theme, slot),
  }
}
