# 待提交修改记录

## 2026-07-20 尹辰

### feat: 创建 aistock-component-lib 组件库仓库
- **用途**：为林晓研提供 App 前端 + 网页前端共用的组件库与设计规范
- **技术栈**：Vue 3 + TypeScript + SCSS（rpx 单位，uni-app 组件规范）
- **已包含内容**：
  - `src/components/` 组件库本体
  - `src/styles/variables.scss` Design Token 设计变量
  - `src/index.ts` 统一导出入口
  - `dev/` 本地预览环境
  - `design/` HTML 设计稿
  - `docs/组件库搭建教程.md` 搭建与使用教程
- **协作流程**：林晓研维护，采用 PR 流程（feat/组件名 分支开发 → 推送 GitHub → PR review → 合并）
- **关联**：Day 1 任务二「组件库使用指南」的仓库基础已就绪，待补充完整指南文档（Design Token、组件清单、Props 参数表、AGENTS.md 指引）

## 2026-07-28 林晓研

### feat: 新增 5 个导航和布局组件
- **用途**：补齐组件库导航/布局类组件，供 app 前端与 web 前端共用
- **新增文件**：
  - `src/components/NavBar.vue` 顶部导航栏（返回按钮/标题/副标题/右侧操作，适配安全区）
  - `src/components/Footer.vue` 页脚（居中产品标识）
  - `src/components/TabBar.vue` 底部标签栏（props 配置 tabs，选中胶囊高亮，红点/数字徽章）
  - `src/components/GlobalChatBar.vue` 全局 AI 对话入口（悬浮胶囊，返回箭头，发送按钮）
  - `src/components/SubPageCard2.vue` 白色导航栏子页面容器（scroll-view 内容区）
- **改造说明**：TabBar/GlobalChatBar/SubPageCard2 从 app 前端原版改造，移除硬编码路由与 uni API（navigateTo/navigateBack/getSystemInfoSync），改为 props/events 解耦；SubPageCard2 移除内嵌 GlobalChatBar 依赖
- **规范遵守**：view/text/image/scroll-view 标签、rpx 单位、@click 事件、as- 前缀、withDefaults 写法、$ 变量直用、内联 SVG data URI、零 uni API、零 emoji
- **导出**：`src/index.ts` 新增「导航和布局组件」分组导出
- **验证**：`vue-tsc --noEmit` 类型检查通过（exit 0）

## 2026-07-28 林晓研

### feat: 新增 4 个交互和金融业务组件
- **用途**：补齐组件库交互控件和金融行情展示组件
- **新增文件**：
  - `src/components/Segmented.vue` 分段控制器（v-model 绑定，fullWidth 模式，disabled 支持，选中白底+primary色+shadow-xs）
  - `src/components/BottomSheet.vue` 底部抽屉（v-model:visible，遮罩高斯模糊，拖拽手柄，header/default/footer 插槽，scroll-view 内容区，closeable 遮罩点击关闭，CSS 类切换动画兼容 uni-app）
  - `src/components/ActionSheet.vue` 动作面板（v-model:visible，items 配置，danger 红色样式，disabled 支持，分隔区域，取消按钮，select/cancel 事件）
  - `src/components/QuoteHeader.vue` 行情头（股票名称/代码/市场/状态标签，大字号价格+涨跌额+涨跌幅Tag，指标行 metrics，computed 涨跌色管理，A股惯例红涨绿跌）
- **动画方案**：BottomSheet/ActionSheet 采用"始终渲染+CSS类切换"方案（opacity+translateY+pointer-events），避免 Vue `<transition>` 在 uni-app 原生端的兼容问题
- **规范遵守**：view/text/scroll-view 标签、rpx 单位、@click 事件、as- 前缀、withDefaults 写法、$ 变量直用、零 uni API、零 emoji
- **导出**：`src/index.ts` 新增 Segmented（基础组件）、BottomSheet+ActionSheet（交互组件）、QuoteHeader（金融业务组件）
- **验证**：`vue-tsc --noEmit` 类型检查通过（exit 0）

