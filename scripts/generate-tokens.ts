/**
 * Design Token 生成脚本
 *
 * 读取 src/tokens/tokens.json（单一真相源），生成三份产物：
 *   1. src/styles/variables.scss  —— 覆盖现有 SCSS 变量（向后兼容，含“兼容旧变量”别名）
 *   2. src/tokens/tokens.css      —— CSS 自定义属性（未来 Web 端可用）
 *   3. src/tokens/tokens.ts       —— TS 常量（组件内联样式可用）
 *
 * 运行：pnpm run gen-tokens  （等价于 tsx scripts/generate-tokens.ts）
 *
 * 注意：禁止手动编辑生成产物，修改请编辑 tokens.json 后重新运行本脚本。
 */
import fs from 'fs'
import path from 'path'
import type { Tokens } from '../src/tokens/types'

const tokensPath = path.resolve(__dirname, '../src/tokens/tokens.json')
const outputPath = path.resolve(__dirname, '../src/styles')
const cssOutputPath = path.resolve(__dirname, '../src/tokens')
const tsOutputPath = path.resolve(__dirname, '../src/tokens')

const tokens: Tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'))

// ===== 生成 variables.scss =====
function generateScss(tokens: Tokens): string {
  const lines: string[] = [
    '/**',
    ' * Design Token - 蓝白金融设计系统',
    ` * 自动生成自 src/tokens/tokens.json (v${tokens.version})`,
    ` * 生成时间：${new Date().toISOString()}`,
    ' * 禁止手动编辑此文件！修改请编辑 tokens.json 后运行 npm run gen-tokens',
    ' */',
    ''
  ]

  // Brand
  lines.push('/* ===== Brand - Primary Blue ===== */')
  lines.push(`$primary: ${tokens.color.primary};`)
  lines.push(`$primary-deep: ${tokens.color.primaryDeep};`)
  lines.push(`$primary-light: ${tokens.color.primaryLight};`)
  for (const [key, value] of Object.entries(tokens.color.primaryScale)) {
    lines.push(`$primary-${key}: ${value};`)
  }
  lines.push('')
  lines.push('/* 兼容旧变量 */')
  lines.push('$brand-color: $primary;')
  lines.push(`$brand-color-secondary: $primary-600;`)
  lines.push(`$brand-gradient: linear-gradient(135deg, $primary 0%, $primary-600 100%);`)
  lines.push('')

  // Accent
  lines.push('/* ===== Accent - Cyan ===== */')
  lines.push(`$accent: ${tokens.color.accent};`)
  lines.push(`$accent-light: ${tokens.color.accentLight};`)
  lines.push(`$accent-deep: ${tokens.color.accentDeep};`)
  lines.push(`$accent-50: ${tokens.color.accentScale['50']};`)
  lines.push(`$accent-100: ${tokens.color.accentScale['100']};`)
  lines.push('')

  // Gold
  lines.push('/* ===== Gold - Premium ===== */')
  lines.push(`$gold: ${tokens.color.gold};`)
  lines.push(`$gold-light: ${tokens.color.goldLight};`)
  lines.push(`$gold-deep: ${tokens.color.goldDeep};`)
  lines.push(`$gold-soft: rgba(212, 168, 67, 0.12);`)
  lines.push('')

  // Background
  lines.push('/* ===== Background ===== */')
  lines.push(`$bg-page: ${tokens.color.background.page};`)
  lines.push(`$bg-card: ${tokens.color.background.card};`)
  lines.push(`$bg-soft: ${tokens.color.background.soft};`)
  lines.push(`$bg-deep: ${tokens.color.background.deep};`)
  lines.push('')
  lines.push('/* 兼容旧变量 */')
  lines.push('$bg-color: $bg-page;')
  lines.push('$bg-color-grey: $bg-card;')
  lines.push('$bg-color-hover: $bg-deep;')
  lines.push('$bg-color-muted: $bg-soft;')
  lines.push('')

  // Ink
  lines.push('/* ===== Ink - Text ===== */')
  lines.push(`$ink: ${tokens.color.ink.default};`)
  lines.push(`$ink-soft: ${tokens.color.ink.soft};`)
  lines.push(`$ink-mute: ${tokens.color.ink.mute};`)
  lines.push(`$ink-faint: ${tokens.color.ink.faint};`)
  lines.push('')
  lines.push('/* 兼容旧变量 */')
  lines.push('$text-color-title: $ink;')
  lines.push('$text-color: $ink;')
  lines.push('$text-color-secondary: $ink-soft;')
  lines.push('$text-color-tertiary: $ink-mute;')
  lines.push('$text-color-placeholder: $ink-faint;')
  lines.push('')

  // Lines
  lines.push('/* ===== Lines ===== */')
  lines.push(`$line: ${tokens.color.line.default};`)
  lines.push(`$line-soft: ${tokens.color.line.soft};`)
  lines.push(`$line-strong: ${tokens.color.line.strong};`)
  lines.push('')
  lines.push('/* 兼容旧变量 */')
  lines.push('$border-color: $line;')
  lines.push('$border-color-light: $line-soft;')
  lines.push('')

  // Semantic
  lines.push('/* ===== Semantic - Stock Market (A股: 红涨绿跌) ===== */')
  lines.push(`$up: ${tokens.color.semantic.up};`)
  lines.push(`$up-soft: rgba(229, 77, 94, 0.1);`)
  lines.push(`$up-bg: rgba(229, 77, 94, 0.06);`)
  lines.push(`$down: ${tokens.color.semantic.down};`)
  lines.push(`$down-soft: rgba(24, 160, 88, 0.1);`)
  lines.push(`$down-bg: rgba(24, 160, 88, 0.06);`)
  lines.push(`$flat: ${tokens.color.semantic.flat};`)
  lines.push(`$warning: ${tokens.color.semantic.warning};`)
  lines.push(`$warning-soft: rgba(240, 160, 32, 0.1);`)
  lines.push(`$warning-bg: rgba(240, 160, 32, 0.08);`)
  lines.push('')
  lines.push('/* 兼容旧变量 */')
  lines.push('$stock-up-color: $up;')
  lines.push('$stock-down-color: $down;')
  lines.push('$stock-flat-color: $flat;')
  lines.push('$success-color: $down;')
  lines.push('$error-color: $up;')
  lines.push('$info-color: $primary;')
  lines.push('')

  // Shadows
  lines.push('/* ===== Shadows ===== */')
  lines.push(`$shadow-xs: ${tokens.shadow.xs};`)
  lines.push(`$shadow-sm: ${tokens.shadow.sm};`)
  lines.push(`$shadow-card: ${tokens.shadow.card};`)
  lines.push(`$shadow-hover: ${tokens.shadow.hover};`)
  lines.push(`$shadow-glow: ${tokens.shadow.glow};`)
  lines.push(`$shadow-primary: ${tokens.shadow.primary};`)
  lines.push('')
  lines.push('/* 兼容旧变量 */')
  lines.push('$shadow-base: $shadow-sm;')
  lines.push('$shadow-strong: $shadow-primary;')
  lines.push('')

  // Radius
  lines.push('/* ===== Radius (rpx) ===== */')
  lines.push(`$r-xs: ${tokens.radius.xs};`)
  lines.push(`$r-sm: ${tokens.radius.sm};`)
  lines.push(`$r-md: ${tokens.radius.md};`)
  lines.push(`$r-lg: ${tokens.radius.lg};`)
  lines.push(`$r-xl: ${tokens.radius.xl};`)
  lines.push(`$r-2xl: ${tokens.radius['2xl']};`)
  lines.push(`$r-3xl: ${tokens.radius['3xl']};`)
  lines.push(`$r-full: ${tokens.radius.full};`)
  lines.push('')
  lines.push('/* 兼容旧变量 */')
  lines.push('$radius-xs: $r-xs;')
  lines.push('$radius-sm: $r-sm;')
  lines.push('$radius-base: $r-md;')
  lines.push('$radius-lg: $r-lg;')
  lines.push('$radius-pill: $r-full;')
  lines.push('')

  // Spacing
  lines.push('/* ===== Spacing Scale (rpx) ===== */')
  lines.push(`$s-1: ${tokens.spacing['1']};`)
  lines.push(`$s-2: ${tokens.spacing['2']};`)
  lines.push(`$s-3: ${tokens.spacing['3']};`)
  lines.push(`$s-4: ${tokens.spacing['4']};`)
  lines.push(`$s-5: ${tokens.spacing['5']};`)
  lines.push(`$s-6: ${tokens.spacing['6']};`)
  lines.push(`$s-8: ${tokens.spacing['8']};`)
  lines.push(`$s-10: ${tokens.spacing['10']};`)
  lines.push(`$s-12: ${tokens.spacing['12']};`)
  lines.push(`$s-16: ${tokens.spacing['16']};`)
  lines.push('')
  lines.push('/* 兼容旧变量 */')
  lines.push('$spacing-xs: $s-1;')
  lines.push('$spacing-sm: $s-2;')
  lines.push('$spacing-base: $s-4;')
  lines.push('$spacing-lg: $s-6;')
  lines.push('')

  // Font Size
  lines.push('/* ===== Font Size Scale (rpx) ===== */')
  lines.push(`$font-size-xs: ${tokens.fontSize.xs};`)
  lines.push(`$font-size-sm: ${tokens.fontSize.sm};`)
  lines.push(`$font-size-base: ${tokens.fontSize.base};`)
  lines.push(`$font-size-md: ${tokens.fontSize.md};`)
  lines.push(`$font-size-lg: ${tokens.fontSize.lg};`)
  lines.push(`$font-size-xl: ${tokens.fontSize.xl};`)
  lines.push(`$font-size-2xl: ${tokens.fontSize['2xl']};`)
  lines.push(`$font-size-3xl: ${tokens.fontSize['3xl']};`)
  lines.push(`$font-size-4xl: ${tokens.fontSize['4xl']};`)
  lines.push('')
  lines.push('/* Line Height */')
  lines.push(`$lh-tight: ${tokens.lineHeight.tight};`)
  lines.push(`$lh-base: ${tokens.lineHeight.base};`)
  lines.push(`$lh-loose: ${tokens.lineHeight.loose};`)
  lines.push('')

  // Font Families
  lines.push('/* ===== Font Families ===== */')
  lines.push(`$font-sans: ${tokens.fontFamily.sans};`)
  lines.push(`$font-mono: ${tokens.fontFamily.mono};`)
  lines.push(`$font-display: ${tokens.fontFamily.display};`)
  lines.push('')

  // Letter Spacing
  lines.push('/* Letter Spacing */')
  lines.push(`$ls-tight: ${tokens.letterSpacing.tight};`)
  lines.push(`$ls-normal: ${tokens.letterSpacing.normal};`)
  lines.push(`$ls-wide: ${tokens.letterSpacing.wide};`)
  lines.push(`$ls-wider: ${tokens.letterSpacing.wider};`)
  lines.push('')

  // Z-index
  lines.push('/* ===== Z-index ===== */')
  for (const [key, value] of Object.entries(tokens.zIndex)) {
    lines.push(`$z-${key}: ${value};`)
  }
  lines.push('')

  // Overlay
  lines.push('/* ===== Overlay ===== */')
  lines.push(`$overlay-base: ${tokens.color.overlay.base};`)
  lines.push(`$overlay-light: ${tokens.color.overlay.light};`)
  lines.push(`$overlay-deep: ${tokens.color.overlay.deep};`)
  lines.push('$overlay-blur: blur(16rpx);')
  lines.push('$overlay-blur-strong: blur(32rpx);')
  lines.push('')

  // Focus Ring
  lines.push('/* ===== Focus Ring ===== */')
  lines.push(`$focus-ring: ${tokens.focusRing.default};`)
  lines.push(`$focus-ring-error: ${tokens.focusRing.error};`)
  lines.push(`$focus-ring-warn: ${tokens.focusRing.warn};`)
  lines.push('')

  // Opacity
  lines.push('/* ===== Opacity ===== */')
  lines.push(`$op-disabled: ${tokens.opacity.disabled};`)
  lines.push(`$op-active: ${tokens.opacity.active};`)
  lines.push(`$op-hover: ${tokens.opacity.hover};`)
  lines.push(`$op-readonly: ${tokens.opacity.readonly};`)
  lines.push('')

  // Transitions
  lines.push('/* ===== Transitions ===== */')
  lines.push(`$ease-out: ${tokens.transition.easeOut};`)
  lines.push(`$ease-spring: ${tokens.transition.easeSpring};`)
  lines.push(`$t-fast: ${tokens.transition.fast};`)
  lines.push(`$t-base: ${tokens.transition.base};`)
  lines.push(`$t-slow: ${tokens.transition.slow};`)
  lines.push(`$t-spring: ${tokens.transition.spring};`)
  lines.push('')

  // Grid & Breakpoints
  lines.push('/* ===== Grid & Breakpoints (参考，不强制使用) ===== */')
  lines.push(`$grid-cols: ${tokens.grid.cols};`)
  lines.push(`$grid-gutter: ${tokens.grid.gutter};`)
  lines.push(`$grid-margin: ${tokens.grid.margin};`)
  lines.push(`$bp-sm: ${tokens.breakpoint.sm};`)
  lines.push(`$bp-md: ${tokens.breakpoint.md};`)
  lines.push(`$bp-lg: ${tokens.breakpoint.lg};`)
  lines.push(`$bp-xl: ${tokens.breakpoint.xl};`)
  lines.push(`$bp-2xl: ${tokens.breakpoint['2xl']};`)
  lines.push('')

  // Pure Colors
  lines.push('/* ===== Pure Colors ===== */')
  lines.push(`$white: ${tokens.color.pure.white};`)
  lines.push(`$black: ${tokens.color.pure.black};`)
  lines.push('')

  // Semantic Gradients
  lines.push('/* ===== Semantic Gradients (渐变中间色) ===== */')
  lines.push(`$up-deep: ${tokens.color.semantic.upDeep};`)
  lines.push(`$up-light: ${tokens.color.semantic.upLight};`)
  lines.push(`$down-deep: ${tokens.color.semantic.downDeep};`)
  lines.push(`$down-light: ${tokens.color.semantic.downLight};`)
  lines.push(`$warning-light: ${tokens.color.semantic.warningLight};`)
  lines.push('')

  // Active / Hover Backgrounds
  lines.push('/* ===== Active / Hover Backgrounds ===== */')
  lines.push(`$primary-active-bg: ${tokens.activeBackground.primary};`)
  lines.push('')

  // Safe Area
  lines.push('/* ===== Safe Area (移动端适配) ===== */')
  lines.push('$safe-top: env(safe-area-inset-top, 0px);')
  lines.push('$safe-bottom: env(safe-area-inset-bottom, 0px);')

  return lines.join('\n') + '\n'
}

