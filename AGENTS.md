# AGENTS.md - aistock-component-lib

> AI 开发助手入口地图。修改前端页面前必读。

## 组件库使用规则

前端（aistock-app-frontend / aistock-frontend）修改页面前，先从组件库找组件：

- 有现成组件 → 直接使用
- 没有 → 找林晓研补充，不要在业务代码里手写

## 仓库结构

| 目录 | 作用 |
|------|------|
| `src/components/` | 组件库本体，每个 .vue 文件是一个组件 |
| `src/tokens/tokens.json` | Design Token 单一真相源（手动维护） |
| `src/tokens/types.ts` | Tokens 接口类型定义 |
| `src/styles/variables.scss` | Design Token SCSS 变量（脚本生成，勿手编） |
| `scripts/generate-tokens.ts` | 令牌生成脚本（`pnpm gen-tokens`） |
| `src/index.ts` | 统一导出入口 |
| `dev/` | 本地预览环境（不入组件库导出） |
| `design/` | HTML 设计稿 |

## Design Token

所有颜色、字号、间距、圆角必须用 `src/styles/variables.scss` 中的变量，禁止硬编码。

设计令牌采用「单一真相源 + 自动生成」：`src/tokens/tokens.json` 是唯一手动维护的真相源，`scripts/generate-tokens.ts`（`pnpm gen-tokens`）读取它生成 `src/styles/variables.scss`、`src/tokens/tokens.css`、`src/tokens/tokens.ts` 三份产物。**禁止手动编辑这三份产物**，修改令牌请编辑 `tokens.json` 后运行 `pnpm gen-tokens`。`src/tokens/types.ts` 为 `Tokens` 接口定义。

设计系统参考：`design/FinDesign System · 蓝白金融设计系统.html`

## 组件清单

共 41 个组件，分 8 类（基础/反馈/交互/导航布局/金融业务/数据可视化/金融数据展示/AI对话与媒体）。完整清单见 `README.md`。

新增组件（从 app 前端提取并按设计系统重新设计）：
- 数据可视化：RadarChart、RelationGraph、Sparkline、Gauge、Timeline（纯 SVG 实现）
- 导航布局：NavBar、Footer、TabBar、GlobalChatBar、SubPageCard2、Steps
- 交互金融：Segmented、BottomSheet、ActionSheet、QuoteHeader
- 金融数据展示：Rate、DataTable、IndexCard
- 交互反馈：Modal、Toast、Collapse
- AI 对话与媒体：ChatBubble、StreamingText、AudioPlayer

> **注意**：SubPageCard 已弃用（@deprecated），新功能请使用 SubPageCard2。组件选用指南见 `README.md`。

## 组件规范

- 标签：用 `view`/`text`/`image`/`scroll-view`，不用 `div`/`span`/`img`（uni-app 跨端要求）
- 单位：用 `rpx`，不用 `px`
- 事件：用 `@tap`，不用 `@click`（uni-app 跨端要求）
- 类名：统一 `as-` 前缀
- Props：用 `withDefaults(defineProps<{}>(), {})` 写法
- 图标：用 SvgIcon 组件加载 SVG，禁用 emoji
- 样式：`<style lang="scss" scoped>`，首行 `@import '@/styles/variables.scss';`
- A 股涨跌色：红涨绿跌，`$stock-up-color`（红）/ `$stock-down-color`（绿），不要搞反

## 禁止事项

- 禁止使用 emoji 图标
- 禁止用 px 单位
- 禁止用 div/span/img 标签
- 禁止硬编码颜色值
