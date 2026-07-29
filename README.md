# AiStock 组件库

> App 前端 + 网页前端共用的组件库与设计规范
> 技术栈：Vue 3 + TypeScript + SCSS（rpx 单位，uni-app 组件规范）

## 快速开始

```bash
pnpm install        # 安装依赖
pnpm dev            # 启动本地预览（首页看组件效果，#/catalog 进组件目录页）
pnpm type-check     # 类型检查
pnpm build:lib      # 库模式构建（产出 dist/index.js + dist/aistock-component-lib.css）
pnpm test           # 运行全部组件测试（Vitest）
pnpm test:watch     # 监听模式运行测试
pnpm test:coverage  # 生成测试覆盖率报告
pnpm test:update    # 更新快照
pnpm gen-tokens     # 重新生成设计令牌产物（修改 src/tokens/tokens.json 后运行）
pnpm sync           # 将组件同步到 aistock-app-frontend（复制方式，非引用）
pnpm sync:dry-run   # 仅预览同步结果，不实际写入文件
```

## Design Token 管线

设计令牌采用「单一真相源 + 自动生成」模式，禁止手动编辑 `src/styles/variables.scss`：

```
src/tokens/tokens.json  ──┐  （单一真相源，所有颜色/字号/间距/圆角等令牌）
                          │
   scripts/generate-tokens.ts  （tsx 运行，读取 tokens.json）
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
src/styles/variables.scss  src/tokens/tokens.css  src/tokens/tokens.ts
（SCSS 变量，向后兼容）     （CSS 自定义属性）      （TS 常量）
```

- 修改令牌：编辑 `src/tokens/tokens.json` → 运行 `pnpm gen-tokens` → 三份产物自动更新
- `src/tokens/types.ts` 为 `Tokens` 接口定义，供生成脚本强类型读取

## 组件同步

组件库的组件通过「复制」方式同步到 `aistock-app-frontend`（非 npm 引用），同步后 App 前端可脱离组件库独立编译部署。

```
src/components/*.vue  ──┐  （组件库本体，43 个组件）
                        │
   scripts/sync-components.ts  （tsx 运行，读取 sync.config.json）
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
  复制/重命名组件    改写 import 路径   附加同步 rpx.ts/variables.scss
        │
        ▼
aistock-app-frontend/src/shared/components/
```

- `pnpm sync`：实际同步（覆盖目标文件）
- `pnpm sync:dry-run`：仅预览，不写入任何文件
- App 前端也可直接运行 `pnpm sync` / `pnpm sync:dry-run`（内部 cd 到组件库执行）

### 同步规则（`scripts/sync.config.json`）

| 规则 | 说明 |
|------|------|
| 文件重命名 | Empty→EmptyState、Footer→TheFooter、NavBar→TheNavbar、TabBar→MainTabs |
| import 路径改写 | `@/utils/rpx` → `@/shared/utils/rpx`；`@/styles/variables` → 删除整行 |
| 排除组件 | SvgIcon（App 独立实现）、GlobalChatBar/PageCard/SubPageCard/SubPageCard2/TabBar（App 端 Wrapper 组件，含业务逻辑） |
| 附加同步 | `src/utils/rpx.ts`、`src/styles/variables.scss`（带同步注释头） |
| 孤儿检测 | 检测目标目录中存在但源目录无对应文件的组件，仅报告不自动删除 |

## 组件测试

