# CHANGELOG

## [feat/all-components] 2026-08-13 — 补齐 31 个组件，组件库升级至 87 个
**开发者**: AiStock Team

### 新增
- 新增 31 个组件，覆盖 6 个新分层，组件库合计 87 个组件：
  - 导航扩展（5）：Breadcrumb、Divider、Steps、Segmented、Dropdown
  - AI 交互（4）：StreamingText、ChatBubble、AiEventReport、AiGraph
  - 音频与播客（3）：AudioPlayer、PodcastCard、FloatingPodcast
  - 事件与洞察（6）：ImportanceStars、EventItemCard、EventHeadlineCard、InsightListCard、InsightAlertCard、GuideCard
  - 高级行情（7）：StockChart、TrendKlineCompare、TrendDimCard、StockDetailTable、StockCardList、StockIntelList、WindLeaderPanel
  - 辅助组件（6）：LoginQrCode、Analytics、CycleSelect、NewsSlider、HotBurstPanel、MarketOverview
- 新增 design/FinDesign-完整组件库.html 设计系统文件

### 改进
- 替换设计系统 HTML 为 FinDesign-完整组件库.html（含 46 个导航项的完整组件规范）
- 更新组件使用指南：新增 6 个章节（第 12-17 章），总览表更新为 87 个组件，目录重编至 19 章
- index.ts 新增第 10-12 层导出（音频播客、高级行情、辅助组件）

### 修复
- AiGraph：修复 v-for 与 v-if 同元素导致的 Vue 3 渲染错误（v-if 优先级高于 v-for 致 link 未定义）

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
