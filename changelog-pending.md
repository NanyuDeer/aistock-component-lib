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