## 2026-07-28 林晓研

### feat: 新增 4 个数据可视化组件（纯 SVG 实现）
- **用途**：补齐组件库金融数据可视化能力，供多维度评分、产业链关联、价格趋势、关键指标展示场景使用
- **新增文件**：
  - `src/components/RadarChart.vue` 雷达图（五维评分可视化，三层同心网格五边形，数据多边形半透明填充+描边+顶点圆点，维度明细条形图，综合评分大字号显示，空态"暂无评分数据"）
  - `src/components/RelationGraph.vue` 关系图谱（径向布局，中心节点主色渐变高亮，上游蓝/下游红/关联灰虚线分色，底部三色图例，node-click 事件，空态"暂无关联数据"）
  - `src/components/Sparkline.vue` 迷你走势图（无坐标轴纯趋势线，line/area 两种模式，涨跌自动着色：末值>首值用$up红、反之为$down绿、相等$flat灰，自定义颜色覆盖，每实例独立渐变 id 防引用错乱）
  - `src/components/Gauge.vue` 半圆仪表盘（背景轨道+彩色进度弧，色带按区间变化：>=80 $up红/>=60 $gold/>=40 $warning/<40 $down绿，dashoffset 进度计算，sm/md/lg 三种尺寸，分数+标签居中显示）
- **SVG 实现要点**：viewBox 坐标系计算（雷达图极坐标转换、关系图径向布局 distribute 函数、Sparkline 数据归一化映射、Gauge 弧长 dashoffset=220*(1-value/max)），所有可视化纯 SVG 无外部图表库依赖
- **规范遵守**：view/text/image 标签、rpx 单位、@click 事件、as- 前缀、withDefaults(defineProps<{}>(), {}) 写法、$ 变量直用、零 uni API、零 emoji
- **导出**：`src/index.ts` 新增「数据可视化组件」分组导出（RadarChart/RelationGraph/Sparkline/Gauge）
- **预览**：`dev/App.vue` 新增 4 个组件的演示区域（含示例数据和交互回调）
- **验证**：`vue-tsc --noEmit` 类型检查通过（exit 0）

## 2026-07-28 林晓研

### feat: 新增 3 个 AI 对话与媒体组件
- **用途**：补齐 AI 对话场景（聊天气泡、流式打字效果）与通用音频播放能力，供 app 前端与 web 前端共用
- **新增文件**：
  - `src/components/ChatBubble.vue` 聊天气泡（user 右对齐主色背景白字 / assistant 左对齐白色背景深色字 + AI 头像，气泡尖角圆角 16/16/4/16 与 16/16/16/4，max-width 80%，assistant 带 $shadow-xs，name="card" 插槽支持富内容卡片，AI 头像用内联 SVG data URI 不依赖 SvgIcon）
  - `src/components/StreamingText.vue` 流式打字效果（保留追加/替换双模式打字机逻辑，新增 done 事件与 showCursor/cursorChar props，光标 $primary 色 blink 1s 闪烁，打字中显示完成隐藏，文字 $ink/$font-size-md/$lh-base）
  - `src/components/AudioPlayer.vue` 通用音频播放器（快退 -10s / 播放暂停 / 快进 +10s 三键控制，主键 $brand-gradient 圆形白图标 + 侧键 $bg-soft/$ink-soft，可点击进度条跳转 $primary 填充白滑块，mm:ss 时间显示，标题在按钮上方可选封面，emit play/pause/ended/timeupdate）
