# Changelog Pending

本文件记录尚未提交的修改，用户说 commit/push 时由 git-workflow 接管。

## 2026-07-29 — $font-mono 衬线回退修复

### 修改文件

#### src/styles/variables.scss
- **$font-mono 衬线回退修复**：原定义末尾为 `monospace`（在 Windows 上可能回退到 Courier New 衬线字体），改为 `sans-serif` 确保最终回退为无衬线。同时添加 `'Cascadia Code'`、`'Cascadia Mono'`、`'Roboto Mono'` 作为中间回退
- **$font-sans 回退链增强**：添加 `'PingFang SC'`、`'Microsoft YaHei'` 作为 macOS/Windows 中文回退字体

#### src/tokens/tokens.json
- 同步更新 `fontFamily.sans` 和 `fontFamily.mono` 定义（设计令牌单一真相源）

#### src/tokens/tokens.css
- 同步更新 `--font-sans` 和 `--font-mono` CSS 自定义属性（由 tokens.json 生成）

### 根因分析
- `JetBrains Mono` 和 `Noto Sans SC` 均未通过 `@font-face` 加载，依赖系统安装
- 原回退链 `..., Consolas, monospace` 中，`monospace` 在 Windows 上可能解析为 Courier New（衬线字体）
- 修复后回退链 `..., Consolas, Menlo, Monaco, sans-serif`，确保最终回退为无衬线
