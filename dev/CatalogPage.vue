<!--
  CatalogPage.vue — 组件目录预览页（dev 环境）
  轻量替代 Storybook：搜索 + 分类筛选 + 点击预览全部 41 个组件。
  通过 dev/main.ts 的 hash 路由访问：#/catalog
-->
<template>
  <view class="catalog">
    <!-- 顶部：标题 + 返回预览 -->
    <view class="catalog-header">
      <view class="catalog-header-info">
        <text class="catalog-title">组件目录</text>
        <text class="catalog-count">共 {{ componentList.length }} 个组件 · {{ filteredList.length }} 个匹配</text>
      </view>
      <text class="catalog-back" @click="goHome">返回预览</text>
    </view>

    <!-- 搜索框 -->
    <view class="catalog-search">
      <Input v-model="searchText" placeholder="搜索组件名或描述…" search-icon clearable />
    </view>

    <!-- 分类筛选 -->
    <scroll-view class="catalog-categories" scroll-x>
      <view
        v-for="cat in categories"
        :key="cat"
        class="catalog-category"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >
        <text class="catalog-category-text">{{ cat === 'all' ? '全部' : cat }}</text>
      </view>
    </scroll-view>

    <!-- 组件卡片网格 -->
    <view v-if="filteredList.length > 0" class="catalog-grid">
      <view
        v-for="item in filteredList"
        :key="item.name"
        class="catalog-card"
        @click="selectComponent(item)"
      >
        <view class="catalog-card-icon">
          <SvgIcon :name="categoryMeta[item.category].icon" size="40rpx" :color="categoryMeta[item.category].color" />
        </view>
        <text class="catalog-card-name">{{ item.name }}</text>
        <text class="catalog-card-desc">{{ item.description }}</text>
        <view class="catalog-card-tag" :class="'tag-' + categoryMeta[item.category].tagClass">
          <text class="catalog-card-tag-text">{{ item.category }}</text>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="catalog-empty">
      <Empty title="未找到匹配组件" description="换个关键词试试" />
    </view>

    <!-- 预览面板 -->
    <view v-if="selectedComponent" class="catalog-preview">
      <view class="catalog-preview-card">
        <view class="catalog-preview-header">
          <view class="catalog-preview-title-wrap">
            <text class="catalog-preview-title">{{ selectedComponent.name }}</text>
            <text class="catalog-preview-desc">{{ selectedComponent.description }} · {{ selectedComponent.category }}</text>
          </view>
          <text class="catalog-preview-close" @click="selectedComponent = null">关闭</text>
        </view>

        <view class="catalog-preview-body">
          <!-- SvgIcon 特殊：展示图标集 -->
          <view v-if="selectedComponent.name === 'SvgIcon'" class="catalog-frame is-static">
            <view class="catalog-icon-grid">
              <view v-for="ic in iconShowcase" :key="ic.name" class="catalog-icon-item">
                <SvgIcon :name="ic.name" size="48rpx" :color="ic.color" />
                <text class="catalog-icon-name">{{ ic.name }}</text>
              </view>
            </view>
          </view>

          <!-- 普通组件 / 覆盖层组件：在 frame 内渲染 -->
          <view
            v-else
            class="catalog-frame"
            :class="selectedComponent.frame ? 'is-framed' : 'is-static'"
          >
            <component
              :is="selectedComponent.component"
              v-bind="selectedComponent.props ?? {}"
            >{{ selectedComponent.slotContent }}</component>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef, type Component } from 'vue'

// 组件库本体（41 个）
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import Tag from '@/components/Tag.vue'
import Badge from '@/components/Badge.vue'
import Input from '@/components/Input.vue'
import Switch from '@/components/Switch.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import Avatar from '@/components/Avatar.vue'
import Segmented from '@/components/Segmented.vue'
import Rate from '@/components/Rate.vue'
import Empty from '@/components/Empty.vue'
import Progress from '@/components/Progress.vue'
import Skeleton from '@/components/Skeleton.vue'
import LoadingState from '@/components/LoadingState.vue'
import Toast from '@/components/Toast.vue'
import BottomSheet from '@/components/BottomSheet.vue'
import ActionSheet from '@/components/ActionSheet.vue'
import Modal from '@/components/Modal.vue'
import Collapse from '@/components/Collapse.vue'
import StockItem from '@/components/StockItem.vue'
import StatCard from '@/components/StatCard.vue'
import ListCell from '@/components/ListCell.vue'
import PageCard from '@/components/PageCard.vue'
import SubPageCard from '@/components/SubPageCard.vue'
import QuoteHeader from '@/components/QuoteHeader.vue'
import DataTable from '@/components/DataTable.vue'
import IndexCard from '@/components/IndexCard.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import TabBar from '@/components/TabBar.vue'
import GlobalChatBar from '@/components/GlobalChatBar.vue'
import SubPageCard2 from '@/components/SubPageCard2.vue'
import Steps from '@/components/Steps.vue'
import RadarChart from '@/components/RadarChart.vue'
import RelationGraph from '@/components/RelationGraph.vue'
import Sparkline from '@/components/Sparkline.vue'
import Gauge from '@/components/Gauge.vue'
import Timeline from '@/components/Timeline.vue'
import ChatBubble from '@/components/ChatBubble.vue'
import StreamingText from '@/components/StreamingText.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'