- **跨端音频方案**：AudioPlayer 采用运行时探测（typeof Audio / globalThis.uni）分流——H5 用 `new Audio()`、App/小程序用 `uni.createInnerAudioContext()`，并用最小类型声明（InnerAudioContextLike/SelectorQueryLike/UniApi）兼容组件库无 uni 类型的环境；template 不直接写 `<audio>`，由 script 创建管理。进度条跳转 H5 用 getBoundingClientRect、其他端用 `uni.createSelectorQuery().in(instance)`
- **规范遵守**：view/text/image 标签、rpx 单位、@tap 事件、as- 前缀、withDefaults(defineProps<{}>(), {}) 写法、$ 变量直用、内联 SVG data URI 图标、零 emoji；AudioPlayer 事件处理用 unknown 参数规避 vue-tsc 自定义元素事件类型问题
- **导出**：`src/index.ts` 新增「AI 对话与媒体组件」分组导出（ChatBubble/StreamingText/AudioPlayer）
- **验证**：`vue-tsc --noEmit` 类型检查通过（exit 0）

## 2026-07-28 林晓研

### feat: 新增 4 个金融数据展示组件
- **用途**：从 app 前端提取并按蓝白金融设计系统重新设计，补齐星级评分、时间线、数据表格、大盘指数卡片场景
- **新增文件**：
  - `src/components/Rate.vue` 星级评分（v-model 绑定 modelValue，max/size/gap/readonly/type/showText 配置；内联 SVG data URI 实现填充星/描边星，gold→#d4a843 / primary→#0b5fff / up→#e54d5e 三色，inactive 统一 #b8c3d6；readonly=false 时 @tap 可交互改分；showText 显示 "x/max"）
  - `src/components/Timeline.vue` 垂直时间线（items 配置 time/title/description/type/extra；type 映射 up=利好红/down=利空绿/neutral=中性灰；左侧圆点带发光 box-shadow + 竖线连接连续至下一项圆点；右侧白卡 $bg-card+$line+$shadow-xs）
  - `src/components/DataTable.vue` 数据表格（data 配置 label/value/unit/trend/formatter；price/percent/volume/amount/raw 五种格式化，volume/amount 自动万/亿换算；trend 正值 $up 红/负值 $down 绿；grid 布局 columns 可配默认 3 列；空值显示 '--'）
  - `src/components/IndexCard.vue` 大盘指数卡片（indices 配置 name/code/price/changePercent；标题行+状态文字；横向 flex 指数列表，名称小字+价格大字加粗+涨跌幅带符号%，红涨绿跌；$bg-card+$shadow-sm+$r-lg）
- **规范遵守**：view/text/image 标签、rpx 单位、@tap 事件、as- 前缀、withDefaults(defineProps<{}>(), {}) 写法、$ 变量直用、内联 SVG data URI（Rate 星形）、零 emoji、A 股红涨绿跌
- **导出**：`src/index.ts` 新增「金融数据展示组件」分组导出（Rate/Timeline/DataTable/IndexCard）
- **文档**：`README.md` 组件清单 30→34，新增「金融数据展示组件」分类
- **验证**：`vue-tsc --noEmit` 类型检查通过（exit 0）

## 2026-07-28 林晓研

### feat: 新增 4 个交互反馈组件（Modal/Toast/Collapse/Steps）
- **用途**：补齐组件库模态对话框、轻提示、折叠面板、步骤条场景，供 app 前端与 web 前端共用
- **新增文件**：
  - `src/components/Modal.vue` 模态对话框（v-model:visible，center/bottom 定位，标题+关闭按钮，header/default/footer 插槽，遮罩可点击关闭，opacity+translateY 动画）
  - `src/components/Toast.vue` 轻提示（v-model:visible，info/success/warning/error 四类图标，duration 自动计时关闭，top/center/bottom 定位，半透明深色背景）
  - `src/components/Collapse.vue` 折叠面板（v-model 绑定展开项 keys，accordion 手风琴模式，disabled 禁用态，动态具名插槽，chevron 旋转+max-height 过渡）
  - `src/components/Steps.vue` 步骤条（horizontal/vertical 方向，process/finish/error 当前步状态，已完成对勾/当前发光/错误 X，连接线按完成度着色）
