/**
 * 组件同步脚本
 *
 * 将组件库 src/components 下的 .vue 组件同步（复制）到 App 前端 src/shared/components。
 * 支持：
 *   - 文件重命名（如 Empty.vue → EmptyState.vue）
 *   - import 路径改写（如 @/utils/rpx → @/shared/utils/rpx）
 *   - 排除 Wrapper 组件（含业务逻辑，不参与自动同步）
 *   - dry-run 模式（仅预览，不写入文件）
 *   - 孤儿文件检测（目标目录中存在但源目录无对应文件的组件）
 *   - 附加同步 rpx.ts 和 variables.scss
 *
 * 运行：
 *   pnpm run sync          实际同步
 *   pnpm run sync:dry-run  仅预览
 */
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

interface SyncConfig {
  source: string
  dest: string
  mappings: Record<string, string>
  importRewrites: Array<{
    from: string
    to: string
    action?: 'replace' | 'delete-line'
  }>
  exclude: string[]
  alsoSync: Array<{
    source: string
    dest: string
    headerComment?: string
  }>
}

const configPath = path.resolve(__dirname, 'sync.config.json')
const config: SyncConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

const libRoot = path.resolve(__dirname, '..')
const sourceDir = path.resolve(libRoot, config.source)
const destDir = path.resolve(libRoot, config.dest)

interface SyncResult {
  action: 'copy' | 'skip' | 'rename' | 'exclude' | 'delete' | 'also-sync'
  file: string
  target?: string
  reason?: string
}

function fileHash(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf-8')
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8)
}

function contentHash(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8)
}

function applyImportRewrites(content: string): string {
  let result = content
  for (const rule of config.importRewrites) {
    if (rule.action === 'delete-line') {
      // 删除包含该 import 的整行
      const lines = result.split('\n')
      const filtered = lines.filter(line => !line.includes(rule.from))
      result = filtered.join('\n')
    } else {
      // 替换 import 路径
      result = result.split(rule.from).join(rule.to)
    }
  }
  return result
}

function getDestFileName(srcFileName: string): string {
  return config.mappings[srcFileName] || srcFileName
}

function shouldExclude(fileName: string): boolean {
  // 排除列表中的文件不同步
  return config.exclude.includes(fileName)
}

function syncComponent(srcPath: string, fileName: string, dryRun: boolean): SyncResult {
  const destFileName = getDestFileName(fileName)
  const destPath = path.join(destDir, destFileName)

  // 如果在排除列表中且不在 mappings 中（即不需要重命名版），跳过
  if (shouldExclude(fileName) && !config.mappings[fileName]) {
    return { action: 'exclude', file: fileName, reason: '在排除列表中' }
  }

  // 如果在排除列表中但在 mappings 中（如 TabBar→MainTabs），跳过原文件
  // MainTabs 在 App 前端是 Wrapper 组件，不从组件库同步
  if (shouldExclude(fileName) && config.mappings[fileName]) {
    return { action: 'exclude', file: fileName, reason: '目标是 Wrapper 组件，不同步' }
  }

  const srcContent = fs.readFileSync(srcPath, 'utf-8')
  const processedContent = applyImportRewrites(srcContent)

  // 对比哈希，跳过未变化的文件
  if (fs.existsSync(destPath)) {
    const destHash = fileHash(destPath)
    const srcHash = contentHash(processedContent)
    if (destHash === srcHash) {
      return { action: 'skip', file: fileName, reason: '内容未变化' }
    }
  }

  // dry-run 模式下不写入文件，仅报告将要执行的操作
  if (dryRun) {
    const isRename = destFileName !== fileName
    return {
      action: isRename ? 'rename' : 'copy',
      file: fileName,
      target: destFileName
    }
  }

  // 确保目标目录存在
  fs.mkdirSync(destDir, { recursive: true })

  const isRename = destFileName !== fileName
  fs.writeFileSync(destPath, processedContent, 'utf-8')

  return {
    action: isRename ? 'rename' : 'copy',
    file: fileName,
    target: destFileName
  }
}

