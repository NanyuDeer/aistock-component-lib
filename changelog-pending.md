## 2026-09-02 InsightCard 条件化预判兼容扩展（板块四环）
- `src/components/InsightCard.vue`：新增 `structured` prop（InsightStructuredForecast：horizons/conditions/dueLabel/verification）——传入时渲染**条件化预判块**：期段 Tab（短/中/长，按 horizons∪conditions 实际档位）+ 每期"基准方向（horizons）"+ 该期**互斥条件情景**（conditions 按 anchor.horizon 归组，每条 `若 条件 → 方向 pill + scenario 幅度`）；conditions[].met 支持分支点亮（true=整支白底蓝缘蓝签"已触发"、false=置灰"未触发"、缺省=待观察）；`tag-text` 覆盖标签文字；块标题"预判"；文本形态（trace/forecast/置信度）零破坏兼容。
- 展示层文案净化：condition 主干剔除括号补充（`condMain`，括号内细节不渲染，条件须一眼看懂）；scenario 幅度段（±数字%、~ 区间）自动置灰（`splitScenario`）；金色收敛为条件主干唯一一段。
- dev/App.vue：新增板块洞见 structured 示例（验证命中态 + met 点亮/置灰演示）。
- 契约字段对齐后端 PredictionResult（horizons[].horizon/remaining_estimate/direction/confidence；conditions[].condition/scenario/anchor.horizon+direction；met ← 验证 condition_met）。
- 复制同步到 aistock-app-frontend `shared/components/InsightCard.vue`（同文件复制）。aistock-frontend（Web）同步待确认。
