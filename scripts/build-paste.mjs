/**
 * 產生五份官網貼上版
 * node scripts/build-paste.mjs（需先 npm run build）
 */
import { createRequire } from 'node:module'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import postcss from 'postcss'
import prefixSelector from 'postcss-prefix-selector'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SCOPE = '#lecture-expo'

const PAGES = [
  { key: 'all', dist: 'all.html', folder: '總覽' },
  { key: 'russia', dist: 'russia.html', folder: '俄羅斯' },
  { key: 'latin-america', dist: 'latin-america.html', folder: '拉丁美洲' },
  { key: 'aurora', dist: 'aurora.html', folder: '極光' },
  { key: 'ancient-civilization', dist: 'ancient-civilization.html', folder: '古文明' },
]

const require = createRequire(import.meta.url)
const puppeteerPaths = [
  join(root, 'node_modules', 'puppeteer'),
  join(root, '..', '線上旅展', 'node_modules', 'puppeteer'),
  join(root, '..', '東南亞南亞', 'node_modules', 'puppeteer'),
]

let puppeteer
for (const path of puppeteerPaths) {
  try {
    puppeteer = (await import(pathToFileURL(require.resolve(path)).href)).default
    break
  } catch {
    /* try next */
  }
}
if (!puppeteer) throw new Error('找不到 puppeteer，請先 npm i')

const systemBrowsers = [
  `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env['ProgramFiles(x86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`,
]

function scopeCss(css) {
  return postcss()
    .use(
      prefixSelector({
        prefix: SCOPE,
        transform(prefix, selector, prefixedSelector) {
          if (selector.startsWith(prefix)) return selector
          if ([':root', 'html', 'body'].includes(selector)) return prefix
          if (selector === '*') return `${prefix}, ${prefix} *`
          return prefixedSelector
        },
      }),
    )
    .process(css, { from: undefined }).css
}

const guardCss = `${SCOPE} *:where(h1,h2,h3,h4,h5,h6,p,ul,ol,li,a,span,strong,em,img,svg,div,section,article,header,footer,nav,button,details,summary,table,thead,tbody,tr,th,td){border:0;outline:0;text-decoration:none;list-style:none;float:none;text-indent:0}`
/* 右側預留官網固定工具列寬度，避免滿版破版後蓋住「客製服務／最愛團型」列 */
/* 預設不做 viewport 負 margin（手機／官網外層會跑版）；僅寬螢幕滿版 */
const fullBleed = `${SCOPE}{width:100%!important;max-width:100%!important;margin-left:0!important;margin-right:0!important;padding-right:0!important;box-sizing:border-box!important;overflow-x:clip;isolation:isolate}
@media (min-width:1101px){${SCOPE}{width:auto!important;max-width:none!important;margin-left:calc(50% - 50vw)!important;margin-right:calc(50% - 50vw)!important}}`
// 官網 .text-edit img{height:auto!important} 會壓垮所有滿版圖，必須以同等權重擋回來
const fillImages = [
  '.lex-showcase-card img',
  '.lex-theme-feature-image img',
  '.lex-story-image img',
  '.lex-other-card-image img',
  '.lex-speaker-img',
  '.lex-lineup-img',
  '.lex-lineup-portrait img',
]
  .map((selector) => `${SCOPE} ${selector}`)
  .join(',')

