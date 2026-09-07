/**
 * 逐頁建置（vite-plugin-singlefile 不支援 multi-page 一次 build）
 */
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, renameSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pages = ['all', 'russia', 'latin-america', 'aurora', 'ancient-civilization']

execSync('node scripts/sync-sessions.mjs', { cwd: root, stdio: 'inherit' })

mkdirSync(join(root, 'dist'), { recursive: true })

for (let i = 0; i < pages.length; i++) {
  const page = pages[i]
  console.log(`\n建置 ${page}.html …`)
  execSync('npx vite build', {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      BUILD_PAGE: page,
      EMPTY_OUT_DIR: i === 0 ? '1' : '0',
    },
  })

  const built = join(root, 'dist', `${page}.html`)
  if (!existsSync(built)) {
    const fallback = join(root, 'dist', 'index.html')
    if (existsSync(fallback)) renameSync(fallback, built)
  }
  if (!existsSync(built)) throw new Error(`找不到 dist/${page}.html`)
}

console.log('\n已建置 dist/*.html × 5')
