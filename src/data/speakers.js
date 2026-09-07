/** 主講人對照：Google 試算表「出團動態+需求紀錄」分頁「全省講座9月」 */
export const SPEAKER_SOURCE = {
  spreadsheetId: '1JYywF1HJShc3A7UnoJSVlzz6UzFWR_1oevbleI3va4g',
  sheetName: '全省講座9月',
  month: '2026-09',
}

/**
 * 以官網 lectureFlowId 對應講師。
 * 台南「夢幻自然」表上為 9/17，官網場次為 9/16（id 1948），仍對同一場。
 */
export const SPEAKERS_BY_FLOW_ID = {
  1934: '李小萍',
  1945: '陳姸方、徐維閔',
  1941: '呂適仲（Jack）',
  1935: '張書元',
  1936: '謝其峻',
  1946: '陳姸方、張文譯',
  1942: '林芮杋、蔡孟谷',
  1951: '王秋萍、馬筠家',
  1937: '曾文駿（JJ）',
  1948: '馬筠家、郭厚璋',
  1938: '謝其峻',
  1943: '曾文駿（JJ）',
  1939: '許家樸',
  1949: '張文譯、郭厚璋',
  1944: '曾玟娸（VICKY）、耿曼綸',
  1950: '張書元、謝其峻',
  1940: '劉軒綸',
}

/** 官網後台 202609/meting/Speaker 上傳目錄 */
const SPEAKER_IMAGE_ROOT = 'https://www.tcawg.com/data/images/202609/meting/Speaker/'

function speakerImage(filename) {
  return `${SPEAKER_IMAGE_ROOT}${encodeURI(filename)}`
}

const DEFAULT_IMAGE_POSITION = 'center 22%'

export const SPEAKER_PROFILES = {
  張書元: {
    name: '張書元',
    title: '旅遊達人',
    image: speakerImage('張書元5.jpg'),
    imagePosition: DEFAULT_IMAGE_POSITION,
  },
  許家樸: {
    name: '許家樸',
    title: '資深領隊',
    image: speakerImage('家樸.jpg'),
    // 人在畫面右側，預設 center 會裁掉臉與帽頂
    imagePosition: '78% 12%',
  },
  李小萍: {
    name: '李小萍',
    title: '旅遊達人',
    image: speakerImage('李小萍.jpg'),
    imagePosition: DEFAULT_IMAGE_POSITION,
  },
  王秋萍: {
    name: '王秋萍',
    title: '資深領隊',
    image: speakerImage('王秋萍3.jpg'),
    imagePosition: DEFAULT_IMAGE_POSITION,
  },
  陳姸方: {
    name: '陳姸方',
    title: '資深領隊',
    // 官網檔名為「陳妍方」（妍），顯示名維持表上「陳姸方」
    image: speakerImage('陳妍方.jpg'),
    // 人偏上；object-position Y 愈大愈能看到頭頂
    imagePosition: 'center 44%',
    imageScale: 108,
  },
  徐維閔: {
    name: '徐維閔',
    title: '資深領隊',
    image: speakerImage('徐維閔.jpg'),
    imagePosition: DEFAULT_IMAGE_POSITION,
  },
  '呂適仲（Jack）': {
    name: '呂適仲（Jack）',
    title: '資深領隊',
    image: speakerImage('呂適仲 (5).jpg'),
    imagePosition: DEFAULT_IMAGE_POSITION,
  },
  張文譯: {
    name: '張文譯',
    title: '資深領隊',
    image: speakerImage('張文譯2.jpg'),
    // 全身照，需放大；Y 太低會裁到天空
    imagePosition: 'center 23%',
    imageScale: 300,
  },
  蔡孟谷: {
    name: '蔡孟谷',
    title: '資深領隊',
    image: speakerImage('蔡孟谷.jpg'),
    imagePosition: DEFAULT_IMAGE_POSITION,
  },
  '曾文駿（JJ）': {
    name: '曾文駿（JJ）',
    title: '資深領隊',
    image: speakerImage('JJ.png'),
    imagePosition: DEFAULT_IMAGE_POSITION,
  },
  馬筠家: {
    name: '馬筠家',
    title: '資深領隊',
    image: speakerImage('馬筠家 3.jpg'),
    imagePosition: DEFAULT_IMAGE_POSITION,
  },
  '曾玟娸（VICKY）': {
    name: '曾玟娸（VICKY）',
    title: '資深領隊',
    image: speakerImage('曾玟娸.jpg'),
    imagePosition: DEFAULT_IMAGE_POSITION,
  },
  劉軒綸: {
    name: '劉軒綸',
    title: '資深領隊',
    image: speakerImage('劉軒綸 .jpg'),
    imagePosition: DEFAULT_IMAGE_POSITION,
  },
  謝其峻: {
    name: '謝其峻',
    title: '資深領隊',
    image: speakerImage('謝其峻-3.jpg'),
    imagePosition: 'center 70%',
  },
  林芮杋: {
    name: '林芮杋',
    title: '資深領隊',
    image: speakerImage('林芮杋-1.jpg'),
    imagePosition: 'center 28%',
  },
  郭厚璋: {
    name: '郭厚璋',
    title: '資深領隊',
    image: speakerImage('郭厚璋.jpg'),
    imagePosition: 'center 30%',
  },
  耿曼綸: {
    name: '耿曼綸',
    title: '資深領隊',
    image: speakerImage('耿曼綸.jpg'),
    imagePosition: 'center 25%',
  },
}

const PROFILE_NAMES = Object.keys(SPEAKER_PROFILES)

export function speakerForSession(session) {
  if (!session?.lectureFlowId) return ''
  return SPEAKERS_BY_FLOW_ID[session.lectureFlowId] ?? ''
}

export function getSpeakerProfile(name) {
  const index = PROFILE_NAMES.indexOf(name)
  if (index === -1) {
    return {
      name,
      title: '',
      image: '',
      imagePosition: DEFAULT_IMAGE_POSITION,
      slug: '',
    }
  }
  const profile = SPEAKER_PROFILES[name]
  return {
    ...profile,
    title: profile.title ?? '',
    imagePosition: profile.imagePosition ?? DEFAULT_IMAGE_POSITION,
    imageScale: profile.imageScale,
    slug: `sp${index + 1}`,
  }
}

export function speakerProfilesForSession(session) {
  return speakerForSession(session)
    .split('、')
    .filter(Boolean)
    .map(getSpeakerProfile)
}
