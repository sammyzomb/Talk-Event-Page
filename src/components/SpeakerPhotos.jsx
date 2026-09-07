import { collectSpeakerPhotos } from '../lib/speakerLineup.js'

/**
 * 每張講師照片只輸出一條 CSS 規則，畫面上以 class 引用。
 * build-paste 會把這段抽進統一的 style 區塊，並自動加上 #lecture-expo 範圍。
 */
export function SpeakerPhotos({ sessions }) {
  const photos = collectSpeakerPhotos(sessions)
  if (photos.length === 0) return null

  const css = photos
    .map(({ slug, image }) => `.lex-sp--${slug}{background-image:url("${image}")}`)
    .join('')

  return <style data-lex-speaker-photos="" dangerouslySetInnerHTML={{ __html: css }} />
}