// ===== 生成 tokens.css（TS 自定义属性） =====
function generateCss(tokens: Tokens): string {
  const lines: string[] = [
    '/**',
    ` * Design Token CSS Variables — 自动生成自 tokens.json (v${tokens.version})`,
    ` * 生成时间：${new Date().toISOString()}`,
    ' * 禁止手动编辑此文件！',
    ' */',
    '',
    ':root {',
    `  --color-primary: ${tokens.color.primary};`,
    `  --color-primary-deep: ${tokens.color.primaryDeep};`,
    `  --color-accent: ${tokens.color.accent};`,
    `  --color-gold: ${tokens.color.gold};`,
    `  --color-bg-page: ${tokens.color.background.page};`,
    `  --color-bg-card: ${tokens.color.background.card};`,
    `  --color-bg-soft: ${tokens.color.background.soft};`,
    `  --color-ink: ${tokens.color.ink.default};`,
    `  --color-ink-soft: ${tokens.color.ink.soft};`,
    `  --color-ink-mute: ${tokens.color.ink.mute};`,
    `  --color-line: ${tokens.color.line.default};`,
    `  --color-line-soft: ${tokens.color.line.soft};`,
    `  --color-up: ${tokens.color.semantic.up};`,
    `  --color-down: ${tokens.color.semantic.down};`,
    `  --color-flat: ${tokens.color.semantic.flat};`,
    `  --color-warning: ${tokens.color.semantic.warning};`,
    `  --color-white: ${tokens.color.pure.white};`,
    `  --color-black: ${tokens.color.pure.black};`,
    `  --radius-sm: ${tokens.radius.sm};`,
    `  --radius-md: ${tokens.radius.md};`,
    `  --radius-lg: ${tokens.radius.lg};`,
    `  --radius-full: ${tokens.radius.full};`,
    `  --shadow-sm: ${tokens.shadow.sm};`,
    `  --shadow-card: ${tokens.shadow.card};`,
    `  --font-sans: ${tokens.fontFamily.sans};`,
    `  --font-mono: ${tokens.fontFamily.mono};`,
    '}'
  ]
  return lines.join('\n') + '\n'
}

