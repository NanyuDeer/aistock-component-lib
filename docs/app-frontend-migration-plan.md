# App 前端组件库迁移计划

> **状态**：待确认 | **创建时间**：2026-07-28 | **作者**：尹辰
>
> **更新**：2026-07-28 根据用户反馈调整架构——组件库作为设计参考库，app 前端保持独立，不依赖组件库目录。

**目标**：将 aistock-app-frontend 的自定义组件全面对齐 aistock-component-lib 设计系统，实现 UI 统一、减少重复代码、建立"组件库优先"的开发流程。

**架构**：组件库作为**设计参考和组件开发沙盒**，app 前端保持完全独立。组件在组件库中设计、预览、验证后，复制到 app 前端的 `shared/components/`。设计变量直接同步（复制），不做跨项目引用。app 前端可脱离组件库独立编译和部署。

**技术栈**：Vue 3 + TypeScript + uni-app + SCSS（rpx）

---

## 核心原则

1. **app 前端独立性**：app 前端不依赖组件库目录，可独立编译和部署
2. **组件库定位**：设计系统参考 + 组件开发沙盒 + 预览环境
3. **同步方式**：组件复制（非引用），变量同步（非导入）
4. **工作流**：新组件先在组件库设计验证 → 复制到 app 前端使用

---

## 全局约束

- 组件库位置：`D:\aistock\aistock-component-lib\src`（仅开发时参考，运行时不依赖）
- 设计变量：以组件库 `src/styles/variables.scss` 为**设计真源**，定期同步到 app 前端 `shared/styles/variables.scss`（复制内容，不做 `@import` 跨项目引用）
- 组件同步：组件库中设计好的组件 `.vue` 文件复制到 app 前端 `shared/components/`，按需调整（如添加业务逻辑 wrapper）
- 组件库规范：`view`/`text`/`image` 标签、rpx 单位、`as-` 类名前缀、`@tap` 事件、SvgIcon 组件、禁用 emoji
- A 股涨跌色：红涨绿跌（`$up` 红 / `$down` 绿）
- 业务逻辑不写进组件库组件，通过 props/events/slots 在 app 前端 wrapper 中传递

---

## 组件映射表

### 第一类：直接替换（app 前端组件 → 组件库组件，无业务逻辑差异）

将组件库的 `.vue` 文件直接复制到 app 前端，替换旧文件，更新引用。

| App 前端组件 | 组件库组件 | 差异说明 | 替换难度 |
|-------------|-----------|---------|---------|
| `shared/components/Card.vue` | `Card.vue` | 接口一致 | 低 |
| `shared/components/Button.vue` | `Button.vue` | 组件库多了 gold/accent 类型 | 低 |
| `shared/components/Avatar.vue` | `Avatar.vue` | 接口一致 | 低 |
| `shared/components/LoadingState.vue` | `LoadingState.vue` | 接口一致 | 低 |
| `shared/components/RadarChart.vue` | `RadarChart.vue` | 组件库版本功能更完整 | 低 |
| `shared/components/RelationGraph.vue` | `RelationGraph.vue` | 接口一致 | 低 |
| `modules/chat/components/StreamingText.vue` | `StreamingText.vue` | 接口一致 | 低 |

### 第二类：需适配替换（名称不同或接口有差异）

复制组件库组件到 app 前端，改名或适配 props。

