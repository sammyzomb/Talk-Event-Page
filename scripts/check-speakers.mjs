import { readFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const sessions = JSON.parse(
  readFileSync(join(root, 'src/data/sessions/synced.js'), 'utf8').match(
    /export const SESSIONS = (\[[\s\S]*\])/,
  )[1],
)

const speakersText = readFileSync(join(root, 'src/data/speakers.js'), 'utf8')

const flow = {}
for (const m of speakersText.matchAll(/(\d+):\s*'([^']+)'/g)) {
  flow[Number(m[1])] = m[2]
}

const profileBlock =
  speakersText.match(/export const SPEAKER_PROFILES = \{([\s\S]*?)\n\}/)?.[1] ?? ''

/** @type {Map<string, { title: string, imageKind: string, imageRef: string }>} */
const profiles = new Map()
for (const m of profileBlock.matchAll(
  /^\s+(?:'([^']+)'|([^\s:]+)):\s*\{([\s\S]*?)^\s*\},?/gm,
)) {
  const name = m[1] || m[2]
  const body = m[3]
  const title = body.match(/title:\s*'([^']*)'/)?.[1] ?? ''
  let imageKind = 'none'
  let imageRef = ''
  if (/image:\s*speakerImage\(/.test(body)) {
    const speakerFile = body.match(/image:\s*speakerImage\('([^']+)'\)/)?.[1]
    if (speakerFile) {
      imageKind = 'remote'
      imageRef = `https://www.tcawg.com/data/images/202609/meting/Speaker/${encodeURI(speakerFile)}`
    }
  } else if (/image:\s*\w+Image/.test(body)) {
    imageKind = 'local'
    const token = body.match(/image:\s*(\w+Image)/)?.[1] ?? ''
    const map = {
      zhangShuyuanImage: 'src/assets/speakers/zhang-shuyuan.webp',
      xuJiapuImage: 'src/assets/speakers/xu-jiapu.webp',
      xieQijunImage: 'src/assets/speakers/xie-qijun.webp',
      linRuifanImage: 'src/assets/speakers/lin-ruifan.webp',
      guoHouzhangImage: 'src/assets/speakers/guo-houzhang.webp',
      gengManlunImage: 'src/assets/speakers/geng-manlun.webp',
    }
    imageRef = map[token] ?? token
  } else {
    const remote =
      body.match(/image:\s*`\$\{OFFICIAL_IMAGE_ROOT\}([^`]+)`/)?.[1] ??
      body.match(/image:\s*`(https?:\/\/[^`]+)`/)?.[1] ??
      body.match(/image:\s*'(https?:\/\/[^']+)'/)?.[1]
    if (remote) {
      imageKind = 'remote'
      imageRef = remote.startsWith('http')
        ? remote
        : `https://www.tcawg.com/travel/${remote}`
    }
  }
  profiles.set(name, { title, imageKind, imageRef })
}

async function head(url) {
  const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
  return {
    ok: res.ok,
    status: res.status,
    size: Number(res.headers.get('content-length') || 0),
  }
}

const byName = new Map()
const unmapped = []

for (const session of sessions) {
  const label = flow[session.lectureFlowId]
  if (!label) {
    unmapped.push(session)
    continue
  }
  for (const name of label.split('、').filter(Boolean)) {
    const list = byName.get(name) ?? []
    list.push(session)
    byName.set(name, list)
  }
}

console.log('========== 主講人完整檢查 ==========\n')
console.log(`同步場次：${sessions.length} 場`)
console.log(`有對照主講人：${sessions.length - unmapped.length} 場`)
console.log(`無對照：${unmapped.length} 場`)
if (unmapped.length) {
  for (const s of unmapped) {
    console.log(`  - #${s.lectureFlowId} ${s.date} ${s.region} ${s.title}`)
  }
}

const missing = []
const broken = []
const ok = []

console.log('\n--- 本月出現的主講人 ---\n')

for (const name of [...byName.keys()].sort()) {
  const sess = byName.get(name)
  const detail = sess.map((s) => `${s.date.slice(5)} ${s.region}`).join('、')
  const profile = profiles.get(name)

  if (!profile || profile.imageKind === 'none') {
    missing.push(name)
    console.log(`✗ ${name}`)
    console.log(`    場次：${detail}`)
    console.log(`    狀態：缺照片（畫面上顯示縮寫）`)
    continue
  }

  if (profile.imageKind === 'local') {
    const full = join(root, profile.imageRef)
    if (!existsSync(full)) {
      broken.push(name)
      console.log(`✗ ${name}`)
      console.log(`    場次：${detail}`)
      console.log(`    狀態：本地檔不存在 ${profile.imageRef}`)
    } else {
      const kb = Math.round(statSync(full).size / 1024)
      ok.push(name)
      console.log(`✓ ${name}${profile.title ? `（${profile.title}）` : ''}`)
      console.log(`    場次：${detail}`)
      console.log(`    狀態：本地 WebP ${kb} KB`)
    }
    continue
  }

  try {
    const { ok: reachable, status, size } = await head(profile.imageRef)
    if (!reachable || size < 1024) {
      broken.push(name)
      console.log(`⚠ ${name}`)
      console.log(`    場次：${detail}`)
      console.log(`    狀態：官網圖異常 HTTP ${status} / ${size} bytes`)
      console.log(`    URL：${profile.imageRef}`)
    } else {
      ok.push(name)
      console.log(`✓ ${name}${profile.title ? `（${profile.title}）` : ''}`)
      console.log(`    場次：${detail}`)
      console.log(`    狀態：官網圖 ${Math.round(size / 1024)} KB`)
    }
  } catch (error) {
    broken.push(name)
    console.log(`✗ ${name}`)
    console.log(`    場次：${detail}`)
    console.log(`    狀態：URL 失效 — ${error.message}`)
  }
}

// profiles that exist but not in current month sessions
const unused = [...profiles.keys()].filter((n) => !byName.has(n))
if (unused.length) {
  console.log('\n--- 有照片但本月場次未出現 ---')
  for (const name of unused) console.log(`· ${name}`)
}

console.log('\n========== 摘要 ==========')
console.log(`本月主講人：${byName.size} 位`)
console.log(`有照片且正常：${ok.length} 位`)
console.log(`缺照片：${missing.length} 位${missing.length ? ` → ${missing.join('、')}` : ''}`)
console.log(`照片異常：${broken.length} 位${broken.length ? ` → ${broken.join('、')}` : ''}`)
console.log(`場次無主講對照：${unmapped.length} 場`)

process.exit(missing.length + broken.length + unmapped.length > 0 ? 1 : 0)