// ===== 生成 tokens.ts（TS 常量） =====
function generateTs(tokens: Tokens): string {
  const lines: string[] = [
    '/**',
    ` * Design Token TS Constants — 自动生成自 tokens.json (v${tokens.version})`,
    ` * 生成时间：${new Date().toISOString()}`,
    ' * 禁止手动编辑此文件！',
    ' */',
    '',
    'export const tokens = {',
    `  version: '${tokens.version}',`,
    `  color: {`,
    `    primary: '${tokens.color.primary}',`,
    `    primaryDeep: '${tokens.color.primaryDeep}',`,
    `    accent: '${tokens.color.accent}',`,
    `    gold: '${tokens.color.gold}',`,
    `    bgPage: '${tokens.color.background.page}',`,
    `    bgCard: '${tokens.color.background.card}',`,
    `    ink: '${tokens.color.ink.default}',`,
    `    inkSoft: '${tokens.color.ink.soft}',`,
    `    up: '${tokens.color.semantic.up}',`,
    `    down: '${tokens.color.semantic.down}',`,
    `    warning: '${tokens.color.semantic.warning}',`,
    `  },`,
    `} as const`,
    '',
    'export type Tokens = typeof tokens'
  ]
  return lines.join('\n') + '\n'
}

// ===== 执行生成 =====
const scss = generateScss(tokens)
const css = generateCss(tokens)
const ts = generateTs(tokens)

// 确保 output 目录存在
fs.mkdirSync(outputPath, { recursive: true })
fs.mkdirSync(cssOutputPath, { recursive: true })

// 写文件
fs.writeFileSync(path.join(outputPath, 'variables.scss'), scss, 'utf-8')
fs.writeFileSync(path.join(cssOutputPath, 'tokens.css'), css, 'utf-8')
fs.writeFileSync(path.join(tsOutputPath, 'tokens.ts'), ts, 'utf-8')

console.log('Token 产物已生成：')
console.log(`   - ${path.join(outputPath, 'variables.scss')}`)
console.log(`   - ${path.join(cssOutputPath, 'tokens.css')}`)
console.log(`   - ${path.join(tsOutputPath, 'tokens.ts')}`)