| App 前端组件 | 组件库组件 | 差异说明 | 替换策略 |
|-------------|-----------|---------|---------|
| `shared/components/EmptyState.vue` | `Empty.vue` | 名称不同，props 略有差异 | 复制为 EmptyState.vue，适配 props |
| `shared/components/TheNavbar.vue` | `NavBar.vue` | app 版用 SvgIcon 返回箭头，库版用 CSS 绘制 | 复制 NavBar.vue → TheNavbar.vue，保留 SvgIcon 方式 |
| `shared/components/TheFooter.vue` | `Footer.vue` | 接口基本一致 | 复制 Footer.vue → TheFooter.vue |
| `modules/chat/components/ChatBubble.vue` | `ChatBubble.vue` | app 版可能有额外功能 | 对比后复制替换 |
| `modules/home/components/DualHostPlayer.vue` | `AudioPlayer.vue` | app 版是双主播，库版是单音频 | 保留 DualHostPlayer，内部逻辑参考 AudioPlayer 重构 |
| `modules/favorites/components/StockCard.vue` | `StockItem.vue` | StockCard 是卡片形态，StockItem 是列表项 | 保留 StockCard，视觉层参考 StockItem |
| `modules/favorites/components/StockDetailTable.vue` | `DataTable.vue` | app 版有特定列配置 | 保留 wrapper，内部用 DataTable 逻辑 |
| `modules/chat/event/components/ImportanceStars.vue` | `Rate.vue` | 功能一致，接口略有差异 | 复制 Rate.vue → ImportanceStars.vue |
| `modules/chat/event/components/HistoryTimeline.vue` | `Timeline.vue` | app 版有特定数据结构 | 保留 wrapper，内部用 Timeline 逻辑 |

### 第三类：需 Wrapper 适配（含业务逻辑，不能直接替换）

保留 app 前端组件文件，但视觉层和结构参考组件库对应组件重写。

| App 前端组件 | 组件库参考 | 业务逻辑 | 替换策略 |
|-------------|-----------|---------|---------|
| `shared/components/PageCard.vue` | `PageCard.vue` | 小熊头像入口 + GlobalChatBar + 动态底部高度 | 参考库 PageCard 结构重写，保留业务逻辑 |
| `shared/components/SubPageCard.vue` | `SubPageCard2.vue` | GlobalChatBar + backUrl 路由 | 参考库 SubPageCard2 重写，统一到 v2 风格 |
| `shared/components/SubPageCard2.vue` | `SubPageCard2.vue` | GlobalChatBar + backUrl | 参考库 SubPageCard2 重写 |
| `shared/components/GlobalChatBar.vue` | `GlobalChatBar.vue` | 交易/自选按钮 + 语音输入 | 参考库 GlobalChatBar 样式，保留业务按钮 |
| `shared/components/AppBottomBar.vue` | `TabBar.vue` | 3 个固定 Tab + 动态 bottom 偏移 | 参考库 TabBar 样式，保留固定配置 |
| `shared/components/MainTabs.vue` | 无直接对应 | 三 Tab 内容切换 | 保留，内部子组件用更新后的版本 |
| `shared/components/SvgIcon.vue` | `SvgIcon.vue` | app 版从 `assets/icons/` 文件加载 | **不替换**：保留 app 版（文件加载方式支持更多图标） |

### 第四类：组件库新增组件（复制到 app 前端供新页面使用）

以下组件从组件库复制到 app 前端 `shared/components/`，供新页面直接使用：

Tag, Badge, Input, Switch, Segmented, Rate, Progress, Skeleton, Toast, BottomSheet, ActionSheet, Modal, Collapse, Steps, StatCard, ListCell, QuoteHeader, Gauge, Sparkline, DataTable, IndexCard, Timeline, ChatBubble, AudioPlayer

---

## 阶段划分

### Phase 0：设计变量同步（前置，不改动业务代码）

**目标**：将组件库的设计变量同步到 app 前端，建立统一的设计令牌基础

#### Task 0.1：同步设计变量

**文件：**
- 修改：`aistock-app-frontend/src/shared/styles/variables.scss`
- 参考：`aistock-component-lib/src/styles/variables.scss`

**策略**：将组件库的 variables.scss 内容**复制**到 app 前端的 variables.scss，并保留旧变量名作为兼容别名：

