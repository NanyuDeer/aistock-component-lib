/**
 * 组件库统一导出入口
 *
 * 林晓研每完成一个组件，在这里导出，团队成员即可统一引用。
 */

// 基础组件
export { default as Button } from './components/Button.vue'
export { default as Card } from './components/Card.vue'
export { default as Tag } from './components/Tag.vue'
export { default as Badge } from './components/Badge.vue'
export { default as Input } from './components/Input.vue'
export { default as Switch } from './components/Switch.vue'
export { default as SvgIcon } from './components/SvgIcon.vue'
export { default as Avatar } from './components/Avatar.vue'

// 反馈组件
export { default as Empty } from './components/Empty.vue'
export { default as Progress } from './components/Progress.vue'
export { default as Skeleton } from './components/Skeleton.vue'
export { default as LoadingState } from './components/LoadingState.vue'

// 金融业务组件
export { default as StockItem } from './components/StockItem.vue'
export { default as StatCard } from './components/StatCard.vue'
export { default as ListCell } from './components/ListCell.vue'
export { default as PageCard } from './components/PageCard.vue'
export { default as SubPageCard } from './components/SubPageCard.vue'

// 使用示例：
// import { Button, Card, Tag, StockItem, SvgIcon } from 'aistock-component-lib'
