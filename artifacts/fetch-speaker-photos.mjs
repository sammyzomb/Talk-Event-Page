import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { SPEAKER_PROFILES, SPEAKERS_BY_FLOW_ID } from '../src/data/speakers.js'
import { SESSIONS } from '../src/data/sessions/synced.js'

const outDir = join('artifacts', 'speaker-photos')
mkdirSync(outDir, { recursive: true })

const slug = {
  謝其峻: 'xie-qijun',
  陳姸方: 'chen-yanfang',
  張文譯: 'zhang-wenyi',
  林芮杋: 'lin-ruifan',
  蔡孟谷: 'cai-menggu',
  王秋萍: 'wang-qiuping',
  馬筠家: 'ma-yunjia',
  '曾文駿（JJ）': 'zeng-wenjun',
  郭厚璋: 'guo-houzhang',
  許家樸: 'xu-jiapu',
  '曾玟娸（VICKY）': 'zeng-wenqi',
  耿曼綸: 'geng-manlun',
  張書元: 'zhang-shuyuan',
  劉軒綸: 'liu-xuanlun',
}

const active = new Set()
for (const session of SESSIONS) {
  const label = SPEAKERS_BY_FLOW_ID[session.lectureFlowId] ?? ''
  for (const name of label.split('、').filter(Boolean)) active.add(name)
}

const manifest = []
for (const name of active) {
  const profile = SPEAKER_PROFILES[name]
  if (!profile?.image) {
    console.log('NO IMAGE', name)
    continue
  }
  const res = await fetch(profile.image)
  const buf = Buffer.from(await res.arrayBuffer())
  const ext = profile.image.includes('.png') ? 'png' : 'jpg'
  const file = `${slug[name] || 'unknown'}.${ext}`
  writeFileSync(join(outDir, file), buf)
  manifest.push({ name, file, kb: Math.round(buf.length / 1024), position: profile.imagePosition })
  console.log(res.status, `${Math.round(buf.length / 1024)}KB`, name, file)
}
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