```scss
// === 组件库设计变量（同步自 aistock-component-lib/src/styles/variables.scss） ===
// 同步时间：2026-07-28
// 注意：以下变量直接定义（非 @import 跨项目引用），确保 app 前端可独立编译

// ... 完整复制组件库变量定义 ...

// === 向后兼容别名（逐步废弃，新代码用组件库变量名） ===
$brand-color: $primary;
$brand-color-secondary: $accent;
$brand-gradient: linear-gradient(135deg, $primary 0%, $accent 100%);
$bg-color: $bg-page;
$bg-color-grey: $bg-card;
$text-color-title: $ink;
$text-color: $ink;
$text-color-secondary: $ink-soft;
$text-color-tertiary: $ink-mute;
$stock-up-color: $up;
$stock-down-color: $down;
$stock-flat-color: $flat;
$border-color: $line;
$border-color-light: $line-soft;
// ... 其他旧变量名映射
```

- [ ] **Step 1**：备份当前 variables.scss
- [ ] **Step 2**：将组件库 variables.scss 完整内容复制到 app 前端
- [ ] **Step 3**：在文件末尾添加旧变量名兼容别名
- [ ] **Step 4**：`pnpm dev:h5` 检查所有页面视觉无破坏性变化
- [ ] **Step 5**：逐页检查红涨绿跌色是否正确
- [ ] **Step 6**：Commit

#### Task 0.2：更新 AGENTS.md 组件库优先规范

**文件：**
- 修改：`aistock-app-frontend/AGENTS.md`

**内容**：新增「组件库优先原则」章节（已写入，详见 AGENTS.md 4.8 节）

- [ ] **Step 1**：确认 4.8 节内容正确
- [ ] **Step 2**：Commit

---

### Phase 1：共享层组件替换（低风险，高收益）

**目标**：将组件库中与 app 前端直接对应的组件复制过来替换

#### Task 1.1：替换基础 UI 组件（Card / Button / Avatar / LoadingState）

**文件：**
- 覆盖：`src/shared/components/Card.vue`（用组件库版本覆盖）
- 覆盖：`src/shared/components/Button.vue`
- 覆盖：`src/shared/components/Avatar.vue`
- 覆盖：`src/shared/components/LoadingState.vue`
- 修改：所有引用这些组件的页面（更新 import 路径，适配 props 变化）

**策略**：
1. 将组件库的 `.vue` 文件内容复制到 app 前端对应文件（覆盖旧实现）
2. 检查组件库组件的 `@import '@/styles/variables.scss'` 在 app 前端环境中是否能正确解析（app 前端的 `@` 指向 `src/`，variables.scss 在 `shared/styles/` 下，需确认 SCSS additionalData 配置）
3. 全局搜索引用处，适配 props 差异（如 Button 新增的类型、Avatar 的尺寸参数等）

- [ ] **Step 1**：复制组件库 Card.vue → app 前端 Card.vue，调整 `@import` 路径
- [ ] **Step 2**：`pnpm dev:h5` 检查 Card 组件显示正常
- [ ] **Step 3**：对 Button/Avatar/LoadingState 重复 Step 1-2
- [ ] **Step 4**：`pnpm type-check` 通过
- [ ] **Step 5**：全局检查使用这些组件的页面，适配 props 差异
- [ ] **Step 6**：Commit

#### Task 1.2：替换 EmptyState → Empty（适配）

- 覆盖：`src/shared/components/EmptyState.vue`（用组件库 Empty.vue 内容覆盖，保留文件名）
- 修改：引用 EmptyState 的页面（适配 props）

- [ ] **Step 1-5**：同上模式

#### Task 1.3：替换数据可视化组件（RadarChart / RelationGraph）

- 覆盖：`src/shared/components/RadarChart.vue`
- 覆盖：`src/shared/components/RelationGraph.vue`
- 修改：引用这些组件的页面

- [ ] **Step 1-5**：同上模式

#### Task 1.4：替换 TheNavbar → NavBar / TheFooter → Footer（适配）

- 覆盖：`src/shared/components/TheNavbar.vue`（用组件库 NavBar.vue 内容覆盖，保留文件名）
- 覆盖：`src/shared/components/TheFooter.vue`（用组件库 Footer.vue 内容覆盖，保留文件名）
- 修改：引用这些组件的页面

