# AiStock 组件库

> App 前端 + 网页前端共用的组件库与设计规范
> 技术栈：Vue 3 + TypeScript + SCSS（rpx 单位，uni-app 组件规范）

## 快速开始

```bash
pnpm install    # 安装依赖
pnpm dev        # 启动本地预览（浏览器打开看组件效果）
pnpm type-check # 类型检查
```

## 目录说明

| 目录 | 作用 |
|------|------|
| `src/components/` | 组件库本体，每个 `.vue` 文件是一个组件 |
| `src/styles/variables.scss` | Design Token 设计变量 |
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

## 组件清单（41 个）

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