interface CatalogItem {
  name: string
  description: string
  category: string
  component: Component
  props?: Record<string, unknown>
  slotContent?: string
  /** 需要在固定高度 frame 内渲染（覆盖层组件 + fixed 定位组件） */
  frame?: boolean
}

/** 分类元信息：图标 / 颜色 / 标签样式 */
const categoryMeta: Record<string, { icon: string; color: string; tagClass: string }> = {
  基础: { icon: 'plus', color: '#0b5fff', tagClass: 'basic' },
  反馈: { icon: 'bell-line', color: '#f0a020', tagClass: 'feedback' },
  业务: { icon: 'trending-up-line', color: '#e54d5e', tagClass: 'business' },
  布局: { icon: 'home-line', color: '#00b8ff', tagClass: 'layout' },
  图表: { icon: 'chart-line', color: '#18a058', tagClass: 'chart' },
  AI: { icon: 'star-line', color: '#d4a843', tagClass: 'ai' }
}

const searchText = ref('')
const activeCategory = ref<string>('all')
const selectedComponent = shallowRef<CatalogItem | null>(null)

const componentList: CatalogItem[] = [
  // ===== 基础 =====
  { name: 'Button', description: '按钮', category: '基础', component: Button, props: { type: 'primary' }, slotContent: '按钮' },
  { name: 'Card', description: '卡片', category: '基础', component: Card, props: { title: '卡片标题', subtitle: '副标题' }, slotContent: '卡片内容区域' },
  { name: 'Tag', description: '标签', category: '基础', component: Tag, props: { type: 'up' }, slotContent: '标签' },
  { name: 'Badge', description: '徽章', category: '基础', component: Badge, props: { type: 'primary' }, slotContent: '新' },
  { name: 'Avatar', description: '头像', category: '基础', component: Avatar, props: { text: '晓', size: 'md', variant: 'primary' } },
  { name: 'Input', description: '输入框', category: '基础', component: Input, props: { placeholder: '请输入…', searchIcon: true, clearable: true } },
  { name: 'Switch', description: '开关', category: '基础', component: Switch, props: { modelValue: true } },
  { name: 'Rate', description: '星级评分', category: '基础', component: Rate, props: { modelValue: 4, type: 'gold', showText: true } },
  { name: 'Segmented', description: '分段控制器', category: '基础', component: Segmented, props: { items: [{ label: '分时', value: '1min' }, { label: '日K', value: '1day' }, { label: '周K', value: '1week' }], modelValue: '1day' } },
  { name: 'Progress', description: '进度条', category: '基础', component: Progress, props: { value: 68, label: '数据同步进度', status: 'primary' } },
  { name: 'Steps', description: '步骤条', category: '基础', component: Steps, props: { steps: [{ title: '选择股票' }, { title: 'AI 分析' }, { title: '生成报告' }], current: 1 } },
  { name: 'Skeleton', description: '骨架屏', category: '基础', component: Skeleton, props: { variant: 'block' } },
  { name: 'Collapse', description: '折叠面板', category: '基础', component: Collapse, props: { items: [{ key: 'p1', title: '基本面分析' }, { key: 'p2', title: '技术面分析' }] } },
  { name: 'SvgIcon', description: 'SVG 图标', category: '基础', component: SvgIcon },

  // ===== 反馈 =====
  { name: 'Empty', description: '空状态', category: '反馈', component: Empty, props: { title: '暂无数据', description: '暂时没有相关内容' } },
  { name: 'LoadingState', description: '加载状态', category: '反馈', component: LoadingState, props: { text: '加载中…' } },
  { name: 'Toast', description: '轻提示', category: '反馈', component: Toast, frame: true, props: { visible: true, message: '操作成功', type: 'success', position: 'center' } },
  { name: 'Modal', description: '模态框', category: '反馈', component: Modal, frame: true, props: { visible: true, title: '确认操作' }, slotContent: '确定要将贵州茅台加入自选股吗？' },
  { name: 'ActionSheet', description: '操作菜单', category: '反馈', component: ActionSheet, frame: true, props: { visible: true, items: [{ label: '加入自选', value: 'fav' }, { label: '设置提醒', value: 'alert' }, { label: '删除', value: 'del', danger: true }] } },
  { name: 'BottomSheet', description: '底部弹窗', category: '反馈', component: BottomSheet, frame: true, props: { visible: true, title: '筛选条件' }, slotContent: '这里是 BottomSheet 的内容区域' },

  // ===== 业务 =====
  { name: 'StockItem', description: '股票项', category: '业务', component: StockItem, props: { name: '贵州茅台', code: '600519.SH', price: 1689.5, change: 12.3, changePercent: 0.73 } },
  { name: 'StatCard', description: '统计卡片', category: '业务', component: StatCard, props: { label: '总资产', value: '1,234,567', trend: '+12.3%', trendType: 'up', valueType: 'gold' } },
  { name: 'ListCell', description: '列表单元格', category: '业务', component: ListCell, props: { title: '账户安全', value: '已认证', showArrow: true } },
  { name: 'QuoteHeader', description: '行情头部', category: '业务', component: QuoteHeader, props: { name: '贵州茅台', code: '600519.SH', market: 'SH', price: 1689.5, change: 12.3, changePercent: 0.73, status: '交易中', metrics: [{ label: '成交量', value: '2.3万手', trend: 'up' }, { label: '成交额', value: '4.56亿', trend: 'up' }, { label: '换手率', value: '0.89%' }, { label: '市盈率', value: '32.5' }] } },
  { name: 'DataTable', description: '数据表格', category: '业务', component: DataTable, props: { title: '贵州茅台 600519.SH', columns: 3, data: [{ label: '总市值', value: 21210, unit: '亿', formatter: 'raw' }, { label: '市盈率', value: 32.5, formatter: 'price' }, { label: '市净率', value: 8.7, formatter: 'price' }, { label: '成交量', value: 23000, formatter: 'volume' }, { label: '成交额', value: 456000000, formatter: 'amount' }, { label: '换手率', value: 0.89, formatter: 'percent', trend: true }] } },
  { name: 'IndexCard', description: '大盘指数', category: '业务', component: IndexCard, props: { title: '大盘概览', status: '交易中', indices: [{ name: '上证指数', code: '000001', price: 3128.42, changePercent: 0.73 }, { name: '深证成指', code: '399001', price: 9847.15, changePercent: -0.32 }, { name: '创业板指', code: '399006', price: 1923.67, changePercent: 1.25 }] } },

  // ===== 布局 =====
  { name: 'PageCard', description: '页面卡片', category: '布局', component: PageCard, props: { title: '主页面卡片', subtitle: '带标题栏的页面容器' }, slotContent: 'PageCard 内容区域' },
  { name: 'SubPageCard', description: '子页面卡片', category: '布局', component: SubPageCard, props: { title: '子页面卡片', showBack: false }, slotContent: 'SubPageCard 内容区域' },
  { name: 'SubPageCard2', description: '白色导航子页面', category: '布局', component: SubPageCard2, frame: true, props: { title: '个股详情', subtitle: '600519.SH', showBack: false }, slotContent: 'SubPageCard2 内容区域' },
  { name: 'NavBar', description: '导航栏', category: '布局', component: NavBar, props: { title: '趋势股评分', subtitle: '2026-07-29', showBack: true } },
  { name: 'Footer', description: '页脚', category: '布局', component: Footer },
  { name: 'TabBar', description: '标签栏', category: '布局', component: TabBar, frame: true, props: { activeTab: 'home', tabs: [{ id: 'home', name: '首页', icon: 'home-line' }, { id: 'market', name: '行情', icon: 'chart-line', badge: 'dot' }, { id: 'trade', name: '交易', icon: 'trade-line', badge: '3' }, { id: 'mine', name: '我的', icon: 'user-line' }] } },
  { name: 'GlobalChatBar', description: '对话栏', category: '布局', component: GlobalChatBar, frame: true, props: { placeholder: '问点什么…', showBack: false } },

  // ===== 图表 =====
  { name: 'RadarChart', description: '雷达图', category: '图表', component: RadarChart, props: { title: '多维度评分', score: 78.4, dimensions: [{ label: '成长性', score: 82 }, { label: '盈利能力', score: 75 }, { label: '偿债能力', score: 68 }, { label: '运营效率', score: 90 }, { label: '现金流', score: 60 }] } },
  { name: 'Sparkline', description: '迷你走势图', category: '图表', component: Sparkline, props: { data: [10, 12, 11, 14, 13, 16, 15, 18, 17, 21] } },
  { name: 'Gauge', description: '仪表盘', category: '图表', component: Gauge, props: { value: 75, label: '评分', size: 'md' } },
  { name: 'RelationGraph', description: '关系图谱', category: '图表', component: RelationGraph, props: { title: '产业链关联', nodes: [{ id: 'main', label: '宁德时代', type: 'main' }, { id: 'u1', label: '锂矿', type: 'upstream' }, { id: 'u2', label: '正极材料', type: 'upstream' }, { id: 'd1', label: '新能源车', type: 'downstream' }, { id: 'd2', label: '储能', type: 'downstream' }, { id: 'r1', label: '锂电池', type: 'related' }] } },
  { name: 'Timeline', description: '时间线', category: '图表', component: Timeline, props: { items: [{ time: '2024-Q1', title: '新能源车补贴延续', description: '国务院发布延续新能源车补贴政策', type: 'up', extra: '+3.2%' }, { time: '2024-Q2', title: '芯片供应紧张加剧', description: '全球芯片短缺影响汽车产能', type: 'down', extra: '-1.8%' }, { time: '2024-Q3', title: '行业规范调整', description: '新规出台，市场观望情绪浓厚', type: 'neutral', extra: '+0.1%' }] } },

  // ===== AI =====
  { name: 'ChatBubble', description: '聊天气泡', category: 'AI', component: ChatBubble, props: { role: 'assistant', content: '贵州茅台近期走势分析：资金面持续流入，技术面多头排列，建议关注 1700 元支撑位。' } },
  { name: 'StreamingText', description: '流式文字', category: 'AI', component: StreamingText, props: { text: 'AI 正在分析市场趋势，建议关注 1700 元支撑位。', speed: 50 } },
  { name: 'AudioPlayer', description: '音频播放', category: 'AI', component: AudioPlayer, props: { title: '早点听 · 市场早报', src: '' } }
]

