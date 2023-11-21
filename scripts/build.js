import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const args = process.argv.slice(2)
const dir =
  args.reduce(
    (r, a) => {
      const opt = '--outDir='
      if (a.startsWith(opt)) return a.slice(opt.length)
      return r
    },
    void 0
  ) ?? 'dist/'
const base =
  args.reduce(
    (r, a) => {
      const opt = '--base='
      if (a.startsWith(opt)) return a.slice(opt.length)
      return r
    },
    void 0
  ) ?? '/'

const file = join(dir, 'index.html')

await mkdir(dir, { recursive: true })
console.log(`created dirs for ${dir}`)
await writeFile(
  file,
  `<html><body>
    <p><em>Proposed Update!</em></p>
    <p>Built into <code>${esc(dir)}</code> at ${esc(new Date())}</p>
    <p><a href="${encodeURI(base + '/index.html')}">This</a> is me.</p>
  </body></html>`
)
console.log(`wrote ${file}`)

/**
 *
 * @param {String} s
 */
function esc(s) {
  if (typeof s != 'string') s = String(s)
  return s.replace(/[<>&'"]/g, (c) => `&#${c.codePointAt(0)};`)
}
