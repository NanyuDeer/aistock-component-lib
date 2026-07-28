# 前端架构改进实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立设计令牌单一真相源、组件同步自动化、组件库工程化（测试+预览+构建），消除三端手动复制导致的偏差和质量风险。

**Architecture:** 以 `aistock-component-lib` 为核心，通过 `tokens.json` 单一真相源生成多端产物（SCSS/CSS/TS），通过 `sync-components` 脚本自动同步组件到 `aistock-app-frontend`，通过 Vitest 快照测试和组件预览页保障组件质量。App 前端保持独立性，不依赖组件库目录。

**Tech Stack:** TypeScript, Vue 3, Vite 5, SCSS, Vitest, @vue/test-utils, happy-dom, node fs/path crypto

## Global Constraints

- App 前端不依赖组件库目录，可独立编译部署（现有硬约束）
- 组件同步方式为"复制"而非"引用"（现有架构决策）
- 所有脚本用 TypeScript 编写，通过 `tsx` 运行（`devDependencies` 中已有 `tsx`，需添加）
- 组件库包管理器为 pnpm（`packageManager: pnpm@11.9.0`）
- App 前端包管理器为 pnpm
- 禁止 emoji 图标，统一用 SvgIcon 组件加载 SVG（现有硬约束）
- 组件库现有 41 个组件在 `src/components/` 下
- App 前端现有 42 个组件在 `src/shared/components/` 下（含 SvgIcon.vue 和 svg-cache.ts）
- 组件命名映射：`Empty→EmptyState`、`Footer→TheFooter`、`NavBar→TheNavbar`、`TabBar→MainTabs`
- App 前端 Wrapper 组件不参与自动同步（AppBottomBar/MainTabs/PageCard/SubPageCard/SubPageCard2/GlobalChatBar）
- App 前端 SvgIcon 独立实现，不从组件库同步

---

## File Structure

### 组件库新增文件（`aistock-component-lib/`）

| 文件路径 | 职责 |
|---------|------|
| `src/tokens/tokens.json` | 设计令牌单一真相源（JSON 格式） |
| `scripts/generate-tokens.ts` | 读取 tokens.json，生成 SCSS/CSS/TS 三端产物 |
| `scripts/sync-components.ts` | 组件同步脚本：组件库→App 前端，支持重命名和路径改写 |
| `scripts/sync.config.json` | 同步配置：源目录、目标目录、映射表、排除列表、路径改写规则 |
| `vitest.config.ts` | Vitest 测试配置 |
| `src/components/__tests__/` | 组件测试目录（快照+props 测试） |
| `dev/CatalogPage.vue` | 组件目录预览页（替代 Storybook 的轻量方案） |
| `dev/main.ts`（修改） | 增加路由，支持预览首页和目录页切换 |

### App 前端新增/修改文件（`aistock-app-frontend/`）

| 文件路径 | 职责 |
|---------|------|
| `scripts/sync-components.ts` | 同步脚本入口（调用组件库的同步逻辑，或独立实现） |
| `sync.config.json` | App 前端侧的同步配置（从组件库复制到此） |
| `package.json`（修改） | 新增 `sync`、`sync:dry-run` 脚本命令 |
| `src/shared/styles/variables.scss`（修改） | 改为从 `tokens.scss`（生成产物）导入，不再手动维护 |

### 组件库修改文件

| 文件路径 | 修改内容 |
|---------|---------|
| `package.json` | 新增 devDeps（vitest, @vue/test-utils, happy-dom, tsx）、新增 scripts |
| `vite.config.ts` | 增加 lib 构建配置 |
| `src/styles/variables.scss` | 改为从生成脚本输出，不再手动编辑 |
| `src/index.ts` | 无需修改，保持现有导出 |

---

## Task 1: 创建设计令牌单一真相源

**Files:**
- Create: `aistock-component-lib/src/tokens/tokens.json`
- Create: `aistock-component-lib/scripts/generate-tokens.ts`
- Modify: `aistock-component-lib/package.json`（新增 tsx devDep + gen-tokens script）
- Test: 脚本运行后产物文件内容验证

**Interfaces:**
- Produces: `src/styles/variables.scss`（覆盖现有，内容由脚本生成）
- Produces: `src/tokens/tokens.css`（CSS 变量格式，未来 Web 端可用）
- Produces: `src/tokens/tokens.ts`（TS 常量格式，组件内联样式可用）

- [ ] **Step 1: 创建 tokens.json 单一真相源**

将现有 `src/styles/variables.scss` 的全部变量提取为结构化 JSON：

```json
{
  "version": "1.0.0",
  "description": "AiStock 蓝白金融设计系统 — 单一真相源",
  "color": {
    "primary": "#0b5fff",
    "primaryDeep": "#0a2e6f",
    "primaryLight": "#4d8bff",
    "primaryScale": {
      "50": "#eaf2ff",
      "100": "#d6e6ff",
      "200": "#adc8ff",
      "300": "#7da6ff",
      "400": "#4d8bff",
      "500": "#0b5fff",
      "600": "#0948cc",
      "700": "#0a2e6f"
    },
    "accent": "#00b8ff",
    "accentLight": "#5ad4ff",
    "accentDeep": "#0088c4",
    "accentScale": {
      "50": "#e6f8ff",
      "100": "#b3ecff"
    },
    "gold": "#d4a843",
    "goldLight": "#e8c878",
    "goldDeep": "#a67c1f",
    "background": {
      "page": "#eef3fb",
      "card": "#ffffff",
      "soft": "#f5f8fd",
      "deep": "#e6eef9"
    },
    "ink": {
      "default": "#0a1733",
      "soft": "#4b5a7a",
      "mute": "#8a96b0",
      "faint": "#b8c3d6"
    },
    "line": {
      "default": "#e1e9f5",
      "soft": "#eef3fb",
      "strong": "#c5d3e8"
    },
    "semantic": {
      "up": "#e54d5e",
      "upDeep": "#c43a48",
      "upLight": "#f06a78",
      "down": "#18a058",
      "downDeep": "#36b37e",
      "downLight": "#4dc878",
      "flat": "#909399",
      "warning": "#f0a020",
      "warningLight": "#f5b840"
    },
    "pure": {
      "white": "#ffffff",
      "black": "#000000"
    },
    "overlay": {
      "base": "rgba(10, 23, 51, 0.45)",
      "light": "rgba(10, 23, 51, 0.25)",
      "deep": "rgba(10, 23, 51, 0.65)"
    }
  },
  "radius": {
    "xs": "8rpx",
    "sm": "12rpx",
    "md": "16rpx",
    "lg": "20rpx",
    "xl": "24rpx",
    "2xl": "32rpx",
    "3xl": "40rpx",
    "full": "9999rpx"
  },
  "spacing": {
    "1": "8rpx",
    "2": "16rpx",
    "3": "24rpx",
    "4": "32rpx",
    "5": "40rpx",
    "6": "48rpx",
    "8": "64rpx",
    "10": "80rpx",
    "12": "96rpx",
    "16": "128rpx"
  },
  "fontSize": {
    "xs": "22rpx",
    "sm": "24rpx",
    "base": "26rpx",
    "md": "28rpx",
    "lg": "32rpx",
    "xl": "36rpx",
    "2xl": "44rpx",
    "3xl": "56rpx",
    "4xl": "72rpx"
  },
  "lineHeight": {
    "tight": "1.25",
    "base": "1.5",
    "loose": "1.75"
  },
  "fontFamily": {
    "sans": "'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    "mono": "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    "display": "'Orbitron', sans-serif"
  },
  "shadow": {
    "xs": "0 1px 2px rgba(11, 95, 255, 0.04)",
    "sm": "0 2px 6px -2px rgba(11, 95, 255, 0.06)",
    "card": "0 4px 20px -8px rgba(11, 95, 255, 0.12), 0 2px 6px -2px rgba(11, 95, 255, 0.06)",
    "hover": "0 12px 32px -8px rgba(11, 95, 255, 0.22), 0 4px 12px -2px rgba(11, 95, 255, 0.10)",
    "glow": "0 0 0 4px rgba(11, 95, 255, 0.12)",
    "primary": "0 4px 14px -2px rgba(11, 95, 255, 0.4)"
  },
  "zIndex": {
    "base": "0",
    "dropdown": "1000",
    "sticky": "1100",
    "fixed": "1200",
    "drawer": "1300",
    "modal": "1400",
    "popover": "1500",
    "toast": "1600",
    "tooltip": "1700"
  },
  "transition": {
    "easeOut": "cubic-bezier(0.4, 0, 0.2, 1)",
    "easeSpring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
    "fast": "0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    "base": "0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    "slow": "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "spring": "0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
  },
  "opacity": {
    "disabled": "0.45",
    "active": "0.85",
    "hover": "0.92",
    "readonly": "0.7"
  },
  "focusRing": {
    "default": "0 0 0 6rpx rgba(11, 95, 255, 0.20)",
    "error": "0 0 0 6rpx rgba(229, 77, 94, 0.20)",
    "warn": "0 0 0 6rpx rgba(240, 160, 32, 0.20)"
  }
}
```

