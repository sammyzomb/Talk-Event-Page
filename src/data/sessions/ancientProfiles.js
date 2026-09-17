/**
 * 古文明子主題素材（依本月剩餘場次標題自動選用）
 * keywords：由長到短排列，避免「印尼」被「印度」誤判
 */
const ANCIENT_IMAGE_ROOT = 'https://www.tcawg.com/data/images/202609/meting/Speaker/'

/** 古文明子主題圖（官網後台已上傳） */
export const ANCIENT_THEME_IMAGES = {
  southIndia: `${ANCIENT_IMAGE_ROOT}南印度.jpg`,
  centralAsia: `${ANCIENT_IMAGE_ROOT}中亞.jpg`,
  egypt: `${ANCIENT_IMAGE_ROOT}埃及.jpg`,
  bhutan: `${ANCIENT_IMAGE_ROOT}b2787b.jpg`,
}

export const ANCIENT_PROFILE_ORDER = [
  'south-asia',
  'south-india',
  'bhutan',
  'laos',
  'indonesia',
  'central-asia',
  'egypt',
  'maya-inca',
  'generic',
]

/** @type {Array<{
 *   id: string
 *   labelShort: string
 *   keywords: string[]
 *   heroLead?: string
 *   storyEyebrow: string
 *   storyTitle: string
 *   story: string
 *   highlights: string[]
 *   imageAlt: string
 *   heroImage: string
 *   sectionImage: string
 *   storyImage: string
 *   heroPosition?: string
 *   sectionPosition?: string
 *   storyPosition?: string
 * }>} */