function syncAlsoSync(dryRun: boolean): SyncResult[] {
  const results: SyncResult[] = []
  for (const item of config.alsoSync) {
    const srcPath = path.resolve(libRoot, item.source)
    const destPath = path.resolve(libRoot, item.dest)

    if (!fs.existsSync(srcPath)) {
      results.push({ action: 'also-sync', file: item.source, reason: '源文件不存在' })
      continue
    }

    let content = fs.readFileSync(srcPath, 'utf-8')

    // 如果需要添加头部注释
    if (item.headerComment) {
      const lines = content.split('\n')
      // 如果第一行是注释块开始，替换内容
      if (lines[0] && lines[0].startsWith('/**')) {
        // 找到注释块结束位置
        const endIndex = lines.findIndex((line, i) => i > 0 && line.includes('*/'))
        if (endIndex > 0) {
          const newHeader = [
            '/**',
            ` * ${item.headerComment}`,
            ` * 同步时间：${new Date().toISOString().split('T')[0]}`,
            ' */'
          ]
          lines.splice(0, endIndex + 1, ...newHeader)
          content = lines.join('\n')
        }
      }
    }

    // 对比哈希
    if (fs.existsSync(destPath)) {
      const destHash = fileHash(destPath)
      const srcHash = contentHash(content)
      if (destHash === srcHash) {
        results.push({ action: 'skip', file: item.source, reason: '内容未变化' })
        continue
      }
    }

    // dry-run 模式下不写入文件
    if (dryRun) {
      results.push({ action: 'also-sync', file: item.source, target: item.dest })
      continue
    }

    fs.mkdirSync(path.dirname(destPath), { recursive: true })
    fs.writeFileSync(destPath, content, 'utf-8')
    results.push({ action: 'also-sync', file: item.source, target: item.dest })
  }
  return results
}

function findOrphanedFiles(syncedFiles: Set<string>): SyncResult[] {
  const results: SyncResult[] = []
  if (!fs.existsSync(destDir)) return results

  // App 前端 shared/components 下的所有 .vue 文件
  const destFiles = fs.readdirSync(destDir).filter(f => f.endsWith('.vue'))

  // Wrapper 组件和独立组件的预期文件名（不应被删除）
  const expectedKeep = new Set([
    'SvgIcon.vue',
    'AppBottomBar.vue',
    'GlobalChatBar.vue',
    'PageCard.vue',
    'SubPageCard.vue',
    'SubPageCard2.vue',
    'MainTabs.vue',
    'svg-cache.ts',
    'index.ts'
  ])

  for (const destFile of destFiles) {
    if (expectedKeep.has(destFile)) continue
    if (syncedFiles.has(destFile)) continue

    // 这是孤儿文件——在组件库中不存在对应源文件
    // 不自动删除，仅报告
    results.push({ action: 'delete', file: destFile, reason: '组件库中无对应源文件（孤儿组件）' })
  }

  return results
}

// ===== 主逻辑 =====
const isDryRun = process.argv.includes('--dry-run')

console.log(`\n${isDryRun ? '[DRY RUN] ' : ''}组件同步：${config.source} → ${config.dest}\n`)

// 确保源目录存在
if (!fs.existsSync(sourceDir)) {
  console.error(`错误：源目录不存在：${sourceDir}`)
  process.exit(1)
}

// 获取源目录所有 .vue 文件
const sourceFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.vue'))
const results: SyncResult[] = []
const syncedDestFiles = new Set<string>()

for (const fileName of sourceFiles) {
  const srcPath = path.join(sourceDir, fileName)
  const result = syncComponent(srcPath, fileName, isDryRun)
  results.push(result)
  // copy/rename/skip 都意味着目标文件存在且有对应源文件，应计入已同步集合
  // （skip 表示内容未变化，目标文件已存在且与源一致）
  if (result.action === 'copy' || result.action === 'rename' || result.action === 'skip') {
    syncedDestFiles.add(result.target || fileName)
  }
}

// 同步 alsoSync 中的文件（rpx.ts, variables.scss 等）
const alsoResults = syncAlsoSync(isDryRun)
results.push(...alsoResults)

// 检查孤儿文件
const orphanResults = findOrphanedFiles(syncedDestFiles)

// 输出报告
const copied = results.filter(r => r.action === 'copy')
const renamed = results.filter(r => r.action === 'rename')
const skipped = results.filter(r => r.action === 'skip')
const excluded = results.filter(r => r.action === 'exclude')
const alsoSynced = results.filter(r => r.action === 'also-sync')

console.log('=== 同步报告 ===')
console.log(`复制：${copied.length} 个文件`)
copied.forEach(r => console.log(`  + ${r.file}`))
console.log(`重命名：${renamed.length} 个文件`)
renamed.forEach(r => console.log(`  -> ${r.file} → ${r.target}`))
console.log(`跳过（未变化）：${skipped.length} 个文件`)
console.log(`排除：${excluded.length} 个文件`)
excluded.forEach(r => console.log(`  - ${r.file} (${r.reason})`))
console.log(`附加同步：${alsoSynced.length} 个文件`)
alsoSynced.forEach(r => console.log(`  + ${r.file} → ${r.target}`))

if (orphanResults.length > 0) {
  console.log(`\n警告：孤儿文件（${orphanResults.length} 个）：`)
  orphanResults.forEach(r => console.log(`  ? ${r.file} — ${r.reason}`))
  console.log('  这些文件不会自动删除，请手动确认是否需要清理。')
}

console.log(`\n总计：${copied.length + renamed.length} 个文件已同步，${skipped.length} 个跳过\n`)
