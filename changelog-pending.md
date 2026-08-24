## 2026-08-23 新增洞察之眼标志组件（InsightTag / InsightCard）

依据 8-21 会议决议①「全站洞见标签统一设计」，新增洞察之眼标志系统：
- `src/styles/variables.scss` — 新增 4 组洞察类型色 Token（emotion 红 / fund 金 / event 青 / market 蓝，各含 light/deep/soft）+ `$insight-card-dark-gradient`
- `src/components/InsightTag.vue` — 洞察之眼标签：纯 CSS 瞳孔（虚线外环=数据流、虹膜渐变=数据汇聚、瞳孔+高光=看穿本质；虹膜与外环留间隙、左上主高光+右下次高光），3 种尺寸
- `src/components/InsightCard.vue` — 洞见卡片：瞳孔标签置前 → 结论 → 溯源 → 预判（两句话上限），亮色列表卡 / 深蓝研报卡两主题
- `src/index.ts` — 导出 InsightTag、InsightCard
- `dev/App.vue` — 预览区（4 类型标签 + 亮/暗卡片示例）
- 文档：README.md / docs/组件使用指南.md（总览 58 个 + 11.5 章节 + Token 速查）/ AGENTS.md

设计规范：洞见组件为全系统标志性存在，瞳孔色即洞见类型，不随组件库通用风格，无 emoji、无 SVG id 冲突（纯 CSS 实现）。

## 2026-08-04 PR 合并后修复

### src/index.ts — 补回 #2 重构遗漏的 8 个组件导出
合并 #2（56组件库建设）后，src/index.ts 采用远程 8 层结构，但遗漏了 8 个文件存在却未导出的组件，导致组件库导出不完整。补回导出：
- 基础 UI 扩展：Segmented
- 金融业务扩展：DataTable、SubPageCard2（AGENTS.md 标注为推荐替代 SubPageCard 的组件）
- 导航布局扩展：Footer、Steps
- AI 对话与媒体：ChatBubble、StreamingText、AudioPlayer

原因：#2 重构 src/index.ts 为 8 层分类时漏导出上述组件，本地旧版本有导出，merge --theirs 采用远程版本后丢失。app-frontend 虽通过 sync 机制使用组件（不直接 import），但作为组件库应保持导出完整性。

### 待处理（#2 既有问题，非本次合并引入）
- dev/App.vue 存在类型错误（RadarChart/TabBar/ActionSheet/Modal/IndexCard 等 props 不匹配），vue-tsc --noEmit 失败。dev/ 为本地预览环境不入库导出，不影响组件库消费者，建议后续修复。