export const ANCIENT_PROFILES = [
  {
    id: 'south-asia',
    labelShort: '南亞秘境',
    keywords: ['南亞秘境', '南亞'],
    storyEyebrow: '穿越千年的文明現場',
    storyTitle: '南亞秘境，從神廟到山城',
    story:
      '本月講座聚焦南亞方向，整理南印度、寮國、印尼、不丹等路線的節奏與亮點，協助您依天數與體力選出適合的入門行程。',
    highlights: ['南印度神廟古蹟', '寮國佛教遺產', '印尼・不丹秘境'],
    imageAlt: '南印度馬杜賴米納克希神廟彩色塔樓',
    heroImage: ANCIENT_THEME_IMAGES.southIndia,
    sectionImage: ANCIENT_THEME_IMAGES.southIndia,
    storyImage: ANCIENT_THEME_IMAGES.southIndia,
    heroPosition: 'center 34%',
    sectionPosition: 'center 42%',
    storyPosition: 'center 38%',
  },
  {
    id: 'south-india',
    labelShort: '南印度',
    keywords: ['南印度'],
    storyEyebrow: '千寺之城與殖民風情',
    storyTitle: '南印度：神廟、海岸與慢旅行',
    story:
      '從馬杜賴、亨比到喀拉拉海岸，講座整理南印度文化密度與交通節奏，適合喜歡建築、宗教藝術與深度慢遊的旅客。',
    highlights: ['米納克希神廟', '亨比遺跡群', '喀拉拉回水'],
    imageAlt: '南印度馬杜賴米納克希神廟',
    heroImage: ANCIENT_THEME_IMAGES.southIndia,
    sectionImage: ANCIENT_THEME_IMAGES.southIndia,
    storyImage: ANCIENT_THEME_IMAGES.southIndia,
    sectionPosition: 'center 42%',
    storyPosition: 'center 38%',
  },
  {
    id: 'bhutan',
    labelShort: '不丹',
    keywords: ['不丹'],
    storyEyebrow: '喜馬拉雅的幸福王國',
    storyTitle: '不丹：山城、寺院與文化深度',
    story:
      '講座說明不丹的入出境安排、山城動線與寺院文化，協助您評估這趟喜馬拉雅旅程的天數與體力需求。',
    highlights: ['虎穴寺', '廷布山城', '佛教文化體驗'],
    imageAlt: '不丹虎穴寺依山而建',
    heroImage: ANCIENT_THEME_IMAGES.bhutan,
    sectionImage: ANCIENT_THEME_IMAGES.bhutan,
    storyImage: ANCIENT_THEME_IMAGES.bhutan,
    sectionPosition: 'center 48%',
  },
  {
    id: 'laos',
    labelShort: '寮國',
    keywords: ['寮國'],
    storyEyebrow: '湄公河畔的慢時光',
    storyTitle: '寮國：古城、佛教與悠閒步調',
    story:
      '從琅勃拉邦到萬象，講座整理寮國的古城氛圍、佛教文化與適合慢旅行的節奏安排。',
    highlights: ['琅勃拉邦古城', '湄公河風光', '佛教晨昏儀式'],
    imageAlt: '寮國琅勃拉邦佛教寺廟',
    heroImage: ANCIENT_THEME_IMAGES.southIndia,
    sectionImage: ANCIENT_THEME_IMAGES.southIndia,
    storyImage: ANCIENT_THEME_IMAGES.southIndia,
    sectionPosition: 'center 40%',
  },
  {
    id: 'indonesia',
    labelShort: '印尼',
    keywords: ['印尼'],
    storyEyebrow: '火山、海島與多元文化',
    storyTitle: '印尼：從爪哇到巴厘的百變風景',
    story:
      '講座介紹印尼火山群、海島度假與文化古城的組合方式，協助您依興趣挑選爪哇、巴厘或其他島嶼路線。',
    highlights: ['婆羅浮屠', '巴厘島文化', '火山與海島'],
    imageAlt: '印尼婆羅浮屠佛塔',
    heroImage: ANCIENT_THEME_IMAGES.southIndia,
    sectionImage: ANCIENT_THEME_IMAGES.southIndia,
    storyImage: ANCIENT_THEME_IMAGES.southIndia,
    sectionPosition: 'center 40%',
  },
  {
    id: 'central-asia',
    labelShort: '中亞',
    keywords: ['中亞', '絲路', '烏茲別克', '撒馬爾罕', '布哈拉', '哈薩克', '吉爾吉斯', '塔吉克', '土庫曼'],
    storyEyebrow: '絲路古城與伊斯蘭建築',
    storyTitle: '中亞：撒馬爾罕藍色穹頂下的文明交會',
    story:
      '本月聚焦中亞絲路古城，從烏茲別克撒馬爾罕、布哈拉到周邊文化遺產，講座整理動線、季節與旅行節奏。',
    highlights: ['撒馬爾罕雷吉斯坦', '布哈拉古城', '絲路文化遺產'],
    imageAlt: '中亞撒馬爾罕藍色穹頂建築',
    heroImage: ANCIENT_THEME_IMAGES.centralAsia,
    sectionImage: ANCIENT_THEME_IMAGES.centralAsia,
    storyImage: ANCIENT_THEME_IMAGES.centralAsia,
    heroPosition: 'center 34%',
    sectionPosition: 'center 48%',
    storyPosition: 'center 48%',
  },
  {
    id: 'egypt',
    labelShort: '埃及',
    keywords: ['埃及', '金字塔', '尼羅河', '路克索'],
    storyEyebrow: '尼羅河畔的千年文明',
    storyTitle: '埃及：金字塔、神廟與尼羅河遊船',
    story:
      '講座整理開羅、路克索與尼羅河遊船的經典動線，說明古文明遺跡的參訪節奏與季節建議。',
    highlights: ['吉薩金字塔', '路克索神廟', '尼羅河遊船'],
    imageAlt: '埃及吉薩金字塔群',
    heroImage: ANCIENT_THEME_IMAGES.egypt,
    sectionImage: ANCIENT_THEME_IMAGES.egypt,
    storyImage: ANCIENT_THEME_IMAGES.egypt,
    sectionPosition: 'center 46%',
  },
  {
    id: 'maya-inca',
    labelShort: '馬雅・印加',
    keywords: ['馬雅', '印加', '馬丘比丘'],
    storyEyebrow: '美洲古文明遺跡',
    storyTitle: '馬雅與印加：石砌文明的世界遺產',
    story:
      '講座介紹馬雅與印加遺跡的參訪重點與高海拔注意事項，協助您規劃中南美古文明深度行程。',
    highlights: ['馬丘比丘', '馬雅金字塔', '世界遺產古蹟'],
    imageAlt: '印加文明遺跡馬丘比丘',
    heroImage: 'https://www.tcawg.com/travel/data/images/202605/Casia/30.jpg',
    sectionImage: 'https://www.tcawg.com/travel/data/images/202605/Casia/30.jpg',
    storyImage: 'https://www.tcawg.com/travel/data/images/202605/Casia/30.jpg',
    sectionPosition: 'center 46%',
  },
  {
    id: 'generic',
    labelShort: '古文明',
    keywords: [],
    storyEyebrow: '穿越千年的文明現場',
    storyTitle: '不只看遺跡，更讀懂文明如何相遇',
    story:
      '本月古文明講座涵蓋多條路線，實際開講主題依當月場次而定，請見下方日期與講座重點。',
    highlights: ['世界遺產古蹟', '文化深度體驗', '小團慢遊節奏'],
    imageAlt: '古文明旅遊講座',
    heroImage: 'https://www.tcawg.com/travel/data/images/202605/Casia/30.jpg',
    sectionImage: 'https://www.tcawg.com/travel/data/images/202605/Casia/01.jpg',
    storyImage: 'https://www.tcawg.com/travel/data/images/202605/Casia/30.jpg',
    sectionPosition: 'center 48%',
    storyPosition: 'center 38%',
  },
]

const profileById = new Map(ANCIENT_PROFILES.map((profile) => [profile.id, profile]))

export function getAncientProfile(id) {
  return profileById.get(id) ?? profileById.get('generic')
}