const layoutGuardCss = [
  `${SCOPE} .lex-hero{overflow:clip!important}`,
  `${SCOPE} .lex-hero-bg{position:absolute!important;inset:0!important}`,
  `${SCOPE} .lex-hero-carousel img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;opacity:0!important;transition:opacity 1s ease!important}`,
  `@media (max-width:900px){${SCOPE} .lex-hero--theme{display:flex!important;flex-direction:column!important;justify-content:flex-end!important}${SCOPE} .lex-hero--theme .lex-hero-inner{padding-top:0!important;padding-bottom:6px!important}${SCOPE} .lex-hero--theme .lex-hero-carousel img{top:-8%!important;bottom:auto!important;height:116%!important;inset:auto 0!important}${SCOPE} .lex-hero--theme[data-theme='russia'] .lex-hero-carousel img[data-hero-slot='showcase']{top:-4%!important;height:108%!important}}`,
  `@media (min-width:901px){${SCOPE} .lex-hero{min-height:min(840px,82svh)!important}${SCOPE} .lex-hero--hub{min-height:min(860px,84svh)!important}${SCOPE} .lex-hero-carousel img,${SCOPE} .lex-hero-bg img{inset:auto 0 0!important;top:auto!important;height:118%!important;max-height:none!important}${SCOPE} .lex-hero--theme[data-theme='russia'] .lex-hero-carousel img[data-hero-slot='showcase']{height:110%!important}}`,
  `${SCOPE} .lex-hero-carousel img[data-active]{opacity:1!important;z-index:1!important}`,
  `${fillImages}{width:100%!important;height:100%!important;object-fit:cover!important}`,
  `${SCOPE} .lex-wide{width:calc(100% - 24px)!important;max-width:none!important;margin-inline:auto!important;box-sizing:border-box!important}`,
  `${SCOPE} .lex-wide:not(.lex-theme-section-layout){padding-inline:0!important}`,
  /* 主題卡同時帶 lex-wide：不可被 padding-inline:0 清掉左側內距 */
  `${SCOPE} .lex-theme-section-layout{padding:clamp(32px,4vw,52px) clamp(36px,4.5vw,56px)!important;box-sizing:border-box!important;overflow:hidden!important}`,
  `${SCOPE} .lex-container{width:calc(100% - 24px)!important;max-width:none!important;margin-inline:auto!important}`,
  `${SCOPE} .lex-hero{width:100%!important;max-width:none!important;margin-inline:0!important}`,
  `${SCOPE} .lex-hero-inner{width:100%!important;padding-left:10%!important;padding-right:max(10%,calc(var(--lex-site-rail,72px) + 28px))!important;box-sizing:border-box!important}`,
  `${SCOPE} .lex-table td[data-label='主講人']{min-width:108px!important;width:12%!important}`,
  `${SCOPE} .lex-table-speakers{display:grid!important;gap:4px!important;margin:0!important;padding:0!important;list-style:none!important}`,
  `${SCOPE} .lex-table-register{display:inline-flex!important;text-decoration:none!important;white-space:nowrap!important}`,
  `${SCOPE} .lex-lineup-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:14px!important;width:100%!important;float:none!important}`,
  `${SCOPE} .lex-lineup-card{display:grid!important;grid-template-columns:minmax(132px,0.42fr) minmax(0,1fr)!important;align-items:stretch!important;justify-items:stretch!important;min-height:210px!important;width:100%!important;max-width:100%!important;float:none!important;clear:both!important;position:relative!important;overflow:hidden!important}`,
  `${SCOPE} .lex-lineup-portrait{position:relative!important;display:block!important;width:100%!important;height:100%!important;min-height:186px!important;aspect-ratio:auto!important;overflow:hidden!important;align-self:stretch!important}`,
  `${SCOPE} .lex-lineup-portrait .lex-lineup-img,${SCOPE} .lex-lineup-portrait img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;max-width:none!important}`,
  `${SCOPE} .lex-lineup-body{display:grid!important;grid-template-columns:minmax(0,1fr)!important;justify-items:start!important;align-content:start!important;width:100%!important;float:none!important}`,
  `${SCOPE} .lex-lineup-sessions{display:grid!important;grid-template-columns:minmax(0,1fr)!important;justify-self:start!important;text-align:left!important;float:none!important;width:auto!important;margin-left:0!important}`,
  `${SCOPE} .lex-lineup-sessions li{display:block!important;float:none!important;text-align:left!important;width:auto!important}`,
  `${SCOPE} .lex-theme-faq summary{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:16px!important;list-style:none!important}`,
  `${SCOPE} .lex-theme-faq summary::-webkit-details-marker{display:none!important}`,
  `${SCOPE} .lex-theme-faq-toggle{flex:0 0 auto!important;display:grid!important;place-items:center!important;width:2rem!important;height:2rem!important;border-radius:999px!important}`,
  `${SCOPE}[data-lex-narrow] .lex-lineup-grid{grid-template-columns:1fr!important;gap:12px!important}`,
  `${SCOPE}[data-lex-narrow] .lex-lineup-card{grid-template-columns:96px minmax(0,1fr)!important;min-height:0!important;align-items:start!important}`,
  `${SCOPE}[data-lex-narrow] .lex-lineup-portrait{width:96px!important;height:96px!important;min-height:96px!important;aspect-ratio:1/1!important;align-self:start!important}`,
  `${SCOPE} .lex-hero-facts{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important}`,
  `${SCOPE} .lex-hub-next{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;list-style:none!important}`,
  `${SCOPE} .lex-glance-link{display:inline-flex!important;align-items:center!important;text-decoration:none!important}`,
  `${SCOPE} .lex-glance--hero{position:absolute!important;z-index:2!important;margin:0!important;right:max(24px,calc(var(--lex-site-rail,72px) + 20px))!important}`,
  `@media (min-width:901px){${SCOPE} .lex-hero--theme .lex-glance--hero,${SCOPE} .lex-hero--hub .lex-glance--hero{top:auto!important;bottom:64px!important;transform:none!important;width:auto!important}}`,
  `@media (max-width:900px){${SCOPE} .lex-glance--hero{position:relative!important;right:auto!important;bottom:auto!important;top:auto!important;justify-self:center!important;width:auto!important;margin:4px auto 28px!important}}`,
  `@media (min-width:1101px){${SCOPE} .lex-wide,${SCOPE} .lex-container{width:80%!important}}`,
  `@media (max-width:900px){${SCOPE}{--lex-site-rail:0px;padding-right:0!important};${SCOPE} .lex-hero-facts{grid-template-columns:1fr!important};${SCOPE} .lex-hub-next{grid-template-columns:1fr!important};${SCOPE} .lex-hero-inner{padding-right:10%!important};${SCOPE} .lex-lineup-grid{grid-template-columns:1fr!important;gap:12px!important};${SCOPE} .lex-lineup-card{grid-template-columns:96px minmax(0,1fr)!important;min-height:0!important;align-items:start!important};${SCOPE} .lex-lineup-portrait{width:96px!important;height:96px!important;min-height:96px!important;aspect-ratio:1/1!important;align-self:start!important}}`,
  `${SCOPE} .lex-others-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:16px!important}`,
  `${SCOPE} .lex-other-card{display:grid!important;grid-template-columns:150px 1fr!important;background:#fff!important;box-shadow:var(--lex-shadow)!important}`,
  `${SCOPE} .lex-other-card--hub{grid-template-columns:1fr!important}`,
  `${SCOPE} .lex-other-card-image{position:relative!important;min-height:180px!important}`,
  `${SCOPE} .lex-other-card-image img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important}`,
  `${SCOPE} .lex-other-card-copy,${SCOPE} .lex-other-card-title,${SCOPE} .lex-other-card-meta,${SCOPE} .lex-other-card-cta,${SCOPE} .lex-other-card small{background:transparent!important;box-shadow:none!important}`,
  `@media (max-width:900px){${SCOPE} .lex-others-grid{grid-template-columns:1fr!important}}`,
  `${SCOPE} [data-lex-end][hidden],${SCOPE} [data-lex-gone]{display:none!important}`,
].join('\n')