/** SvgIcon 预览：展示可用图标集 */
const iconShowcase = [
  { name: 'bell-line', color: '#0b5fff' },
  { name: 'star-line', color: '#d4a843' },
  { name: 'trending-up-line', color: '#e54d5e' },
  { name: 'trending-down-line', color: '#18a058' },
  { name: 'home-line', color: '#00b8ff' },
  { name: 'chart-line', color: '#0b5fff' },
  { name: 'trade-line', color: '#0b5fff' },
  { name: 'user-line', color: '#0b5fff' },
  { name: 'settings', color: '#4b5a7a' },
  { name: 'search', color: '#4b5a7a' },
  { name: 'check', color: '#18a058' },
  { name: 'close', color: '#e54d5e' }
]

const categories = computed<string[]>(() => {
  const ordered = ['基础', '反馈', '业务', '布局', '图表', 'AI']
  const present = new Set(componentList.map(i => i.category))
  return ['all', ...ordered.filter(c => present.has(c))]
})

const filteredList = computed(() => {
  let list = componentList
  if (activeCategory.value !== 'all') {
    list = list.filter(i => i.category === activeCategory.value)
  }
  const q = searchText.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    )
  }
  return list
})

function selectComponent(item: CatalogItem) {
  selectedComponent.value = item
}

