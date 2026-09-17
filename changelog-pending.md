## 2026-09-17 CFB 折叠态判定修正（按已成立分支 lit 判，不再依赖降级模式）+ 未命中标签去重（与 app-frontend 同步）

- 问题：折叠态判定挂在 `resolvedDisplayMode === 'conclusion'`（= 当期含布尔 `met`），而后端按决策 D1 只写 `condition_met=true`、不写 false → 未触发档无任何布尔 `met` → `hasMetData` 为假 → `resolveDisplayMode` 降级 `full` → 分支渲染源返回全部分支 → **折叠态在真实数据下不可达**。
- `src/components/ConditionalForecastBlock.vue`：新增 `litConditions`（= `selectVisibleConditions(inHorizonConditions, 'conclusion')`，当期 `met === true` 分支）；`isFoldedUnmet` 改为 `conditionDisplay !== 'sentence' && litConditions.length === 0 && inHorizonConditions.length > 0`（后一守卫避免「该档无条件分支」时渲染出点开后空无一物的入口）；`renderedConditions` 三态 = sentence 不过滤 / 未触发折叠（未点开空、点开铺开全部）/ 已触发只渲染 `litConditions`；`hiddenConditionCount` 与 `showHiddenBranchLabel` 改以 `litConditions` 口径（已触发档 + 确有隐藏分支）。
- 文案去重：折叠态 `structured.verification === 'miss'` → 头部同义 pill「验证未中」由 `verifyText` 抑制（只保留入口行「未命中」标签）；其余状态 pill 行为不变。原空态文案「条件未成立 · 暂无已验证结论」在 tags 形态下不再出现（由折叠入口承接），模板改为三元：`sentence` 形态保留原文案、tags 形态沿用「该期暂无细分情景」。
- 无消费方保留：`hasMetData` / `resolveDisplayMode`（内联 helper）与 App 侧 `src/shared/utils/conditionalForecast.ts` 同名导出均保留函数与单测，仅组件内不再据此决定 UI；`displayMode` prop 保留（调用方 API 兼容）但不再驱动 UI。
- 两副本：`Compare-Object` 差异仅内联 helper 定义块（库 25 行）↔ App 侧 `import { selectVisibleConditions } from '@/shared/utils/conditionalForecast'`（1 行 + 空行）；App 副本已删除被灌入的内联 helper、import 行已恢复；InsightCard 两副本无差异。
- 类型检查：`npm run type-check` 仅存量 `dev/App.vue`（Segmented 4 条）+ `src/components/AudioPlayer.vue`（1 条），本次零新增。

- `src/components/ConditionalForecastBlock.vue`：**未触发折叠态**——当前档无 `met === true` 分支、且 `conclusion` 实际生效、且 tags 形态（`conditionDisplay !== 'sentence'`）→ 分支区不铺开，收为一行入口「查看条件化预判 ▾」/「收起条件化预判 ▴」（`branchesExpanded` 本地展开，`setActiveHorizon` 归零）；展开后 `renderedConditions` 返回该档**全部**条件分支（沿用既有分支渲染与样式）。基准行照常显示；分支区渲染源由 `activeConditions` 改为 `renderedConditions`（非折叠态等价，行为不变）。
- 取值口径：原空态文案「条件未成立 · 暂无已验证结论」在 **tags 形态折叠态下不再显示**（由折叠入口承接），仅保留给 `sentence` 形态的同类场景（详见 app-frontend changelog 同日条目）。
- 到期未触发「未命中」标签：折叠态下 `structured.verification === 'miss'` → 入口旁中性灰标签（`__sc-miss`，沿用 miss 灰/中性色）。
- 隐藏分支纯标注：`conclusion` 生效 + 有已成立分支 + 被过滤分支数 > 0 → 分支区末尾「另有 N 条条件未成立」（`__sc-hidden`，caption 字号 + 既有边框色，不可点）。
- 已触发（存在 `met === true`）保持现设计（`[条件成立]` 徽 + 验证标识，不折叠）。
- 新增样式：`__sc-fold` / `__sc-fold-tx` / `__sc-miss` / `__sc-hidden` / `__sc-hidden-tx`（全部用既有 token，无硬编码色）。
- 类型检查：`npm run type-check` 仅存量 `dev/App.vue`（Segmented 4 条）+ `src/components/AudioPlayer.vue`（1 条），与 HEAD 版本 A/B 比对逐条一致（本次零新增）。
- 两副本：同步 app-frontend `shared/components/ConditionalForecastBlock.vue`，`Compare-Object` 差异仅 helper 定义块 + App 侧 import 行；InsightCard 两副本无差异。

## 2026-09-16 洞见卡结论模式（只显示已验证结论）落地（与 app-frontend 同步）