/* 官網版型右側工具列（在 #lecture-expo 外）：手機隱藏，桌機保留 */
const siteRailHideCss = `@media (max-width:900px){#sidebar,#sidebar-share-btn{display:none!important;visibility:hidden!important;pointer-events:none!important;opacity:0!important}}
body:has(${SCOPE}[data-lex-narrow]) #sidebar,body:has(${SCOPE}[data-lex-narrow]) #sidebar-share-btn{display:none!important;visibility:hidden!important;pointer-events:none!important;opacity:0!important}`

const runtimeScript = `<script>
(function(){
  var root=document.getElementById('lecture-expo');
  if(!root)return;
  function syncNarrow(){
    var sw=window.screen&&screen.width?screen.width:0;
    var iw=window.innerWidth||0;
    var rw=0;
    try{rw=root.getBoundingClientRect().width||root.clientWidth||0}catch(e){rw=root.clientWidth||0}
    var narrow=sw>0&&sw<=900||iw>0&&iw<=900||rw>0&&rw<=900;
    if(narrow)root.setAttribute('data-lex-narrow','');
    else root.removeAttribute('data-lex-narrow');
  }
  syncNarrow();
  function hidePast(){
    var now=Date.now();
    root.querySelectorAll('[data-lex-end]').forEach(function(el){
      var end=Date.parse(el.getAttribute('data-lex-end')||'');
      if(!end||end>now)return;
      el.setAttribute('hidden','');
      el.setAttribute('data-lex-gone','');
    });
    root.querySelectorAll('.lex-lineup-card').forEach(function(card){
      var items=card.querySelectorAll('.lex-lineup-sessions li');
      if(!items.length)return;
      var left=0;
      items.forEach(function(li){if(!li.hasAttribute('hidden'))left++});
      if(left===0){
        card.setAttribute('hidden','');
        card.setAttribute('data-lex-gone','');
        return;
      }
      var count=card.querySelector('.lex-lineup-count');
      if(count)count.textContent=left>1?'本月 '+left+' 場':'';
    });
    var lineup=root.querySelector('.lex-lineup');
    if(lineup&&!lineup.querySelector('.lex-lineup-card:not([hidden])')){
      lineup.setAttribute('hidden','');
      lineup.setAttribute('data-lex-gone','');
    }
    root.querySelectorAll('.lex-sessions').forEach(function(section){
      var rows=section.querySelectorAll('.lex-table tbody tr');
      var cards=section.querySelectorAll('.lex-card');
      var rowLeft=0,cardLeft=0;
      rows.forEach(function(row){if(!row.hasAttribute('hidden'))rowLeft++});
      cards.forEach(function(card){if(!card.hasAttribute('hidden'))cardLeft++});
      if((rows.length||cards.length)&&rowLeft===0&&cardLeft===0){
        section.setAttribute('hidden','');
        section.setAttribute('data-lex-gone','');
      }
    });
    var others=root.querySelector('#other-sessions');
    if(others){
      var table=others.querySelector('.lex-sessions');
      if(table&&table.hasAttribute('hidden')){
        others.setAttribute('hidden','');
        others.setAttribute('data-lex-gone','');
        var nav=root.querySelector('a[href="#other-sessions"]');
        if(nav){
          nav.setAttribute('hidden','');
          nav.setAttribute('data-lex-gone','');
        }
      }
    }
    root.querySelectorAll('.lex-other-card-meta[hidden]').forEach(function(el){
      if(el.parentNode.querySelector('.lex-other-card-meta-fallback'))return;
      var fallback=document.createElement('span');
      fallback.className='lex-other-card-meta lex-other-card-meta-fallback';
      fallback.textContent='本月場次請見專頁';
      el.parentNode.insertBefore(fallback,el.nextSibling);
    });
    var next=root.querySelector('.lex-register-next');
    if(next&&next.hasAttribute('hidden')){
      var heading=next.parentNode;
      if(heading&&!heading.querySelector('.lex-register-fallback')){
        var fallback=document.createElement('span');
        fallback.className='lex-register-fallback';
        fallback.textContent='請至場次表選擇場次，或查看官網全部講座';
        heading.appendChild(fallback);
      }
    }
  }
  hidePast();
  window.addEventListener('resize',syncNarrow);
  if(typeof ResizeObserver!=='undefined'){
    try{new ResizeObserver(syncNarrow).observe(root)}catch(e){}
  }
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var carousel=root.querySelector('.lex-hero-carousel');
    if(carousel){
      var slides=carousel.querySelectorAll('[data-hero-slide]');
      if(slides.length>1){
        var idx=0;
        setInterval(function(){
          slides[idx].removeAttribute('data-active');
          idx=(idx+1)%slides.length;
          slides[idx].setAttribute('data-active','');
        },2000);
      }
    }
  }
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  root.setAttribute('data-anim','');
  if(!('IntersectionObserver' in window)){
    root.querySelectorAll('[data-reveal]').forEach(function(el){el.setAttribute('data-revealed','')});
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting)return;
      entry.target.setAttribute('data-revealed','');
      io.unobserve(entry.target);
    });
  },{rootMargin:'0px 0px -12% 0px',threshold:.15});
  root.querySelectorAll('[data-reveal]').forEach(function(el){io.observe(el)});
})();
</script>`