function goHome() {
  window.location.hash = '#/'
}
</script>

<style lang="scss" scoped>
.catalog {
  padding: $s-6 $s-4;
}

/* ===== 顶部 ===== */
.catalog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $s-4;
}

.catalog-header-info {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.catalog-title {
  font-size: $font-size-2xl;
  font-weight: 700;
  color: $ink;
}

.catalog-count {
  font-size: $font-size-xs;
  color: $ink-mute;
}

.catalog-back {
  font-size: $font-size-sm;
  color: $primary;
  padding: $s-1 $s-3;
  border: 2rpx solid $primary-100;
  border-radius: $r-full;
}

/* ===== 搜索 ===== */
.catalog-search {
  margin-bottom: $s-3;
}

/* ===== 分类筛选 ===== */
.catalog-categories {
  display: flex;
  white-space: nowrap;
  gap: $s-2;
  margin-bottom: $s-5;
}

.catalog-category {
  display: inline-flex;
  align-items: center;
  padding: $s-1 $s-3;
  border-radius: $r-full;
  background: $bg-card;
  border: 2rpx solid $line;
  flex-shrink: 0;
}

.catalog-category.active {
  background: $primary;
  border-color: $primary;
}

.catalog-category-text {
  font-size: $font-size-sm;
  color: $ink-soft;
}

.catalog-category.active .catalog-category-text {
  color: $white;
  font-weight: 600;
}

/* ===== 卡片网格 ===== */
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $s-3;
}