- `src/components/ConditionalForecastBlock.vue`：新增 `displayMode: 'full' | 'conclusion'`（默认 `full`）——结论模式只渲染 `met === true` 分支、未满足分支彻底隐藏，该期无已成立分支时显示「条件未成立 · 暂无已验证结论」；新增 `resolvedDisplayMode` computed 驱动 ①分支过滤 ②结论空态门控（`resolvedDisplayMode === 'conclusion' && !activeConditions.length`）——整块无布尔 `met` 数据（后端未回填 `condition_met`）时 `conclusion` 降级 `full`，避免全空态（用户裁决，Task 5b）。
- 组件库跨仓不可引用，故在 CFB 内联 `selectVisibleConditions` + `hasMetData` + `resolveDisplayMode`（与 `app-frontend/src/shared/utils/conditionalForecast.ts` 同实现）；App 副本走 `@/shared/utils/conditionalForecast` import → 两副本差异**仅**该 helper 定义块（23 行），InsightCard 两副本无差异。
- `src/components/InsightCard.vue`：新增溯源「依据详情」展开入口（`traceDetail` + `traceStructured.more`，本地展开不新增接口）+ `traceStructured.stages` 预留链式溯源 P3'（无数据不渲染）+ `displayMode` 透传 CFB；入口触控高度修正。
- 基线回灌：CFB 由 app 副本回灌 `positionAction` 仓位动作徽标 + 补单档守卫（`horizonSegments.length > 1`）+ `activeHorizon` `watchEffect` 校正（既有红测转绿）。
- `dev/App.vue`：补结论模式样例（有已成立分支 / 空态）+ 依据详情样例，供肉眼验收。
- 类型检查：`npm run type-check` 仅存量 `dev/App.vue`（Segmented 4 条）+ `src/components/AudioPlayer.vue`（1 条），本次零新增（已与 T6 前版本 A/B 对齐一致）。
- 终审收口（2026-09-16，与 app-frontend 同步）：`resolvedDisplayMode` 改为按**当前期段**判定降级（新增 `inHorizonConditions` computed，`activeConditions` 改由它过滤）——某档含布尔 `met` 而另一档全为 `null/undefined` 时，切到后者不再误显假空态「条件未成立 · 暂无已验证结论」并隐藏该档全部分支；helper（`selectVisibleConditions` / `hasMetData` / `resolveDisplayMode`）仍内联，两副本差异仍仅 helper 块 + App 侧 import 行（`Compare-Object` 23 行）。类型检查仍仅存量 `dev/App.vue`（Segmented 4 条）+ `src/components/AudioPlayer.vue`（1 条）。

## 2026-09-03 InsightCard 洞见字标标签 + lines 多要点行支持（双端同步）
- `src/components/InsightCard.vue`：
  - 头部标签由瞳孔 InsightTag 换为「洞见字标 PNG + 灰点 + 彩色类型词」：浅色卡 `insight-wordmark.png`（深色）/ 深蓝研报卡 `insight-wordmark-light.png`（反白），组件内 `import` 走内联背景图 + `filter: drop-shadow`（预览环境 image 标签不可用故不走 image）；类型词沿用 5 类型色（event 取中调 #00a8d8），`tag-text` 自动剥"洞见"后缀；dark 词提亮。
  - 新增 `lines` prop（优势/风险/建议多要点行：key 固定宽 + text，tone positive=up-soft 红 / risk=warning-soft 金 / 缺省中性 bg-soft；dark 统一半透明底）。
- 图片随组件同目录 `src/components/insight-wordmark.png`、`insight-wordmark-light.png`；`shims-vue.d.ts` 补 `*.png` 声明。
- 同步 aistock-app-frontend `shared/components/`（InsightCard 覆盖 + 两张 png）。InsightTag 其余调用点不变。

## 2026-09-02 预判条件卡改版：条件句 → 关键词 chip
- `src/components/ConditionalForecastBlock.vue`：条件行由整句金色文字改为关键词 chip 流（condChips 切词）；期段/基准/方向/幅度/点亮原样保留，与 app 端共享块同步。

## 2026-09-02 ConditionalForecastBlock 抽取（条件化预判块通用化，全粒度共用）
- 新增 `src/components/ConditionalForecastBlock.vue`：从 InsightCard structured 内块抽取为**独立纯 UI 通用块**——期段 Tab（短/中/长）+ 每期基准方向/置信/剩余 + 互斥分支（若 条件 → 方向 pill → scenario 幅度置灰）+ met 触发点亮/置灰 + 验证 pill + **anchor threshold/metric chip**（大盘等粒度透传）。大盘/板块/个股凡有条件化预判共用同款 UI。
- `src/components/InsightCard.vue`：structured 分支改为内部复用 ConditionalForecastBlock；迁出期段状态/文案净化（condMain/splitScenario）/样式。公共 props/API 不变（文本形态零破坏）。
- `src/index.ts`：导出 ConditionalForecastBlock。
- 同步 aistock-app-frontend `shared/components/`（InsightCard 覆盖 + ConditionalForecastBlock 新增 + index 导出）；app `MarketTracePrediction` 条件化预判区改嵌本块（大盘接入，替代其自绘分支卡）。

## 2026-09-02 InsightCard 条件化预判兼容扩展（板块四环）
- `src/components/InsightCard.vue`：新增 `structured` prop（InsightStructuredForecast：horizons/conditions/dueLabel/verification）——传入时渲染**条件化预判块**：期段 Tab（短/中/长，按 horizons∪conditions 实际档位）+ 每期"基准方向（horizons）"+ 该期**互斥条件情景**（conditions 按 anchor.horizon 归组，每条 `若 条件 → 方向 pill + scenario 幅度`）；conditions[].met 支持分支点亮（true=整支白底蓝缘蓝签"已触发"、false=置灰"未触发"、缺省=待观察）；`tag-text` 覆盖标签文字；块标题"预判"；文本形态（trace/forecast/置信度）零破坏兼容。
- 展示层文案净化：condition 主干剔除括号补充（`condMain`，括号内细节不渲染，条件须一眼看懂）；scenario 幅度段（±数字%、~ 区间）自动置灰（`splitScenario`）；金色收敛为条件主干唯一一段。
- dev/App.vue：新增板块洞见 structured 示例（验证命中态 + met 点亮/置灰演示）。
- 契约字段对齐后端 PredictionResult（horizons[].horizon/remaining_estimate/direction/confidence；conditions[].condition/scenario/anchor.horizon+direction；met ← 验证 condition_met）。
- 复制同步到 aistock-app-frontend `shared/components/InsightCard.vue`（同文件复制）。aistock-frontend（Web）同步待确认。
