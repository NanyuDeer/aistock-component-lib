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
| `src/styles/variables.scss` | Design Token，所有颜色/字号/间距/圆角变量 |
| `src/index.ts` | 统一导出入口 |
| `dev/` | 本地预览环境（不入组件库导出） |
| `design/` | HTML 设计稿 |

## Design Token

所有颜色、字号、间距、圆角必须用 `src/styles/variables.scss` 中的变量，禁止硬编码。

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