- [ ] **Step 1-5**：同上模式

---

### Phase 2：Wrapper 组件改造（中风险）

**目标**：将含业务逻辑的共享组件参考组件库对应组件的视觉层重写

#### Task 2.1：改造 GlobalChatBar

**文件：**
- 修改：`src/shared/components/GlobalChatBar.vue`

**策略**：参考组件库 GlobalChatBar 的样式和结构重写 app 版，保留交易/自选按钮和语音输入逻辑。

- [ ] **Step 1**：读取组件库 GlobalChatBar.vue 的样式和结构
- [ ] **Step 2**：读取 app 版 GlobalChatBar.vue 的业务逻辑
- [ ] **Step 3**：用组件库样式重写 app 版，保留业务逻辑
- [ ] **Step 4**：`pnpm type-check` + `pnpm dev:h5` 验证
- [ ] **Step 5**：Commit

#### Task 2.2：改造 PageCard

**策略**：参考组件库 PageCard 的结构重写，保留小熊头像 + GlobalChatBar + 动态高度。

- [ ] **Step 1-5**：同上模式

#### Task 2.3：改造 SubPageCard / SubPageCard2

**策略**：参考组件库 SubPageCard2 重写，统一 v2 风格，保留 backUrl + GlobalChatBar。SubPageCard 逐步迁移到 SubPageCard2。

- [ ] **Step 1-5**：同上模式

#### Task 2.4：改造 AppBottomBar

**策略**：参考组件库 TabBar 的样式重写，保留 3 个固定 Tab + 动态 bottom 偏移。

- [ ] **Step 1-5**：同上模式

#### Task 2.5：改造 MainTabs

**策略**：保留业务逻辑，内部使用的 AppBottomBar 和 GlobalChatBar 改为更新后的版本。

- [ ] **Step 1-5**：同上模式

---

### Phase 3：模块层组件替换（中风险）

**目标**：替换各业务模块中的自定义组件

#### Task 3.1：chat 模块组件替换

- `ChatBubble.vue` → 用组件库 ChatBubble.vue 覆盖
- `StreamingText.vue` → 用组件库 StreamingText.vue 覆盖
- `SkillButton.vue` → 保留（业务专属）
- `SkillCard.vue` → 保留（业务专属）

#### Task 3.2：chat/event 子模块组件替换

- `ImportanceStars.vue` → 用组件库 Rate.vue 内容覆盖（保留文件名）
- `HistoryTimeline.vue` → 参考 Timeline.vue 重写 wrapper
- `EventTransmissionGraph.vue` → 参考 RelationGraph.vue 重写（如果接口兼容）
- 其他 `Ai*` / `Event*` / `Investment*` 组件 → 保留（业务专属）

#### Task 3.3：favorites 模块组件替换

- `StockCard.vue` → 参考 StockItem.vue 重写 wrapper
- `StockDetailTable.vue` → 参考 DataTable.vue 重写 wrapper
- `StockCardList.vue` → 保留
- `KLineChart.vue` / 图表组件 → 保留

#### Task 3.4：home 模块组件替换

- `DualHostPlayer.vue` → 参考 AudioPlayer.vue 重写内部逻辑
- `MorningCard.vue` / `MorningContent.vue` / `StockContent.vue` → 保留

#### Task 3.5：market 模块组件替换

- `EventChainGraph.vue` → 参考 RelationGraph.vue 重写（如果接口兼容）
- `MarketOverview.vue` → 参考 IndexCard.vue 重写 wrapper
- `EventCard.vue` / `NewsSlider.vue` → 保留

#### Task 3.6：analytics 模块组件替换

- 内容组件保留，内部使用的 Card/Empty/LoadingState 已在 Phase 1 替换

---

### Phase 4：新增组件库组件到 app 前端