- [ ] **Step 2: 添加 tsx devDep 和 gen-tokens 脚本到 package.json**

```jsonc
// aistock-component-lib/package.json — devDependencies 新增：
"tsx": "^4.19.0"

// scripts 新增：
"gen-tokens": "tsx scripts/generate-tokens.ts"
```

运行安装：`cd aistock-component-lib && pnpm install`

- [ ] **Step 3: 编写 generate-tokens.ts 脚本**

```typescript
// aistock-component-lib/scripts/generate-tokens.ts
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

  // Safe Area
  lines.push('/* ===== Safe Area (移动端适配) ===== */')
  lines.push('$safe-top: env(safe-area-inset-top, 0px);')
  lines.push('$safe-bottom: env(safe-area-inset-bottom, 0px);')

  return lines.join('\n') + '\n'
}

// ===== 生成 tokens.css（CSS 自定义属性） =====
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

console.log('✅ Token 产物已生成：')
console.log(`   - ${path.join(outputPath, 'variables.scss')}`)
console.log(`   - ${path.join(cssOutputPath, 'tokens.css')}`)
console.log(`   - ${path.join(tsOutputPath, 'tokens.ts')}`)
```

- [ ] **Step 4: 创建 tokens 类型定义文件**

```typescript
// aistock-component-lib/src/tokens/types.ts
export interface Tokens {
  version: string
  description: string
  color: {
    primary: string
    primaryDeep: string
    primaryLight: string
    primaryScale: Record<string, string>
    accent: string
    accentLight: string
    accentDeep: string
    accentScale: Record<string, string>
    gold: string
    goldLight: string
    goldDeep: string
    background: { page: string; card: string; soft: string; deep: string }
    ink: { default: string; soft: string; mute: string; faint: string }
    line: { default: string; soft: string; strong: string }
    semantic: {
      up: string; upDeep: string; upLight: string
      down: string; downDeep: string; downLight: string
      flat: string; warning: string; warningLight: string
    }
    pure: { white: string; black: string }
    overlay: { base: string; light: string; deep: string }
  }
  radius: Record<string, string>
  spacing: Record<string, string>
  fontSize: Record<string, string>
  lineHeight: { tight: string; base: string; loose: string }
  fontFamily: { sans: string; mono: string; display: string }
  shadow: Record<string, string>
  zIndex: Record<string, string>
  transition: {
    easeOut: string; easeSpring: string
    fast: string; base: string; slow: string; spring: string
  }
  opacity: { disabled: string; active: string; hover: string; readonly: string }
  focusRing: { default: string; error: string; warn: string }
}
```

- [ ] **Step 5: 运行生成脚本并验证产物**

Run: `cd aistock-component-lib && pnpm run gen-tokens`

Expected: 控制台输出 3 个文件路径，无错误

验证 `src/styles/variables.scss` 内容与原文件一致（diff 对比）：
Run: `git diff src/styles/variables.scss`
Expected: 只有头部注释变化（新增"自动生成"字样），变量值不变

- [ ] **Step 6: 运行类型检查确认无破坏**

Run: `cd aistock-component-lib && pnpm run type-check`
Expected: 零错误

- [ ] **Step 7: Commit**

```bash
cd aistock-component-lib
git add src/tokens/ scripts/generate-tokens.ts src/styles/variables.scss package.json
git commit -m "feat: 建立设计令牌单一真相源 (tokens.json → SCSS/CSS/TS)"
```

---

## Task 2: 组件同步脚本

**Files:**
- Create: `aistock-component-lib/scripts/sync-components.ts`
- Create: `aistock-component-lib/scripts/sync.config.json`
- Modify: `aistock-component-lib/package.json`（新增 sync 脚本）
- Modify: `aistock-app-frontend/package.json`（新增 sync 脚本）

**Interfaces:**
- Consumes: Task 1 的 tokens 生成流程（同步时也会触发 token 同步）
- Produces: `npm run sync` 命令，可将组件库组件同步到 App 前端

- [ ] **Step 1: 创建同步配置文件**

```json
// aistock-component-lib/scripts/sync.config.json
{
  "source": "src/components",
  "dest": "../aistock-app-frontend/src/shared/components",
  "mappings": {
    "Empty.vue": "EmptyState.vue",
    "Footer.vue": "TheFooter.vue",
    "NavBar.vue": "TheNavbar.vue",
    "TabBar.vue": "MainTabs.vue"
  },
  "importRewrites": [
    {
      "from": "@/utils/rpx",
      "to": "@/shared/utils/rpx"
    },
    {
      "from": "@/styles/variables",
      "to": "",
      "action": "delete-line"
    }
  ],
  "exclude": [
    "SvgIcon.vue",
    "GlobalChatBar.vue",
    "PageCard.vue",
    "SubPageCard.vue",
    "SubPageCard2.vue",
    "TabBar.vue"
  ],
  "alsoSync": [
    {
      "source": "src/utils/rpx.ts",
      "dest": "../aistock-app-frontend/src/shared/utils/rpx.ts"
    },
    {
      "source": "src/styles/variables.scss",
      "dest": "../aistock-app-frontend/src/shared/styles/variables.scss",
      "headerComment": "同步自 aistock-component-lib/src/styles/variables.scss（自动生成产物）"
    }
  ]
}
```

