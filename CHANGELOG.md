# CHANGELOG

## [main] 2026-08-24 — 洞见标签组件（洞察之眼系统）

**开发者**: NanyuDeer

### 新增
- 新增 `InsightTag.vue`（洞察之眼标签）与 `InsightCard.vue`（洞见卡片）：瞳孔色即洞见类型（情绪红/资金金/事件青/市场蓝），虚线外环 + 虹膜渐变 + 瞳孔 + 高光 + 金色光点，纯 CSS 实现。
- `src/index.ts` 导出 `InsightTag` / `InsightCard`；`src/styles/variables.scss` 新增洞见色系变量（`$insight-*`）。

### 改进
- `dev/App.vue` 预览页新增洞见之眼展示；docs/组件使用指南、README 补充用法。

---

## [feat/all-components] 2026-08-03 — 完成 56 组件库建设 + 色彩规范更新
**开发者**: AiStock Team

### 新增
- 新增 39 个组件，覆盖完整 10 层架构，组件库合计 56 个组件：
  - 反馈：Empty、Skeleton、LoadingState
  - 表单扩展：Checkbox、Radio、Select、Slider、Rate、Tooltip
  - 覆盖层：Modal、Drawer、Popover、Toast、Alert
  - 通用图表：Gauge、Sparkline、IndexCard
  - 通用 UI 扩展：Collapse、Pagination、Timeline、Result、PeriodSelector
  - Web 端布局：PageHeader、Toolbar、FilterBar、DataGrid、CommandPalette
  - App 端导航：NavBar、TabBar、BottomSheet、ActionSheet、GlobalChatBar、PageShell
  - 金融深组件：QuoteHeader、Ticker、AnnounceCard、DataFreshness、Heatmap、FundFlow、Watchlist、RadarChart、RelationGraph
- 新增《组件使用指南.md》文档，供项目开发者查阅

### 修复
- Gauge：gold 状态数值文字颜色由 $gold-deep(#8a6411) 修正为 $gold(#c89020)，与环色保持一致
- Gauge：修复 conic-gradient 环色失效问题（JS 中误用 SCSS 变量 $line-soft，替换为实际颜色值 #eef3fb）

### 改进
- 替换设计系统 HTML 为新版色彩规范（红涨绿跌蓝强调深黄高级）
- 更新 variables.scss 的 accent/gold/warning 色值，新增 brand gradients
- Button、Progress 组件同步更新硬编码颜色为 Design Token 变量
- index.ts 统一导出全部 56 个组件

---
