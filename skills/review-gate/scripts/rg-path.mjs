#!/usr/bin/env node
// skill/review-gate/scripts/rg-path.mjs — 定位 rg 可执行并输出调用方式（三端通用）
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

function findInPath() {
  for (const name of ['rg.cmd', 'rg']) {
    try {
      const r = execFileSync('where', [name], { encoding: 'utf8' })
      const line = r.split(/\r?\n/).find((l) => l.trim())
      if (line) return line.trim()
    } catch { /* 继续 */ }
  }
  return null
}

const candidates = [process.env.RG_BIN, findInPath()]
  .filter(Boolean)
  .map((p) => ({ p, ok: p.endsWith('.cmd') || existsSync(p) }))

const found = candidates.find((c) => c.ok)
if (found) {
  console.log(`RG=${found.p}`)
  console.log('用法提示：$RG gate --stage <id> ｜ $RG audit --stage <id> --inline-docs ｜ $RG status')
} else {
  console.log('RG=NOT_FOUND')
  console.log('提示：设置环境变量 RG_BIN 指向 rg.cmd/rg（项目仓库 D:\\ai_project\\review-gate\\bin\\rg.cmd），或把该 bin 加入 PATH。')
  process.exit(1)
}