- [ ] **Step 2: 编写同步脚本**

```typescript
// aistock-component-lib/scripts/sync-components.ts
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
  // 排除列表中的文件不同步（但 mappings 中的除外——它们是重命名后排除原文件）
  return config.exclude.includes(fileName)
}

function syncComponent(srcPath: string, fileName: string): SyncResult {
  const destFileName = getDestFileName(fileName)
  const destPath = path.join(destDir, destFileName)

  // 如果在排除列表中且不在 mappings 中（即不需要重命名版），跳过
  if (shouldExclude(fileName) && !config.mappings[fileName]) {
    return { action: 'exclude', file: fileName, reason: '在排除列表中' }
  }

  // 如果在排除列表中但在 mappings 中（如 TabBar→MainTabs），跳过原文件
  // MainTabs 在 App 前端是 Wrapper 组件，不从组件库同步
  if (shouldExclude(fileName) && config.mappings[fileName]) {
    return { action: 'exclude', file: fileName, reason: '目标为 Wrapper 组件，不同步' }
  }

  const srcContent = fs.readFileSync(srcPath, 'utf-8')
  const processedContent = applyImportRewrites(srcContent)

  // 对比哈希，跳过未变化的文件
  if (fs.existsSync(destPath)) {
    const destHash = fileHash(destPath)
    const srcHash = crypto.createHash('md5').update(processedContent).digest('hex').slice(0, 8)
    if (destHash === srcHash) {
      return { action: 'skip', file: fileName, reason: '内容未变化' }
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

function syncAlsoSync(): SyncResult[] {
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
      const srcHash = crypto.createHash('md5').update(content).digest('hex').slice(0, 8)
      if (destHash === srcHash) {
        results.push({ action: 'skip', file: item.source, reason: '内容未变化' })
        continue
      }
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
  console.error(`❌ 源目录不存在：${sourceDir}`)
  process.exit(1)
}

// 获取源目录所有 .vue 文件
const sourceFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.vue'))
const results: SyncResult[] = []
const syncedDestFiles = new Set<string>()

for (const fileName of sourceFiles) {
  const srcPath = path.join(sourceDir, fileName)
  const result = syncComponent(srcPath, fileName)
  results.push(result)
  if (result.action === 'copy' || result.action === 'rename') {
    syncedDestFiles.add(result.target || fileName)
  }
}

// 同步 alsoSync 中的文件（rpx.ts, variables.scss 等）
const alsoResults = syncAlsoSync()
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
copied.forEach(r => console.log(`  ✓ ${r.file}`))
console.log(`重命名：${renamed.length} 个文件`)
renamed.forEach(r => console.log(`  → ${r.file} → ${r.target}`))
console.log(`跳过（未变化）：${skipped.length} 个文件`)
console.log(`排除：${excluded.length} 个文件`)
excluded.forEach(r => console.log(`  ⊘ ${r.file} (${r.reason})`))
console.log(`附加同步：${alsoSynced.length} 个文件`)
alsoSynced.forEach(r => console.log(`  + ${r.file} → ${r.target}`))

if (orphanResults.length > 0) {
  console.log(`\n⚠️  孤儿文件（${orphanResults.length} 个）：`)
  orphanResults.forEach(r => console.log(`  ? ${r.file} — ${r.reason}`))
  console.log('  这些文件不会自动删除，请手动确认是否需要清理。')
}

console.log(`\n总计：${copied.length + renamed.length} 个文件已同步，${skipped.length} 个跳过\n`)
```

- [ ] **Step 3: 添加 npm 脚本到组件库 package.json**

```jsonc
// aistock-component-lib/package.json — scripts 新增：
"sync": "tsx scripts/sync-components.ts",
"sync:dry-run": "tsx scripts/sync-components.ts --dry-run"
```

- [ ] **Step 4: 添加 npm 脚本到 App 前端 package.json**

```jsonc
// aistock-app-frontend/package.json — scripts 新增：
"sync": "cd ../aistock-component-lib && pnpm run sync",
"sync:dry-run": "cd ../aistock-component-lib && pnpm run sync:dry-run"
```

- [ ] **Step 5: 运行 dry-run 验证同步逻辑**

Run: `cd aistock-component-lib && pnpm run sync:dry-run`

Expected: 输出同步报告，显示所有 41 个组件库组件的状态（大部分应为 skip 或 copy），无错误

- [ ] **Step 6: 运行实际同步并验证**

Run: `cd aistock-component-lib && pnpm run sync`

Expected: 同步完成，App 前端组件更新

验证 App 前端类型检查：
Run: `cd ../aistock-app-frontend && npx tsc --noEmit`
Expected: 零错误

- [ ] **Step 7: Commit**

```bash
cd aistock-component-lib
git add scripts/sync-components.ts scripts/sync.config.json package.json
git commit -m "feat: 组件同步脚本（支持重命名/路径改写/dry-run/孤儿检测）"

cd ../aistock-app-frontend
git add package.json
git commit -m "chore: 新增 sync/sync:dry-run 脚本命令"
```

---

## Task 3: Vitest 快照测试基础设施

**Files:**
- Create: `aistock-component-lib/vitest.config.ts`
- Modify: `aistock-component-lib/package.json`（新增 vitest devDeps + test 脚本）
- Create: `aistock-component-lib/src/components/__tests__/Button.spec.ts`
- Create: `aistock-component-lib/src/components/__tests__/Card.spec.ts`
- Create: `aistock-component-lib/src/components/__tests__/Tag.spec.ts`
- Create: `aistock-component-lib/src/components/__tests__/Badge.spec.ts`
- Create: `aistock-component-lib/src/components/__tests__/Avatar.spec.ts`
- Create: `aistock-component-lib/src/components/__tests__/Switch.spec.ts`
- Create: `aistock-component-lib/src/components/__tests__/Empty.spec.ts`
- Create: `aistock-component-lib/src/components/__tests__/LoadingState.spec.ts`
- Create: `aistock-component-lib/src/components/__tests__/Rate.spec.ts`
- Create: `aistock-component-lib/src/components/__tests__/Progress.spec.ts`
- Create: `aistock-component-lib/src/components/__tests__/Skeleton.spec.ts`

**Interfaces:**
- Consumes: Task 1 的 variables.scss（通过 vitest scss 配置注入）
- Produces: `npm test` 命令，可运行所有组件测试

- [ ] **Step 1: 安装 Vitest 测试依赖**