- **规范遵守**：view/text/image/scroll-view 标签、rpx 单位、@tap 事件、as- 前缀、withDefaults(defineProps<{}>(), {}) 写法、$ 变量直用、内联 SVG data URI、零 emoji、SCSS scoped 样式
- **导出**：`src/index.ts` 新增 Toast（反馈组件）、Modal+Collapse（交互组件）、Steps（导航和布局组件）
- **文档**：`README.md` 组件清单 34→38，`AGENTS.md` 组件数同步更新
- **验证**：`vue-tsc --noEmit` 类型检查通过（4 个新组件零类型错误）

## 2026-07-28 林晓研

### fix: 修复 Gauge 组件预览环境渲染空白
- **问题**：Gauge 组件 SVG 使用内联 `:style="{ width: dims.w + 'rpx', height: dims.h + 'rpx' }"` 设置尺寸，但 rpx→vw PostCSS 插件只处理 `<style>` 块中的 CSS 声明，不处理内联 `:style` 绑定。浏览器不认识 rpx 单位，导致 SVG 尺寸为 0，仪表盘完全不可见
- **根因**：对比 RadarChart（用 CSS 类设 `width: 100%`）和 Sparkline（`width: '100%'` 有效 + 浏览器按 viewBox 自动计算高度），Gauge 的 width 和 height 均为 rpx，两个维度都无效
- **修复**：移除内联 `:style` 绑定和 `sizeMap`/`dims` 计算属性，改为在 `<style>` 块中定义 `.is-sm`/`.is-md`/`.is-lg` 尺寸类，通过 `:class="'is-' + size"` 应用。rpx 值在 CSS 块中能被 PostCSS 正确转换为 vw
- **影响文件**：`src/components/Gauge.vue`
- **验证**：`vue-tsc --noEmit` 类型检查通过（exit 0）；浏览器预览确认 4 个仪表盘（86红/65金/45橙/28绿）全部正常渲染

## 2026-07-28 林晓研

### fix: 修复内联 rpx 样式在 H5 预览环境不生效问题
- **问题**：vite.config.ts 中的 rpxToVw PostCSS 插件只处理 `<style>` 块中的 CSS 声明，不处理 Vue 模板中的内联 `:style` 绑定。浏览器不认识 rpx 单位，导致使用 rpx 的内联样式元素尺寸为 0
- **解决方案**：
  1. 创建 `src/utils/rpx.ts` 工具函数，实现与 PostCSS 插件相同的 rpx→vw 转换公式（1rpx = 100vw/750）
  2. 对所有使用内联 rpx 样式的组件（SvgIcon/Rate/Sparkline/PageCard/GlobalChatBar）应用此工具
- **影响文件**：`src/utils/rpx.ts`（新增）、`src/components/SvgIcon.vue`、`src/components/Rate.vue`、`src/components/Sparkline.vue`、`src/components/PageCard.vue`、`src/components/GlobalChatBar.vue`

### fix: 修复 SVG 图标在 H5 预览环境不渲染问题（两阶段修复）

#### 阶段一：`<image>` 标签 → CSS background-image
- **问题**：使用 `<image>` 标签加载 SVG data URI 时，H5 环境将其识别为 HTMLUnknownElement 而非 `<img>`，导致 src 属性无效、SVG 内容不渲染
- **解决方案**：将所有组件中的 `<image>` 标签替换为使用 CSS `background-image` 加载 SVG
- **影响文件**：SvgIcon.vue/Rate.vue/AudioPlayer.vue/ChatBubble.vue/GlobalChatBar.vue/Modal.vue/Steps.vue/Toast.vue

