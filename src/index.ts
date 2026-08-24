/**
 * 组件库统一导出入口
 */

// ===== 第 1 层：基础 UI 组件 =====
export { default as Button } from './components/Button.vue'
export { default as Card } from './components/Card.vue'
export { default as Tag } from './components/Tag.vue'
export { default as Badge } from './components/Badge.vue'
export { default as Input } from './components/Input.vue'
export { default as Switch } from './components/Switch.vue'
export { default as SvgIcon } from './components/SvgIcon.vue'
export { default as Avatar } from './components/Avatar.vue'

// ===== 反馈组件 =====
export { default as Empty } from './components/Empty.vue'
export { default as Progress } from './components/Progress.vue'
export { default as Skeleton } from './components/Skeleton.vue'
export { default as LoadingState } from './components/LoadingState.vue'

// ===== 金融业务组件 =====
export { default as StockItem } from './components/StockItem.vue'
export { default as StatCard } from './components/StatCard.vue'
export { default as ListCell } from './components/ListCell.vue'
export { default as PageCard } from './components/PageCard.vue'
export { default as SubPageCard } from './components/SubPageCard.vue'

// ===== 第 2 层：表单扩展组件 =====
export { default as Checkbox } from './components/Checkbox.vue'
export { default as Radio } from './components/Radio.vue'
export { default as Select } from './components/Select.vue'
export { default as Slider } from './components/Slider.vue'
export { default as Rate } from './components/Rate.vue'
export { default as Tooltip } from './components/Tooltip.vue'

// ===== 第 3 层：覆盖层组件 =====
export { default as Modal } from './components/Modal.vue'
export { default as Drawer } from './components/Drawer.vue'
export { default as Popover } from './components/Popover.vue'
export { default as Toast } from './components/Toast.vue'
export { default as Alert } from './components/Alert.vue'

// ===== 第 4 层：通用图表组件 =====
export { default as Gauge } from './components/Gauge.vue'
export { default as Sparkline } from './components/Sparkline.vue'
export { default as IndexCard } from './components/IndexCard.vue'

// ===== 第 5 层：通用 UI 扩展组件 =====
export { default as Collapse } from './components/Collapse.vue'
export { default as Pagination } from './components/Pagination.vue'
export { default as Timeline } from './components/Timeline.vue'
export { default as Result } from './components/Result.vue'
export { default as PeriodSelector } from './components/PeriodSelector.vue'

// ===== 第 6 层：Web 端布局与导航组件 =====
export { default as PageHeader } from './components/PageHeader.vue'
export { default as Toolbar } from './components/Toolbar.vue'
export { default as FilterBar } from './components/FilterBar.vue'
export { default as DataGrid } from './components/DataGrid.vue'
export { default as CommandPalette } from './components/CommandPalette.vue'

// ===== Navigation 导航组件 =====
export { default as Breadcrumb } from './components/Breadcrumb.vue'
export { default as Divider } from './components/Divider.vue'
export { default as Steps } from './components/Steps.vue'
export { default as Segmented } from './components/Segmented.vue'
export { default as Dropdown } from './components/Dropdown.vue'

// ===== 第 7 层：App 端导航与覆盖层组件 =====
export { default as NavBar } from './components/NavBar.vue'
export { default as TabBar } from './components/TabBar.vue'
export { default as BottomSheet } from './components/BottomSheet.vue'
export { default as ActionSheet } from './components/ActionSheet.vue'
export { default as GlobalChatBar } from './components/GlobalChatBar.vue'
export { default as PageShell } from './components/PageShell.vue'

// ===== 第 8 层：金融业务深组件 =====
export { default as QuoteHeader } from './components/QuoteHeader.vue'
export { default as Ticker } from './components/Ticker.vue'
export { default as AnnounceCard } from './components/AnnounceCard.vue'
export { default as DataFreshness } from './components/DataFreshness.vue'
export { default as Heatmap } from './components/Heatmap.vue'
export { default as FundFlow } from './components/FundFlow.vue'
export { default as Watchlist } from './components/Watchlist.vue'
export { default as RadarChart } from './components/RadarChart.vue'
export { default as RelationGraph } from './components/RelationGraph.vue'

// ===== 洞见标志组件（洞察之眼系统） =====
export { default as InsightTag } from './components/InsightTag.vue'
export { default as InsightCard } from './components/InsightCard.vue'

// ===== AI 交互组件 =====
export { default as StreamingText } from './components/StreamingText.vue'
export { default as ChatBubble } from './components/ChatBubble.vue'
export { default as AiEventReport } from './components/AiEventReport.vue'
export { default as AiGraph } from './components/AiGraph.vue'

// ===== 第 9 层：事件与洞察组件 =====
export { default as ImportanceStars } from './components/ImportanceStars.vue'
export { default as EventItemCard } from './components/EventItemCard.vue'
export { default as EventHeadlineCard } from './components/EventHeadlineCard.vue'
export { default as InsightListCard } from './components/InsightListCard.vue'
export { default as InsightAlertCard } from './components/InsightAlertCard.vue'
export { default as GuideCard } from './components/GuideCard.vue'

// ===== 第 10 层：音频与播客组件 =====
export { default as AudioPlayer } from './components/AudioPlayer.vue'
export { default as PodcastCard } from './components/PodcastCard.vue'
export { default as FloatingPodcast } from './components/FloatingPodcast.vue'

// ===== 第 11 层：高级行情组件 =====
export { default as StockChart } from './components/StockChart.vue'
export { default as TrendKlineCompare } from './components/TrendKlineCompare.vue'
export { default as TrendDimCard } from './components/TrendDimCard.vue'
export { default as StockDetailTable } from './components/StockDetailTable.vue'
export { default as StockCardList } from './components/StockCardList.vue'
export { default as StockIntelList } from './components/StockIntelList.vue'
export { default as WindLeaderPanel } from './components/WindLeaderPanel.vue'

// ===== 第 12 层：辅助组件 =====
export { default as LoginQrCode } from './components/LoginQrCode.vue'
export { default as Analytics } from './components/Analytics.vue'
export { default as CycleSelect } from './components/CycleSelect.vue'
export { default as NewsSlider } from './components/NewsSlider.vue'
export { default as HotBurstPanel } from './components/HotBurstPanel.vue'
export { default as MarketOverview } from './components/MarketOverview.vue'

// ===== 补充导出：main 分支已有的扩展组件 =====
export { default as DataTable } from './components/DataTable.vue'
export { default as SubPageCard2 } from './components/SubPageCard2.vue'
export { default as Footer } from './components/Footer.vue'