.catalog-card {
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-lg;
  padding: $s-3 $s-2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rpx;
  cursor: pointer;
  transition: all $t-base;

  &:hover {
    border-color: $primary;
    box-shadow: $shadow-sm;
    transform: translateY(-2rpx);
  }
}

.catalog-card-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: $r-md;
  background: $primary-50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: $s-1;
}

.catalog-card-name {
  font-size: $font-size-sm;
  font-weight: 600;
  color: $ink;
}

.catalog-card-desc {
  font-size: $font-size-xs;
  color: $ink-mute;
}

.catalog-card-tag {
  margin-top: 4rpx;
  padding: 2rpx 12rpx;
  border-radius: $r-full;

  &.tag-basic { background: $primary-50; }
  &.tag-feedback { background: $warning-soft; }
  &.tag-business { background: $up-soft; }
  &.tag-layout { background: $accent-50; }
  &.tag-chart { background: $down-soft; }
  &.tag-ai { background: $gold-soft; }
}

.catalog-card-tag-text {
  font-size: 20rpx;
  color: $ink-soft;
}

/* ===== 空状态 ===== */
.catalog-empty {
  padding: $s-10 0;
}

/* ===== 预览面板 ===== */
.catalog-preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $overlay-base;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-modal;
  padding: $s-4;
}

.catalog-preview-card {
  background: $bg-card;
  border-radius: $r-xl;
  width: 100%;
  max-width: 690rpx;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: $shadow-hover;
}

.catalog-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-4 $s-5;
  border-bottom: 2rpx solid $line-soft;
  flex-shrink: 0;
}

.catalog-preview-title-wrap {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
}

.catalog-preview-title {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $ink;
}

.catalog-preview-desc {
  font-size: $font-size-xs;
  color: $ink-mute;
}

.catalog-preview-close {
  font-size: $font-size-sm;
  color: $primary;
  padding: $s-1 $s-3;
  border: 2rpx solid $primary-100;
  border-radius: $r-full;
  cursor: pointer;
  flex-shrink: 0;
}

.catalog-preview-body {
  padding: $s-4 $s-5;
  overflow: auto;
  flex: 1;
  min-height: 0;
}

/* ===== 预览 frame：容器化覆盖层 / fixed 定位组件 ===== */
.catalog-frame {
  position: relative;
  background: $bg-page;
  border-radius: $r-lg;
  border: 2rpx solid $line;

  &.is-static {
    min-height: 240rpx;
    padding: $s-4;
  }

  &.is-framed {
    height: 500rpx;
    overflow: hidden;
  }

  /* 把覆盖层组件 / fixed 定位组件约束在 frame 内（absolute 相对 frame） */
  :deep(.as-modal),
  :deep(.as-modal__overlay),
  :deep(.as-modal__wrap),
  :deep(.as-toast),
  :deep(.as-action-sheet),
  :deep(.as-action-sheet__overlay),
  :deep(.as-action-sheet__panel),
  :deep(.as-bottom-sheet),
  :deep(.as-bottom-sheet__overlay),
  :deep(.as-bottom-sheet__panel),
  :deep(.as-tab-bar),
  :deep(.as-global-chat-bar),
  :deep(.as-sub-page-card-2) {
    position: absolute;
  }
}

/* ===== SvgIcon 图标集 ===== */
.catalog-icon-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $s-3;
}

.catalog-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $s-1;
}

.catalog-icon-name {
  font-size: $font-size-xs;
  color: $ink-mute;
}
</style>
