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
| `docs/组件库开发指南.md` | 组件开发规范与协作流程 |

## 协作流程

组件库由林晓研维护，采用 PR 流程：

1. 在分支上开发（`feat/组件名`）
2. 推送到 GitHub
3. 发起 Pull Request 合并到 main
4. 尹辰 review 后合并

具体操作见 `docs/组件库开发指南.md`。

## 相关项目

- [aistock-app-frontend](../aistock-app-frontend) — App 前端（uni-app + Vue 3）
- [aistock-frontend](../aistock-frontend) — 网页前端（Vue 3 + Element Plus）

## 技术说明

组件使用 uni-app 组件规范（`view`/`text`/`image` 标签、`rpx` 单位），可被 `aistock-app-frontend`（uni-app 项目）直接引用。本地预览环境通过 Vite + 自定义元素配置 + rpx→vw 转换模拟 uni-app 行为，不依赖完整 uni-app 工具链。