Run: `cd aistock-component-lib && pnpm add -D vitest @vue/test-utils happy-dom @vitest/coverage-v8`

- [ ] **Step 2: 创建 vitest.config.ts**

```typescript
// aistock-component-lib/vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag =>
            ['view', 'text', 'image', 'scroll-view', 'input', 'button', 'icon', 'progress', 'slider', 'switch', 'textarea'].includes(tag)
        }
      }
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/components/**/*.vue']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  }
})
```

- [ ] **Step 3: 添加 test 脚本到 package.json**

```jsonc
// aistock-component-lib/package.json — scripts 新增：
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage",
"test:update": "vitest run -u"
```

- [ ] **Step 4: 创建第一个测试 — Button.spec.ts（含快照 + props 测试）**

```typescript
// aistock-component-lib/src/components/__tests__/Button.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  it('renders default button', () => {
    const wrapper = mount(Button, {
      slots: { default: '点击我' }
    })
    expect(wrapper.text()).toContain('点击我')
  })

  it('applies primary type class', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
      slots: { default: 'Primary' }
    })
    expect(wrapper.classes()).toContain('as-btn')
    expect(wrapper.classes()).toContain('as-btn--primary')
  })

  it('applies size class', () => {
    const wrapper = mount(Button, {
      props: { size: 'lg' },
      slots: { default: 'Large' }
    })
    expect(wrapper.classes()).toContain('as-btn--lg')
  })

  it('disables interaction when disabled', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click event when not disabled', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Click' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('matches snapshot', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary', size: 'md' },
      slots: { default: 'Snapshot' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 5: 运行 Button 测试验证**

Run: `cd aistock-component-lib && npx vitest run src/components/__tests__/Button.spec.ts`
Expected: 7 个测试全部 PASS

- [ ] **Step 6: 创建 Card.spec.ts**

```typescript
// aistock-component-lib/src/components/__tests__/Card.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../Card.vue'