组件库使用 [Vitest](https://vitest.dev/) + [@vue/test-utils](https://test-utils.vuejs.org/) + happy-dom 运行单元测试，配置在 `vitest.config.ts`：

- `happy-dom` 模拟 DOM 环境
- `@vitejs/plugin-vue` 编译 `.vue`，`isCustomElement` 把 uni-app 的 `view`/`text`/`image` 等标签识别为自定义元素
- SCSS `additionalData` 全局注入 `@/styles/variables.scss`，组件样式中的 `$` 变量可在测试环境解析
- 覆盖率统计仅覆盖 `src/components/**/*.vue`

测试文件位于 `src/components/__tests__/`，每个组件包含 props 行为测试 + 快照测试（快照存于 `__tests__/__snapshots__/`）。已覆盖 11 个基础/反馈组件：Button、Card、Tag、Badge、Avatar、Switch、Empty、LoadingState、Rate、Progress、Skeleton。

```bash
pnpm test           # 运行全部测试
pnpm test:watch     # 监听模式
pnpm test:coverage  # 覆盖率报告（输出到 coverage/）
pnpm test:update    # 组件结构变化后更新快照
```

> 修改组件 props/结构后，若快照失效请先确认改动符合预期再运行 `pnpm test:update`，不要盲目更新快照。

## 库模式构建

通过 Vite 库模式（`vite build --mode lib`）将组件库构建为 ES 模块包，作为未来 npm 发布的产物形态（当前 `private: true`，仅用于本地验证）：

```bash
pnpm build:lib    # 等价于 vite build --mode lib
```

产物（写入 `dist/`，已在 `.gitignore` 中忽略）：

| 文件 | 内容 |
|------|------|
| `dist/index.js` | ES 模块格式（`format: 'es'`），以 `src/index.ts` 为入口，导出全部 43 个组件 |
| `dist/aistock-component-lib.css` | 全部组件 SCSS 编译合并后的 CSS（`cssCodeSplit: false` 单文件） |

构建规则：

- **入口**：`src/index.ts`（43 个组件的 barrel 导出）
- **Vue 外置**：`rollupOptions.external: ['vue']`，产物首行为 `import { ... } from "vue"`，不打包 Vue 运行时（peerDependency 形态）
- **SCSS 注入**：构建期 `additionalData` 全局注入 `@/styles/variables.scss`，组件内 `$` 变量在产物中已展开为字面量
- **不做 rpx→vw 转换**：lib 模式跳过 `rpxToVw` PostCSS 插件，保留 `rpx` 单位交给消费方（uni-app 项目 / Web 项目）按各自平台编译处理
- **不生成类型声明**：当前仅产 JS+CSS，类型由 `vue-tsc --noEmit` 单独校验；未来发布到 npm 时再启用 `vite-plugin-dts` 等 `.d.ts` 产物

## 组件预览

组件库内置轻量级预览环境（无需 Storybook），通过 hash 路由切换两种视图：

- `#/` — 组件预览首页（`dev/App.vue`），所有组件的实际渲染效果展示
- `#/catalog` — 组件目录页（`dev/CatalogPage.vue`），支持搜索、分类筛选、点击预览全部 43 个组件

```bash
pnpm dev            # 启动预览服务
# 浏览器打开后点击顶部导航"组件目录"进入 CatalogPage
```

CatalogPage 功能：
- 6 大分类卡片网格（基础/反馈/业务/布局/图表/AI）
- 实时搜索（组件名/描述/分类三字段匹配）
- 点击组件卡片在右侧预览面板渲染实际组件
- 覆盖层组件（Modal/Toast/ActionSheet 等）在固定高度 frame 内预览
- SvgIcon 点击后展示 12 个可用图标网格

## 目录说明

| 目录 | 作用 |
|------|------|
| `src/components/` | 组件库本体，每个 `.vue` 文件是一个组件 |
| `src/components/__tests__/` | 组件单元测试（Vitest，props + 快照测试） |
| `src/tokens/tokens.json` | Design Token 单一真相源（手动维护） |
| `src/tokens/types.ts` | Tokens 接口类型定义 |
| `src/tokens/tokens.css` `tokens.ts` | 令牌产物（脚本生成，勿手编） |
| `src/styles/variables.scss` | Design Token SCSS 变量（脚本生成，勿手编） |
| `scripts/generate-tokens.ts` | 令牌生成脚本（`pnpm gen-tokens`） |
| `scripts/sync-components.ts` | 组件同步脚本（`pnpm sync` / `pnpm sync:dry-run`） |
| `scripts/sync.config.json` | 同步配置（重命名映射、路径改写、排除列表） |
| `vite.config.ts` | 本地预览 Vite 配置（rpx→vw、自定义元素）；含 `--mode lib` 库模式构建（ES 产物 + vue external） |
| `vitest.config.ts` | 测试配置（happy-dom、自定义元素、SCSS 变量注入） |
| `src/index.ts` | 统一导出入口 |
| `dev/` | 本地预览环境（不入组件库导出） |
| `design/` | HTML 设计稿 |
| `docs/组件库搭建教程.md` | 搭建与使用教程 |

## 协作流程

组件库由林晓研维护，采用 PR 流程：

1. 在分支上开发（`feat/组件名`）
2. 推送到 GitHub
3. 发起 Pull Request 合并到 main
4. 尹辰 review 后合并

具体操作见 `docs/组件库搭建教程.md`。

## 相关项目

- [aistock-app-frontend](../aistock-app-frontend) — App 前端（uni-app + Vue 3）
- [aistock-frontend](../aistock-frontend) — 网页前端（Vue 3 + Element Plus）

## 技术说明

组件使用 uni-app 组件规范（`view`/`text`/`image` 标签、`rpx` 单位），可被 `aistock-app-frontend`（uni-app 项目）直接引用。本地预览环境通过 Vite + 自定义元素配置 + rpx→vw 转换模拟 uni-app 行为，不依赖完整 uni-app 工具链。

## 组件清单（43 个）

### 基础组件
| 组件 | 说明 |
|------|------|
| Button | 按钮（primary/secondary/ghost/accent/gold/danger 6 种类型） |
| Card | 卡片容器（标题 + 副标题 + 内容区） |
| Tag | 标签（涨/跌/中性/警告/金牌） |
| Badge | 徽章（primary/success/warning/danger/gold/info） |
| Input | 输入框（带搜索图标 + 清除按钮） |
| Switch | 开关 |
| SvgIcon | SVG 图标（内联 data URI，18+ 常用图标） |
| Avatar | 头像（文字头像，4 种尺寸 + 4 种配色） |
| Segmented | 分段控制器（支持 fullWidth 模式） |
| Rate | 星级评分（v-model 绑定，gold/primary/up 三色，可交互打分） |

### 反馈组件
| 组件 | 说明 |
|------|------|
| Empty | 空状态（标题 + 描述） |
| Progress | 进度条（线性 + 环形，4 种状态色） |
| Skeleton | 骨架屏（title/text/block 变体） |
| LoadingState | 加载状态（3 种尺寸 + 水平/垂直布局） |
| Toast | 轻提示（v-model:visible，info/success/warning/error 四类图标，duration 自动计时关闭，top/center/bottom 定位） |

### 交互组件
| 组件 | 说明 |
|------|------|
| BottomSheet | 底部弹窗（拖拽手柄 + 标题 + 内容 + 底部操作区） |
| ActionSheet | 操作菜单（选项列表 + 危险项 + 取消按钮） |
| Modal | 模态对话框（v-model:visible，center/bottom 定位，标题+关闭按钮，header/default/footer 插槽，遮罩可点击关闭，opacity+translateY 动画） |
| Collapse | 折叠面板（v-model 绑定展开项 keys，accordion 手风琴模式，disabled 禁用态，动态具名插槽，chevron 旋转+max-height 过渡） |

### 导航和布局组件
| 组件 | 说明 |
|------|------|
| NavBar | 顶部导航栏（返回按钮 + 标题/副标题 + 右侧插槽） |
| Footer | 页脚（居中文案，可插槽覆盖） |
| TabBar | 底部标签栏（图标 + 文字 + 红点/数字徽章） |
| GlobalChatBar | 全局 AI 对话入口（胶囊形态 + 未读数 + 返回箭头） |
| PageCard | 主页面卡片（标题栏 + 内容区 + 底部插槽） |
| SubPageCard | 子页面卡片（带返回按钮的页面容器） |
| SubPageCard2 | 白色导航栏子页面容器（fixed 铺满 + scroll-view） |
| Steps | 步骤条（horizontal/vertical 方向，process/finish/error 当前步状态，已完成对勾/当前发光/错误 X，连接线按完成度着色） |

### 金融业务组件
| 组件 | 说明 |
|------|------|
| StockItem | 股票列表项（名称 + 代码 + 价格 + 涨跌幅） |
| StatCard | 统计卡片（标签 + 数值 + 趋势 + 4 种值配色） |
| ListCell | 列表单元格（标题 + 值 + 箭头 + 禁用态） |
| QuoteHeader | 行情头部（头像 + 名称 + 价格 + 涨跌 + 指标行） |
| InsightPreviewCard | 洞察预览卡片（主题色头部 + 图标 + 排名预览列表，前 3 名奖牌徽标，可配 tag/trend） |
| InvestmentSummaryCard | 投资总结卡片（星级评分 + 投资结论 + 关键要点列表，gold/brand 双主题） |

### 数据可视化组件（纯 SVG 实现）
| 组件 | 说明 |
|------|------|
| RadarChart | 雷达图（多维度评分 + 网格 + 数据多边形 + 维度条） |
| RelationGraph | 关系图谱（径向布局 + 中心节点 + 上下游/关联节点） |
| Sparkline | 迷你走势图（line/area 两种类型 + 自动涨跌色） |
| Gauge | 仪表盘（半圆弧 + 动态颜色 + 3 种尺寸） |
| Timeline | 垂直时间线（圆点+连接线+卡片，up/down/neutral 类型色，利好/利空/中性标签，发光圆点） |

### 金融数据展示组件
| 组件 | 说明 |
|------|------|
| DataTable | 数据表格（grid 列数可配，price/percent/volume/amount/raw 格式化，trend 涨跌着色） |
| IndexCard | 大盘指数卡片（横向指数列表，名称+价格+涨跌幅，红涨绿跌，标题+状态行） |

### AI 对话与媒体组件
| 组件 | 说明 |
|------|------|
| ChatBubble | 聊天气泡（user/assistant 双角色，AI 头像 + card 插槽） |
| StreamingText | 流式打字效果（追加/替换双模式，光标闪烁，done 事件） |
| AudioPlayer | 音频播放器（播放/暂停/快进快退，进度条跳转，跨端 H5/App） |

## 组件选用指南

### StockItem vs QuoteHeader
- **StockItem**：用于股票列表页，展示股票名称、代码、价格、涨跌幅，适合多行列表场景
- **QuoteHeader**：用于个股详情页顶部，展示更丰富的行情信息（市场状态、成交量等指标行），适合详情页头部

### TabBar vs Segmented
- **TabBar**：底部主导航栏，图标 + 文字 + 徽章，用于 App 级页面切换
- **Segmented**：内容区分段控制器，纯文字选项切换，用于页面内数据维度切换（如分时/日K/周K）

### SubPageCard vs SubPageCard2
- **SubPageCard**（已弃用）：旧版子页面容器，保留仅为向后兼容
- **SubPageCard2**（推荐）：白色导航栏子页面容器，fixed 铺满 + scroll-view + footer 插槽，新功能请使用此组件

### PageCard vs SubPageCard2
- **PageCard**：主页面卡片容器，用于 App 主 tab 页面布局
- **SubPageCard2**：子页面容器，用于从主页面跳转的二级页面，带返回按钮