const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700;900&display=swap" rel="stylesheet">`

const browser = await puppeteer.launch({
  headless: true,
  executablePath: systemBrowsers.find((path) => path && existsSync(path)),
})

for (const pageInfo of PAGES) {
  const distPath = join(root, 'dist', pageInfo.dist)
  if (!existsSync(distPath)) throw new Error(`找不到 ${distPath}，請先 npm run build`)

  const outDir = join(root, '官網貼上版', pageInfo.folder)
  mkdirSync(outDir, { recursive: true })

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(pathToFileURL(distPath).href, { waitUntil: 'networkidle0', timeout: 120000 })
  await page.waitForSelector(SCOPE)

  const { html, css } = await page.evaluate((scope) => {
    const node = document.querySelector(scope)
    node.removeAttribute('data-anim')
    node.querySelectorAll('[data-revealed]').forEach((el) => el.removeAttribute('data-revealed'))
    const css = [...document.querySelectorAll('style')].map((el) => el.textContent).join('\n')
    // 講師照片規則已併入上方 style，保留在內文只會讓 base64 重複一次
    node.querySelectorAll('style[data-lex-speaker-photos]').forEach((el) => el.remove())
    return { html: node.outerHTML, css }
  }, SCOPE)

  await page.close()

  const scopedCss = scopeCss(css)
  const embed = `<!-- 航向世界旅遊・主題講座活動頁・${pageInfo.folder}・官網貼上版 -->
${fonts}
<style>${guardCss}\n${scopedCss}\n${fullBleed}\n${layoutGuardCss}\n${siteRailHideCss}</style>
${html}
${runtimeScript}
`

  writeFileSync(join(outDir, '貼上用-HTML區塊.html'), embed, 'utf8')

  const fullPage = readFileSync(distPath, 'utf8')
  const head = fullPage.slice(fullPage.indexOf('<head>') + 6, fullPage.indexOf('</head>'))
  const headMeta = head.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').trim()

  writeFileSync(
    join(outDir, '完整頁面.html'),
    `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
${headMeta}
<style>${guardCss}\n${scopedCss}\n${fullBleed}\n${layoutGuardCss}\n${siteRailHideCss}</style>
</head>
<body style="margin:0">
${html}
${runtimeScript}
</body>
</html>
`,
    'utf8',
  )

  const chars = embed.length
  console.log(`✓ ${pageInfo.folder} 貼上版 (${chars.toLocaleString()} 字元)`)
  if (chars > 110000) console.warn(`  ⚠ 超過 CMS 建議上限 110k`)
}

await browser.close()
console.log('已產出 官網貼上版/*/貼上用-HTML區塊.html')