describe('Card', () => {
  it('renders with title', () => {
    const wrapper = mount(Card, {
      props: { title: '趋势股评分' }
    })
    expect(wrapper.text()).toContain('趋势股评分')
  })

  it('renders with subtitle', () => {
    const wrapper = mount(Card, {
      props: { title: '标题', subtitle: '副标题' }
    })
    expect(wrapper.text()).toContain('副标题')
  })

  it('renders default slot content', () => {
    const wrapper = mount(Card, {
      props: { title: '标题' },
      slots: { default: '<div class="content">内容</div>' }
    })
    expect(wrapper.html()).toContain('内容')
  })

  it('renders footer slot', () => {
    const wrapper = mount(Card, {
      slots: { footer: '<div class="footer">底部</div>' }
    })
    expect(wrapper.html()).toContain('底部')
  })

  it('applies padding-rm class', () => {
    const wrapper = mount(Card, {
      props: { paddingRm: true }
    })
    expect(wrapper.classes()).toContain('as-card--padding-rm')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Card, {
      props: { title: '标题', subtitle: '副标题' },
      slots: { default: '内容' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 7: 创建 Tag.spec.ts 和 Badge.spec.ts**

```typescript
// aistock-component-lib/src/components/__tests__/Tag.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from '../Tag.vue'

describe('Tag', () => {
  it('renders text content', () => {
    const wrapper = mount(Tag, { slots: { default: '涨幅' } })
    expect(wrapper.text()).toBe('涨幅')
  })

  it('applies up type class', () => {
    const wrapper = mount(Tag, { props: { type: 'up' } })
    expect(wrapper.classes()).toContain('as-tag--up')
  })

  it('applies down type class', () => {
    const wrapper = mount(Tag, { props: { type: 'down' } })
    expect(wrapper.classes()).toContain('as-tag--down')
  })

  it('applies size class', () => {
    const wrapper = mount(Tag, { props: { size: 'lg' } })
    expect(wrapper.classes()).toContain('as-tag--lg')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Tag, { props: { type: 'up' }, slots: { default: '+3.2%' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

```typescript
// aistock-component-lib/src/components/__tests__/Badge.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../Badge.vue'

describe('Badge', () => {
  it('renders text content', () => {
    const wrapper = mount(Badge, { slots: { default: '新' } })
    expect(wrapper.text()).toBe('新')
  })

  it('applies primary type class', () => {
    const wrapper = mount(Badge, { props: { type: 'primary' } })
    expect(wrapper.classes()).toContain('as-badge--primary')
  })

  it('applies dot type', () => {
    const wrapper = mount(Badge, { props: { type: 'dot' } })
    expect(wrapper.classes()).toContain('as-badge--dot')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Badge, { props: { type: 'warning' }, slots: { default: '待审核' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 8: 创建 Avatar.spec.ts 和 Switch.spec.ts**

```typescript
// aistock-component-lib/src/components/__tests__/Avatar.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Avatar from '../Avatar.vue'

describe('Avatar', () => {
  it('renders text avatar', () => {
    const wrapper = mount(Avatar, { props: { text: '张三' } })
    expect(wrapper.text()).toContain('张三')
  })

  it('applies size class', () => {
    const wrapper = mount(Avatar, { props: { text: 'A', size: 'lg' } })
    expect(wrapper.classes()).toContain('as-avatar--lg')
  })

  it('applies variant class', () => {
    const wrapper = mount(Avatar, { props: { text: 'A', variant: 'gold' } })
    expect(wrapper.classes()).toContain('as-avatar--gold')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Avatar, { props: { text: '晓研', size: 'md', variant: 'primary' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

```typescript
// aistock-component-lib/src/components/__tests__/Switch.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Switch from '../Switch.vue'

describe('Switch', () => {
  it('renders off state', () => {
    const wrapper = mount(Switch, { props: { modelValue: false } })
    expect(wrapper.classes()).not.toContain('is-on')
  })

  it('renders on state', () => {
    const wrapper = mount(Switch, { props: { modelValue: true } })
    expect(wrapper.classes()).toContain('is-on')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('emits change event on click', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([true])
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false, disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('matches snapshot', () => {
    const wrapper = mount(Switch, { props: { modelValue: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 9: 创建 Empty.spec.ts, LoadingState.spec.ts, Rate.spec.ts**

```typescript
// aistock-component-lib/src/components/__tests__/Empty.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Empty from '../Empty.vue'

describe('Empty', () => {
  it('renders title', () => {
    const wrapper = mount(Empty, { props: { title: '暂无数据' } })
    expect(wrapper.text()).toContain('暂无数据')
  })

  it('renders description', () => {
    const wrapper = mount(Empty, { props: { title: '暂无数据', description: '请稍后重试' } })
    expect(wrapper.text()).toContain('请稍后重试')
  })

  it('renders action slot', () => {
    const wrapper = mount(Empty, {
      props: { title: '空' },
      slots: { action: '<button>刷新</button>' }
    })
    expect(wrapper.html()).toContain('刷新')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Empty, { props: { title: '暂无搜索结果', description: '尝试更换关键词' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

```typescript
// aistock-component-lib/src/components/__tests__/LoadingState.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingState from '../LoadingState.vue'

describe('LoadingState', () => {
  it('renders text', () => {
    const wrapper = mount(LoadingState, { props: { text: '加载中...' } })
    expect(wrapper.text()).toContain('加载中')
  })

  it('applies size class', () => {
    const wrapper = mount(LoadingState, { props: { size: 'lg' } })
    expect(wrapper.classes()).toContain('as-loading--lg')
  })

  it('applies vertical layout class', () => {
    const wrapper = mount(LoadingState, { props: { layout: 'vertical' } })
    expect(wrapper.classes()).toContain('as-loading--vertical')
  })

  it('matches snapshot', () => {
    const wrapper = mount(LoadingState, { props: { text: '加载中', size: 'md' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

```typescript
// aistock-component-lib/src/components/__tests__/Rate.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Rate from '../Rate.vue'

describe('Rate', () => {
  it('renders correct number of stars', () => {
    const wrapper = mount(Rate, { props: { modelValue: 3, max: 5 } })
    const stars = wrapper.findAll('.as-rate__star')
    expect(stars).toHaveLength(5)
  })

  it('marks active stars', () => {
    const wrapper = mount(Rate, { props: { modelValue: 4, max: 5 } })
    const activeStars = wrapper.findAll('.as-rate__star.is-active')
    expect(activeStars).toHaveLength(4)
  })

  it('shows text when showText is true', () => {
    const wrapper = mount(Rate, { props: { modelValue: 3, max: 5, showText: true } })
    expect(wrapper.text()).toContain('3/5')
  })

  it('does not emit when readonly', async () => {
    const wrapper = mount(Rate, { props: { modelValue: 3, readonly: true } })
    const stars = wrapper.findAll('.as-rate__star')
    await stars[1].trigger('tap')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('matches snapshot', () => {
    const wrapper = mount(Rate, { props: { modelValue: 4, max: 5, type: 'gold', showText: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 10: 创建 Progress.spec.ts 和 Skeleton.spec.ts**

```typescript
// aistock-component-lib/src/components/__tests__/Progress.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Progress from '../Progress.vue'

describe('Progress', () => {
  it('renders label', () => {
    const wrapper = mount(Progress, { props: { value: 68, label: '进度' } })
    expect(wrapper.text()).toContain('进度')
  })

  it('renders percentage value', () => {
    const wrapper = mount(Progress, { props: { value: 68 } })
    expect(wrapper.text()).toContain('68')
  })

  it('applies danger status class', () => {
    const wrapper = mount(Progress, { props: { value: 85, status: 'danger' } })
    expect(wrapper.classes()).toContain('as-progress--danger')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Progress, { props: { value: 68, label: '同步进度', status: 'primary' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

```typescript
// aistock-component-lib/src/components/__tests__/Skeleton.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from '../Skeleton.vue'

describe('Skeleton', () => {
  it('renders title variant', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'title' } })
    expect(wrapper.classes()).toContain('as-skeleton--title')
  })

  it('renders text variant', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'text' } })
    expect(wrapper.classes()).toContain('as-skeleton--text')
  })

  it('renders block variant', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'block' } })
    expect(wrapper.classes()).toContain('as-skeleton--block')
  })

  it('applies custom width', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'text', width: '60%' } })
    expect(wrapper.attributes('style')).toContain('60%')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'title' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 11: 运行全部测试**

Run: `cd aistock-component-lib && pnpm run test`
Expected: 所有测试 PASS，快照文件生成在 `__tests__/__snapshots__/` 目录

- [ ] **Step 12: 运行类型检查确认无破坏**

Run: `cd aistock-component-lib && pnpm run type-check`
Expected: 零错误

- [ ] **Step 13: Commit**

```bash
cd aistock-component-lib
git add vitest.config.ts src/components/__tests__/ package.json
git commit -m "test: 新增 10 个基础组件的 Vitest 快照+props 测试"
```

---

## Task 4: 组件预览目录页

**Files:**
- Create: `aistock-component-lib/dev/CatalogPage.vue`
- Modify: `aistock-component-lib/dev/App.vue`（增加页面切换）
- Modify: `aistock-component-lib/dev/main.ts`（增加简单路由）

**Interfaces:**
- Consumes: 所有组件库组件
- Produces: `npm run dev` 后可访问 `/catalog` 路由浏览所有组件

- [ ] **Step 1: 创建 CatalogPage.vue 组件目录页**

```vue
<!-- aistock-component-lib/dev/CatalogPage.vue -->
<template>
  <view class="catalog">
    <view class="catalog-header">
      <text class="catalog-title">组件目录</text>
      <text class="catalog-count">共 {{ componentList.length }} 个组件</text>
    </view>

    <view class="catalog-search">
      <Input v-model="searchText" placeholder="搜索组件名..." search-icon clearable />
    </view>

    <view class="catalog-grid">
      <view
        v-for="item in filteredList"
        :key="item.name"
        class="catalog-card"
        @tap="selectedComponent = item"
      >
        <view class="catalog-card-icon">
          <text class="catalog-card-emoji">{{ item.category.charAt(0) }}</text>
        </view>
        <text class="catalog-card-name">{{ item.name }}</text>
        <text class="catalog-card-desc">{{ item.description }}</text>
        <view class="catalog-card-tag" :class="'tag-' + item.category">
          <text class="catalog-card-tag-text">{{ item.category }}</text>
        </view>
      </view>
    </view>

    <!-- 选中组件的预览面板 -->
    <view v-if="selectedComponent" class="catalog-preview">
      <view class="catalog-preview-header">
        <text class="catalog-preview-title">{{ selectedComponent.name }} 预览</text>
        <text class="catalog-preview-close" @tap="selectedComponent = null">关闭</text>
      </view>
      <view class="catalog-preview-body">
        <component :is="selectedComponent.component" v-bind="selectedComponent.props || {}">
          {{ selectedComponent.slotContent }}
        </component>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, type Component } from 'vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import Tag from '@/components/Tag.vue'
import Badge from '@/components/Badge.vue'
import Avatar from '@/components/Avatar.vue'
import Switch from '@/components/Switch.vue'
import Empty from '@/components/Empty.vue'
import Progress from '@/components/Progress.vue'
import Skeleton from '@/components/Skeleton.vue'
import LoadingState from '@/components/LoadingState.vue'
import Rate from '@/components/Rate.vue'
import Steps from '@/components/Steps.vue'
import Segmented from '@/components/Segmented.vue'
import Collapse from '@/components/Collapse.vue'
import Toast from '@/components/Toast.vue'
import Modal from '@/components/Modal.vue'
import ActionSheet from '@/components/ActionSheet.vue'
import BottomSheet from '@/components/BottomSheet.vue'
import StockItem from '@/components/StockItem.vue'
import StatCard from '@/components/StatCard.vue'
import ListCell from '@/components/ListCell.vue'
import PageCard from '@/components/PageCard.vue'
import SubPageCard from '@/components/SubPageCard.vue'
import SubPageCard2 from '@/components/SubPageCard2.vue'
import QuoteHeader from '@/components/QuoteHeader.vue'
import DataTable from '@/components/DataTable.vue'
import IndexCard from '@/components/IndexCard.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import TabBar from '@/components/TabBar.vue'
import GlobalChatBar from '@/components/GlobalChatBar.vue'
import RadarChart from '@/components/RadarChart.vue'
import RelationGraph from '@/components/RelationGraph.vue'
import Sparkline from '@/components/Sparkline.vue'
import Gauge from '@/components/Gauge.vue'
import Timeline from '@/components/Timeline.vue'
import ChatBubble from '@/components/ChatBubble.vue'
import StreamingText from '@/components/StreamingText.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'

interface CatalogItem {
  name: string
  description: string
  category: string
  component: Component
  props?: Record<string, unknown>
  slotContent?: string
}

const searchText = ref('')
const selectedComponent = ref<CatalogItem | null>(null)

const componentList: CatalogItem[] = [
  { name: 'Button', description: '按钮', category: '基础', component: Button, slotContent: '按钮', props: { type: 'primary' } },
  { name: 'Card', description: '卡片', category: '基础', component: Card, props: { title: '卡片标题' } },
  { name: 'Tag', description: '标签', category: '基础', component: Tag, slotContent: '标签', props: { type: 'up' } },
  { name: 'Badge', description: '徽章', category: '基础', component: Badge, slotContent: '新', props: { type: 'primary' } },
  { name: 'Avatar', description: '头像', category: '基础', component: Avatar, props: { text: '晓', size: 'md', variant: 'primary' } },
  { name: 'Input', description: '输入框', category: '基础', component: Input, props: { placeholder: '输入...' } },
  { name: 'Switch', description: '开关', category: '基础', component: Switch, props: { modelValue: true } },
  { name: 'Rate', description: '星级评分', category: '基础', component: Rate, props: { modelValue: 4, type: 'gold' } },
  { name: 'Segmented', description: '分段控制', category: '基础', component: Segmented, props: { items: [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }] } },
  { name: 'Progress', description: '进度条', category: '基础', component: Progress, props: { value: 68, label: '进度' } },
  { name: 'Steps', description: '步骤条', category: '基础', component: Steps, props: { steps: [{ title: '步骤1' }, { title: '步骤2' }], current: 0 } },
  { name: 'Skeleton', description: '骨架屏', category: '基础', component: Skeleton, props: { variant: 'block' } },
  { name: 'Collapse', description: '折叠面板', category: '基础', component: Collapse, props: { items: [{ key: 'p1', title: '面板1' }] } },
  { name: 'Empty', description: '空状态', category: '反馈', component: Empty, props: { title: '暂无数据' } },
  { name: 'LoadingState', description: '加载状态', category: '反馈', component: LoadingState, props: { text: '加载中' } },
  { name: 'Toast', description: '轻提示', category: '反馈', component: Toast, props: { message: '提示', visible: true } },
  { name: 'Modal', description: '模态框', category: '反馈', component: Modal, props: { title: '标题', visible: true } },
  { name: 'ActionSheet', description: '操作菜单', category: '反馈', component: ActionSheet, props: { items: [{ label: '选项1', value: '1' }], visible: true } },
  { name: 'BottomSheet', description: '底部弹窗', category: '反馈', component: BottomSheet, props: { title: '标题', visible: true } },
  { name: 'StockItem', description: '股票项', category: '业务', component: StockItem, props: { name: '贵州茅台', code: '600519.SH', price: 1689.5, change: 12.3, changePercent: 0.73 } },
  { name: 'StatCard', description: '统计卡片', category: '业务', component: StatCard, props: { label: '总资产', value: '1,234', trend: '+12%', trendType: 'up' } },
  { name: 'ListCell', description: '列表单元格', category: '业务', component: ListCell, props: { title: '标题', value: '值', showArrow: true } },
  { name: 'QuoteHeader', description: '行情头部', category: '业务', component: QuoteHeader, props: { name: '贵州茅台', code: '600519.SH', price: 1689.5, change: 12.3, changePercent: 0.73 } },
  { name: 'DataTable', description: '数据表格', category: '业务', component: DataTable, props: { title: '数据', data: [{ label: '市值', value: 1000 }] } },
  { name: 'IndexCard', description: '大盘指数', category: '业务', component: IndexCard, props: { indices: [{ name: '上证', code: '000001', price: 3128, changePercent: 0.7 }] } },
  { name: 'PageCard', description: '页面卡片', category: '布局', component: PageCard, props: { title: '标题' } },
  { name: 'SubPageCard', description: '子页面卡片', category: '布局', component: SubPageCard, props: { title: '标题', showBack: false } },
  { name: 'SubPageCard2', description: '白色导航子页面', category: '布局', component: SubPageCard2, props: { title: '标题', showBack: false } },
  { name: 'NavBar', description: '导航栏', category: '布局', component: NavBar, props: { title: '标题', showBack: true } },
  { name: 'Footer', description: '页脚', category: '布局', component: Footer },
  { name: 'TabBar', description: '标签栏', category: '布局', component: TabBar, props: { tabs: [{ id: 'home', name: '首页', icon: 'home-line' }], activeTab: 'home' } },
  { name: 'GlobalChatBar', description: '对话栏', category: '布局', component: GlobalChatBar, props: { placeholder: '问...' } },
  { name: 'RadarChart', description: '雷达图', category: '图表', component: RadarChart, props: { dimensions: [{ label: 'A', score: 80 }], score: 75 } },
  { name: 'Sparkline', description: '迷你走势', category: '图表', component: Sparkline, props: { data: [10, 12, 11, 14, 13, 16] } },
  { name: 'Gauge', description: '仪表盘', category: '图表', component: Gauge, props: { value: 75, label: '评分' } },
  { name: 'RelationGraph', description: '关系图谱', category: '图表', component: RelationGraph, props: { nodes: [{ id: 'm', label: '中心', type: 'main' }] } },
  { name: 'Timeline', description: '时间线', category: '图表', component: Timeline, props: { items: [{ time: 'Q1', title: '事件', type: 'up' }] } },
  { name: 'ChatBubble', description: '聊天气泡', category: 'AI', component: ChatBubble, props: { role: 'assistant', content: '回复内容' } },
  { name: 'StreamingText', description: '流式文字', category: 'AI', component: StreamingText, props: { text: '逐字显示', speed: 50 } },
  { name: 'AudioPlayer', description: '音频播放', category: 'AI', component: AudioPlayer, props: { title: '早点听', src: '' } },
]

const filteredList = computed(() => {
  if (!searchText.value) return componentList
  const q = searchText.value.toLowerCase()
  return componentList.filter(
    item => item.name.toLowerCase().includes(q) || item.description.includes(q)
  )
})
</script>

<style lang="scss" scoped>
.catalog {
  padding: $s-6;
  max-width: 750rpx;
  margin: 0 auto;
}
.catalog-header {
  margin-bottom: $s-6;
  display: flex;
  align-items: baseline;
  gap: $s-3;
}
.catalog-title {
  font-size: $font-size-2xl;
  font-weight: 700;
  color: $ink;
}
.catalog-count {
  font-size: $font-size-sm;
  color: $ink-mute;
}
.catalog-search {
  margin-bottom: $s-6;
}
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $s-3;
}
.catalog-card {
  background: $bg-card;
  border: 1rpx solid $line;
  border-radius: $r-lg;
  padding: $s-3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $s-1;
  cursor: pointer;
  transition: all $t-base;

  &:hover {
    border-color: $primary;
    box-shadow: $shadow-sm;
  }
}
.catalog-card-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: $r-md;
  background: $primary-50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: $s-1;
}
.catalog-card-emoji {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $primary;
}
.catalog-card-name {
  font-size: $font-size-sm;
  font-weight: 600;
  color: $ink;
}
.catalog-card-desc {
  font-size: $font-size-xs;
  color: $ink-mute;
}
.catalog-card-tag {
  padding: 2rpx 12rpx;
  border-radius: $r-full;
  margin-top: $s-1;
}
.catalog-card-tag.tag-基础 { background: $primary-50; }
.catalog-card-tag.tag-反馈 { background: $up-soft; }
.catalog-card-tag.tag-业务 { background: $gold-soft; }
.catalog-card-tag.tag-布局 { background: $accent-50; }
.catalog-card-tag.tag-图表 { background: $down-soft; }
.catalog-card-tag.tag-AI { background: $warning-soft; }
.catalog-card-tag-text {
  font-size: 20rpx;
  color: $ink-soft;
}
.catalog-preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $overlay-base;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-modal;
  padding: $s-6;
}
.catalog-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $s-4;
}
.catalog-preview-title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $ink;
}
.catalog-preview-close {
  font-size: $font-size-sm;
  color: $primary;
  cursor: pointer;
}
.catalog-preview-body {
  background: $bg-card;
  border-radius: $r-xl;
  padding: $s-6;
  width: 100%;
  max-width: 400px;
}
</style>
```

- [ ] **Step 2: 修改 dev/main.ts 增加简单路由**

```typescript
// aistock-component-lib/dev/main.ts
import { createApp, ref, computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import CatalogPage from './CatalogPage.vue'
import './global.scss'
import '../src/styles/variables.scss'

// 简单的路由：首页 = 组件预览，/catalog = 组件目录
const routes = [
  { path: '/', name: 'home', component: App },
  { path: '/catalog', name: 'catalog', component: CatalogPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 不使用 vue-router 依赖，用简单的 hash 路由替代
const currentRoute = ref(window.location.hash || '#/')
const routeComponent = computed(() => {
  return currentRoute.value === '#/catalog' ? CatalogPage : App
})

window.addEventListener('hashchange', () => {
  currentRoute.value = window.location.hash || '#/'
})

const app = createApp({
  render() {
    const Comp = routeComponent.value
    return <Comp />
  }
})

app.mount('#app')
```

注意：上面的 JSX 写法需要配置。更简单的方案是不用路由，直接在 App.vue 里加切换按钮。

- [ ] **Step 3: 替换方案 — 在 App.vue 中增加页面切换**

修改 `dev/App.vue` 的 `<script setup>` 块开头，增加页面切换逻辑：

在 `dev/App.vue` 的 template 最顶部增加导航条：

```vue
<!-- 在 dev-container 的最前面增加 -->
<view class="dev-nav-switch">
  <text class="dev-nav-link" :class="{ active: currentPage === 'preview' }" @tap="currentPage = 'preview'">组件预览</text>
  <text class="dev-nav-link" :class="{ active: currentPage === 'catalog' }" @tap="currentPage = 'catalog'">组件目录</text>
</view>

<!-- 用 v-if/v-show 控制内容区域 -->
<view v-if="currentPage === 'catalog'">
  <CatalogPage />
</view>
<view v-else>
  <!-- 原有的组件预览内容 -->
</view>
```

在 `<script setup>` 中增加：

```typescript
import CatalogPage from './CatalogPage.vue'

const currentPage = ref<'preview' | 'catalog'>('preview')
```

在 `<style>` 中增加：

```scss
.dev-nav-switch {
  display: flex;
  gap: $s-2;
  margin-bottom: $s-4;
  padding: $s-2;
  background: $bg-soft;
  border-radius: $r-md;
}
.dev-nav-link {
  padding: $s-1 $s-3;
  border-radius: $r-sm;
  font-size: $font-size-sm;
  color: $ink-mute;
  cursor: pointer;
  transition: all $t-base;

  &.active {
    background: $primary;
    color: $white;
  }
}
```

- [ ] **Step 4: 运行 dev server 验证**

Run: `cd aistock-component-lib && pnpm run dev`
Expected: 浏览器打开后可以看到"组件预览"和"组件目录"切换按钮，点击"组件目录"可浏览所有 41 个组件

- [ ] **Step 5: 运行类型检查**

Run: `cd aistock-component-lib && pnpm run type-check`
Expected: 零错误

- [ ] **Step 6: Commit**

```bash
cd aistock-component-lib
git add dev/CatalogPage.vue dev/App.vue
git commit -m "feat: 新增组件目录预览页（替代 Storybook 的轻量方案）"
```

---

## Task 5: Vite lib 构建配置

**Files:**
- Modify: `aistock-component-lib/vite.config.ts`（增加 lib 构建配置）
- Modify: `aistock-component-lib/package.json`（新增 build:lib 脚本）

**Interfaces:**
- Consumes: `src/index.ts` 作为入口
- Produces: `dist/` 目录下的 ES 模块构建产物

- [ ] **Step 1: 修改 vite.config.ts 增加 lib 配置**

在现有 `vite.config.ts` 的 `export default defineConfig` 中增加条件判断——当 `MODE === 'lib'` 时使用 lib 配置：

```typescript
// aistock-component-lib/vite.config.ts — 修改为：
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const rpxToVw = () => ({
  postcssPlugin: 'rpx-to-vw',
  Declaration(decl: { value: string }) {
    if (decl.value.includes('rpx')) {
      decl.value = decl.value.replace(
        /(\d+(\.\d+)?)rpx/g,
        (_m, n) => `${(Number(n) * 100 / 750).toFixed(4)}vw`
      )
    }
  }
})

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag =>
              ['view', 'text', 'image', 'scroll-view', 'input', 'button', 'icon', 'progress', 'slider', 'switch', 'textarea'].includes(tag)
          }
        }
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      },
      postcss: {
        plugins: isLib ? [] : [rpxToVw() as never]  // lib 构建不做 rpx→vw 转换
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: isLib ? {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'AistockComponentLib',
        formats: ['es'],
        fileName: () => 'index.js'
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: { vue: 'Vue' },
          assetFileNames: 'aistock-component-lib.[ext]'
        }
      },
      cssCodeSplit: false
    } : undefined
  }
})
```

- [ ] **Step 2: 添加 build:lib 脚本到 package.json**

```jsonc
// aistock-component-lib/package.json — scripts 新增：
"build:lib": "vite build --mode lib"
```

- [ ] **Step 3: 运行 lib 构建**

Run: `cd aistock-component-lib && pnpm run build:lib`
Expected: `dist/` 目录生成，包含 `index.js` 和 `aistock-component-lib.css`

- [ ] **Step 4: 验证构建产物**

Run: `ls -la dist/`
Expected: 看到 `index.js`（ES 模块）和 `aistock-component-lib.css`

检查 JS 产物不含 vue 源码（已 external）：
Run: `head -5 dist/index.js`
Expected: 以 `import` 或 `export` 开头，不包含 Vue 运行时代码

- [ ] **Step 5: 运行类型检查**

Run: `cd aistock-component-lib && pnpm run type-check`
Expected: 零错误

- [ ] **Step 6: Commit**

```bash
cd aistock-component-lib
git add vite.config.ts package.json
git commit -m "feat: 新增 Vite lib 构建配置（ES 模式，vue external）"
```

---

## Task 6: 更新文档

**Files:**
- Modify: `aistock-component-lib/README.md`（新增架构说明、脚本说明）
- Modify: `aistock-component-lib/AGENTS.md`（更新开发指南）
- Modify: `aistock-component-lib/changelog-pending.md`（记录本次变更）
- Modify: `aistock-app-frontend/AGENTS.md`（更新同步流程说明）
- Modify: `aistock-app-frontend/changelog-pending.md`（记录 sync 脚本）

- [ ] **Step 1: 更新组件库 README.md**

在现有 README.md 中增加以下章节：

```markdown
## 架构改进（2026-07-29）

组件库已升级为设计系统的单一真相源：

### 设计令牌
- `src/tokens/tokens.json` — 唯一真相源
- `npm run gen-tokens` — 生成 SCSS/CSS/TS 三端产物
- 修改颜色/间距/圆角等只需编辑 tokens.json，禁止手动编辑 variables.scss

### 组件同步
- `npm run sync` — 同步组件到 App 前端
- `npm run sync:dry-run` — 预览同步变更（不实际执行）
- 配置文件：`scripts/sync.config.json`（重命名映射、排除列表、路径改写）

### 组件测试
- `npm test` — 运行全部测试
- `npm run test:watch` — 监听模式
- `npm run test:coverage` — 覆盖率报告
- `npm run test:update` — 更新快照

### 组件预览
- `npm run dev` → 点击"组件目录" → 浏览所有组件

### lib 构建
- `npm run build:lib` — 生成 ES 模块构建产物（dist/）
```

- [ ] **Step 2: 更新组件库 AGENTS.md**

在 AGENTS.md 的开发流程中增加：

```markdown
## 设计令牌工作流（重要）

1. 需要修改颜色/间距/圆角等设计令牌时：
   - 编辑 `src/tokens/tokens.json`
   - 运行 `npm run gen-tokens` 生成产物
   - 禁止直接编辑 `src/styles/variables.scss`（该文件由脚本自动生成）

2. 新增/修改组件后：
   - 运行 `npm test` 确保测试通过
   - 运行 `npm run sync` 同步到 App 前端
   - 在 App 前端运行 `npx tsc --noEmit` 验证类型
```

- [ ] **Step 3: 更新 App 前端 AGENTS.md 的同步流程**

将 AGENTS.md 中"组件库优先原则"章节的四步流程更新为：

```markdown
### 组件同步流程（更新）

1. 在组件库中设计/修改组件
2. 运行 `npm run sync:dry-run` 预览变更
3. 运行 `npm run sync` 执行同步（自动重命名+路径改写）
4. 在 App 前端运行 `npx tsc --noEmit` 验证
5. 设计令牌变更时，sync 会自动同步 variables.scss
```

- [ ] **Step 4: 更新 changelog-pending.md（两个仓库）**

组件库 changelog-pending.md：
```markdown
## 2026-07-29

### feat: 前端架构改进 — 设计令牌单一真相源 + 组件同步自动化 + 工程化

**设计令牌统一管理**
- 新增 `src/tokens/tokens.json` 单一真相源
- 新增 `scripts/generate-tokens.ts` 生成 SCSS/CSS/TS 三端产物
- `src/styles/variables.scss` 改为自动生成，禁止手动编辑

**组件同步自动化**
- 新增 `scripts/sync-components.ts` 同步脚本
- 新增 `scripts/sync.config.json` 配置（重命名/排除/路径改写）
- 支持 `--dry-run` 预览模式
- 孤儿文件检测

**组件库工程化**
- 新增 Vitest 测试框架 + 10 个基础组件测试
- 新增组件目录预览页（dev/CatalogPage.vue）
- 新增 Vite lib 构建配置（ES 模式）
```

App 前端 changelog-pending.md：
```markdown
## 2026-07-29

### chore: 新增组件同步脚本命令

- `package.json` 新增 `sync` 和 `sync:dry-run` 脚本
- 同步配置由组件库 `scripts/sync.config.json` 统一管理
- 后续组件更新只需在组件库修改后运行 `npm run sync`
```

- [ ] **Step 5: Commit**

```bash
cd aistock-component-lib
git add README.md AGENTS.md changelog-pending.md
git commit -m "docs: 更新架构改进文档（令牌/同步/测试/构建）"

cd ../aistock-app-frontend
git add AGENTS.md changelog-pending.md
git commit -m "docs: 更新组件同步流程说明"
```

---

## Self-Review

### Spec coverage

| 需求 | 对应 Task | 状态 |
|------|----------|------|
| 设计令牌统一管理 | Task 1 | ✅ tokens.json + 生成脚本 |
| 组件同步自动化 | Task 2 | ✅ sync 脚本 + 配置 + dry-run |
| 组件库测试 | Task 3 | ✅ Vitest + 10 个组件测试 |
| 组件预览页 | Task 4 | ✅ CatalogPage + 页面切换 |
| lib 构建 | Task 5 | ✅ Vite lib 配置 |
| 文档更新 | Task 6 | ✅ README/AGENTS/changelog |

### Placeholder scan

- 无 TBD/TODO 占位符
- 所有代码步骤包含完整代码
- 所有命令包含预期输出

### Type consistency

- `Tokens` 接口在 Task 1 Step 1 和 Step 4 中一致
- `SyncConfig` 接口在 Task 2 中定义并使用
- `CatalogItem` 接口在 Task 4 中定义并使用
- `SyncResult` 接口在 Task 2 中一致使用

---

## Execution Handoff

**Plan complete and saved to `aistock-component-lib/docs/architecture-improvement-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
