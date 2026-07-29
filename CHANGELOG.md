# CHANGELOG

## [feat/architecture-improvement] 2026-07-29 — 新增 2 个金融业务共享组件
**开发者**: 林晓研

### 新增
- **InsightPreviewCard** — 洞察预览卡片：主题色头部（brand/gold/accent 三色）+ SvgIcon 图标 + 标题 + 描述；排名预览列表前 3 名奖牌徽标（金/银/铜）高亮，可配 tag 标签（5 色）+ trend 趋势（3 色）；maxItems 截断默认 5 条
- **InvestmentSummaryCard** — 投资总结卡片：顶部主题色装饰条（gold/brand 双色）+ 标题 + readonly Rate 星级评分；结论段落背景区块；关键要点列表带主题色圆点 bullet 标记

### 改进
- `src/index.ts` 金融业务组件分组新增 2 个导出（组件数 41→43）
- `dev/CatalogPage.vue` 业务分类新增 2 个组件卡片（含示例数据），组件数注释同步 43
- `__catalog-smoke.spec.ts` 组件数断言 41→43

### 文档
- `README.md` 组件清单 41→43（5 处）+ 金融业务组件表新增 2 行
- `AGENTS.md` 组件数同步 43

---

## 2026-07-28 — 组件库补充：13 个新组件 + 预览页完善

### 新增组件（13 个）

按照「FinDesign System 蓝白金融设计系统」设计风格，从 app 前端提取通用组件并重新设计后补充进组件库：

#### 数据可视化组件（纯 SVG 实现）
- **RadarChart** — 雷达图：多维度评分展示，含网格层、数据多边形、顶点标记、维度条形图
- **RelationGraph** — 关系图谱：径向布局展示产业链关联，中心节点 + 上游/下游/关联节点
- **Sparkline** — 迷你走势图：line/area 两种类型，自动根据涨跌着色
- **Gauge** — 仪表盘：半圆弧进度，动态颜色（蓝/金/红），3 种尺寸

#### 导航和布局组件
- **NavBar** — 顶部导航栏：返回按钮 + 标题/副标题 + 右侧插槽，适配安全区
- **Footer** — 页脚：居中产品标识，支持 slot 覆盖
- **TabBar** — 底部标签栏：图标 + 文字 + 红点/数字徽章，选中态胶囊背景
- **GlobalChatBar** — 全局 AI 对话入口：胶囊形态，AI 头像 + 未读数 + 返回箭头 + 发送按钮
- **SubPageCard2** — 白色导航栏子页面容器：fixed 铺满 + scroll-view + 可选 footer 插槽

#### 交互和金融业务组件
- **Segmented** — 分段控制器：支持 fullWidth 模式，active 态白底蓝字
- **BottomSheet** — 底部弹窗：拖拽手柄 + 标题 + scroll-view 内容 + 底部操作区
- **ActionSheet** — 操作菜单：选项列表 + 危险项标红 + 取消按钮
- **QuoteHeader** — 行情头部：头像 + 名称/代码 + 大字价格 + 涨跌标签 + 指标行

### SvgIcon 图标扩充
新增 7 个常用图标路径：`home-line`、`chart-line`、`trade-line`、`user-line`、`star-line`、`trending-up-line`、`trending-down-line`

### 预览页（dev/App.vue）完善
- 修复 **9 个已导出但未展示** 的组件遗漏：Segmented、QuoteHeader、NavBar、Footer、TabBar、GlobalChatBar、BottomSheet、ActionSheet、SubPageCard2
- 新增「设备框架」样式（`.dev-device-frame`）用于在预览中展示 fixed 定位组件
- BottomSheet/ActionSheet/SubPageCard2 通过按钮触发交互演示
- SubPageCard2 全屏演示内嵌 QuoteHeader + RadarChart + StatCard 组合展示
- SvgIcon 预览区新增 5 个图标展示

### 文档更新
- README.md 新增完整组件清单（30 个组件分 6 类）
- CHANGELOG.md 创建