#### 阶段二：模板属性中 `url(\"...\")` → `url('...')`
- **问题**：6 个组件在 `:style` 属性中使用 `url(\"${icon}\")` 格式，双引号内的转义双引号被 Vue 模板编译器误认为属性结束符，导致 "Unterminated template" 解析错误，组件文件返回 HTTP 500，整个 Vue 应用无法挂载
- **根因**：HTML 属性用双引号包裹时，内部不能出现裸双引号（即使 JS 层面转义也不行，因为 Vue 模板编译器先做 HTML 解析）
- **解决方案**：将所有 `url(\"${...}\")` 改为 `url('${...}')`，使用单引号包裹 URL 值
- **影响文件**：`src/components/AudioPlayer.vue`（3处）、`src/components/ChatBubble.vue`（1处）、`src/components/GlobalChatBar.vue`（1处）、`src/components/Modal.vue`（1处）、`src/components/Steps.vue`（4处）、`src/components/Toast.vue`（1处）
- **验证**：
  - `npx tsc --noEmit` 类型检查通过（exit 0）
  - 浏览器预览页面成功挂载，25 个交互元素全部可操作
  - JavaScript 验证所有图标元素有正确尺寸（43-66px）且 background-image 已设置
  - 网络请求确认所有组件 .vue 文件和 SVG data URI 均加载成功（无 ERR_ABORTED）
  - 37+ 个组件全部渲染（含 Button/Card/Tag/Input/Switch/StockItem/Progress/Empty/Skeleton/Avatar/SvgIcon/LoadingState/StatCard/ListCell/PageCard/SubPageCard/RadarChart/Gauge/Sparkline/RelationGraph/Segmented/QuoteHeader/NavBar/Footer/TabBar/GlobalChatBar/BottomSheet/ActionSheet/SubPageCard2/Rate/Timeline/DataTable/IndexCard/ChatBubble/StreamingText/AudioPlayer/Modal/Toast/Collapse/Steps）

## 2026-07-29 林晓研（Task 1：前端架构改进）

### feat: 建立设计令牌单一真相源（tokens.json → SCSS/CSS/TS）
- **用途**：将手动维护的 `src/styles/variables.scss` 升级为自动化令牌管线，`tokens.json` 作为单一真相源，脚本一键生成 SCSS/CSS/TS 三份产物
- **新增文件**：
  - `src/tokens/tokens.json` 设计令牌单一真相源（color/radius/spacing/fontSize/lineHeight/fontFamily/letterSpacing/shadow/activeBackground/zIndex/grid/breakpoint/transition/opacity/focusRing）
  - `src/tokens/types.ts` Tokens 接口类型定义（供 generate-tokens.ts 强类型读取）
  - `scripts/generate-tokens.ts` 生成脚本（tsx 运行，读取 tokens.json 输出三份产物）
  - `src/tokens/tokens.css` CSS 自定义属性产物（:root 变量，未来 Web 端可用）
  - `src/tokens/tokens.ts` TS 常量产物（组件内联样式可用）
- **修改文件**：
  - `package.json` 新增 devDep `tsx@^4.19.0`、script `gen-tokens: tsx scripts/generate-tokens.ts`
  - `src/styles/variables.scss` 改为脚本生成（覆盖原手动文件，向后兼容）
- **向后兼容**：生成产物与原 variables.scss 完全兼容——变量名、变量值、"兼容旧变量"别名全部保留；`git diff` 仅头部注释 + 过渡变量写法变化（`$t-fast: 0.15s $ease-out` → `0.15s cubic-bezier(...)`，SCSS 解析后值完全等价）。原文件中 brief 脚本未覆盖的 3 段（Letter Spacing / Grid & Breakpoints / Active-Hover Backgrounds，其中 `$primary-active-bg` 被 StockItem.vue 使用）已补充进 tokens.json + 脚本，确保零回归
- **验证**：`npx tsx scripts/generate-tokens.ts` 生成三产物成功；`vue-tsc --noEmit` 类型检查通过（exit 0）
- **已知环境问题**：当前会话因长驻进程占用 `aistock-component-lib` 目录句柄，导致 `pnpm install`（注册项目到 store 时创建目录链接）报 EBUSY；非项目代码问题，干净会话下 `pnpm install && pnpm run gen-tokens` 可正常工作。本次验证以 `npx tsx` 旁路 store 完成
- **文档**：README.md / AGENTS.md 同步说明令牌管线与"禁止手编 variables.scss"规则
