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
export { default as Segmented } from './components/Segmented.vue'
export { default as Rate } from './components/Rate.vue'

// 反馈组件
export { default as Empty } from './components/Empty.vue'
export { default as Progress } from './components/Progress.vue'
export { default as Skeleton } from './components/Skeleton.vue'
export { default as LoadingState } from './components/LoadingState.vue'
export { default as Toast } from './components/Toast.vue'

// 交互组件
export { default as BottomSheet } from './components/BottomSheet.vue'
export { default as ActionSheet } from './components/ActionSheet.vue'
export { default as Modal } from './components/Modal.vue'
export { default as Collapse } from './components/Collapse.vue'

// 金融业务组件
export { default as StockItem } from './components/StockItem.vue'
export { default as StatCard } from './components/StatCard.vue'
export { default as ListCell } from './components/ListCell.vue'
export { default as PageCard } from './components/PageCard.vue'
export { default as SubPageCard } from './components/SubPageCard.vue'
export { default as QuoteHeader } from './components/QuoteHeader.vue'
export { default as DataTable } from './components/DataTable.vue'
export { default as IndexCard } from './components/IndexCard.vue'

// 导航和布局组件
export { default as NavBar } from './components/NavBar.vue'
export { default as Footer } from './components/Footer.vue'
export { default as TabBar } from './components/TabBar.vue'
export { default as GlobalChatBar } from './components/GlobalChatBar.vue'
export { default as SubPageCard2 } from './components/SubPageCard2.vue'
export { default as Steps } from './components/Steps.vue'

// 数据可视化组件（纯 SVG 实现，不依赖外部图表库）
export { default as RadarChart } from './components/RadarChart.vue'
export { default as RelationGraph } from './components/RelationGraph.vue'
export { default as Sparkline } from './components/Sparkline.vue'
export { default as Gauge } from './components/Gauge.vue'
export { default as Timeline } from './components/Timeline.vue'

// AI 对话与媒体组件
export { default as ChatBubble } from './components/ChatBubble.vue'
export { default as StreamingText } from './components/StreamingText.vue'
export { default as AudioPlayer } from './components/AudioPlayer.vue'

// 使用示例：
// import { Button, Card, Tag, StockItem, SvgIcon, RadarChart, Gauge, ChatBubble, StreamingText, AudioPlayer } from 'aistock-component-lib'
