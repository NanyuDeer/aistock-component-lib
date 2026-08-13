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