**目标**：将组件库中 app 前端尚未使用的组件复制到 `shared/components/`，供新页面使用

**策略**：批量复制组件库组件到 app 前端，调整 `@import` 路径。不强制改造现有页面，新页面直接使用。

**复制清单**（25 个）：
Tag, Badge, Input, Switch, Segmented, Rate, Progress, Skeleton, Toast, BottomSheet, ActionSheet, Modal, Collapse, Steps, StatCard, ListCell, QuoteHeader, Gauge, Sparkline, DataTable, IndexCard, Timeline, ChatBubble, AudioPlayer, Footer

- [ ] **Step 1**：批量复制组件库 .vue 文件到 `shared/components/`
- [ ] **Step 2**：调整每个文件的 `@import` 路径（组件库用 `@/styles/variables.scss`，app 前端需改为 `@/shared/styles/variables.scss` 或依赖 additionalData）
- [ ] **Step 3**：创建 `shared/components/index.ts` 统一导出
- [ ] **Step 4**：`pnpm type-check` 通过
- [ ] **Step 5**：`pnpm dev:h5` 验证无编译错误
- [ ] **Step 6**：Commit

---

### Phase 5：清理与文档

#### Task 5.1：清理废弃文件

- 删除被替换的旧组件文件（如果有残留）
- 清理未使用的导入

#### Task 5.2：更新文档

- 更新 `aistock-app-frontend/AGENTS.md` 第 7 节共享组件速查
- 更新各模块 `AGENTS.md` 的组件列表
- 更新 `aistock-component-lib/changelog-pending.md`
- 在组件库 `README.md` 中添加"同步到 app 前端"说明

#### Task 5.3：全量验证

- `pnpm type-check` 通过
- `pnpm dev:h5` 全页面浏览验证
- 检查红涨绿跌色正确性
- 检查所有图标显示正常
- 检查 fixed 布局 + 安全区适配
- **关键验证**：临时重命名组件库目录，确认 app 前端仍可正常编译运行

---

## SCSS 变量引用方式说明

组件库组件中使用 `@import '@/styles/variables.scss'` 引用变量。复制到 app 前端后，需要处理变量引用：

**方案 A（推荐）**：在 app 前端 `vite.config.ts` 的 `css.preprocessorOptions.scss.additionalData` 中全局注入 variables.scss：
```ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@/shared/styles/variables.scss";`
    }
  }
}
```
这样所有组件无需单独 `@import`，直接使用 `$primary` 等变量。

**方案 B**：每个复制过来的组件手动修改 `@import` 路径为 `@/shared/styles/variables.scss`。

推荐方案 A，一劳永逸，后续同步组件时无需逐个修改路径。

---

## 风险与缓解

| 风险 | 缓解措施 |
|------|---------|
| 设计变量值变化导致视觉不一致 | Phase 0 先同步变量，旧变量名通过别名兼容 |
| 组件复制后 `@import` 路径不匹配 | 使用 additionalData 全局注入（方案 A） |
| SvgIcon 实现方式不同 | 保留 app 版 SvgIcon 不替换；组件库组件内部图标用内联 SVG，不依赖外部 SvgIcon |
| 组件库更新后 app 前端不同步 | 建立"同步检查"习惯：每次组件库有 PR 合并，检查是否需要同步到 app 前端 |
| 业务逻辑耦合导致改造复杂 | Phase 2 逐个改造，每个独立验证 |
| 模块间组件引用 | Phase 3 按模块独立替换 |

## 执行顺序

```
Phase 0（变量同步）→ Phase 1（共享层直接替换）→ Phase 2（Wrapper 改造）→ Phase 3（模块层替换）→ Phase 4（新增组件复制）→ Phase 5（清理文档）
```

预计工作量：Phase 0 约 1 小时，Phase 1 约 3 小时，Phase 2 约 4 小时，Phase 3 约 3 小时，Phase 4 约 1 小时，Phase 5 约 1 小时。总计约 13 小时。
