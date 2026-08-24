<template>
  <view class="as-wind-leader-panel">
    <!-- Tab 切换 -->
    <view class="as-wind-leader-panel__tabs">
      <text
        v-for="tab in tabs"
        :key="tab"
        class="as-wind-leader-panel__tab"
        :class="{ 'is-active': tab === currentActiveTab }"
        @click="handleTabChange(tab)"
      >
        {{ tab }}
      </text>
    </view>

    <!-- 头部标题 -->
    <view class="as-wind-leader-panel__header">
      <text class="as-wind-leader-panel__title">{{ currentActiveTab }}龙头</text>
      <text class="as-wind-leader-panel__update">更新 14:30</text>
    </view>

    <!-- 泡泡图 -->
    <view class="as-wind-leader-panel__bubbles">
      <svg
        class="as-wind-leader-panel__svg"
        :viewBox="`0 0 280 260`"
      >
        <g
          v-for="(bubble, index) in bubbles"
          :key="index"
          :transform="`translate(${bubble.x}, ${bubble.y})`"
        >
          <circle
            :r="bubble.size"
            :fill="bubble.color"
            fill-opacity="0.88"
          />
          <text
            class="as-wind-leader-panel__bubble-label"
            y="-4"
            :fill="isDarkColor(bubble.color) ? '#fff' : '#1e3a5f'"
          >
            {{ bubble.label }}
          </text>
          <text
            v-if="bubble.sublabel"
            class="as-wind-leader-panel__bubble-sublabel"
            y="10"
            :fill="isDarkColor(bubble.color) ? 'rgba(255,255,255,0.8)' : '#1e3a5f'"
          >
            {{ bubble.sublabel }}
          </text>
        </g>
      </svg>

      <!-- 图例 -->
      <view class="as-wind-leader-panel__legend">
        <text class="as-wind-leader-panel__legend-hint">
          {{ isShortTerm ? '半径 = 热度' : '半径 = 持续天数' }}
        </text>
        <view class="as-wind-leader-panel__legend-colors">
          <view
            class="as-wind-leader-panel__legend-dot is-small"
            :style="{ background: isShortTerm ? '#fbe6b3' : '#dbeafe' }"
          ></view>
          <text class="as-wind-leader-panel__legend-label">{{ isShortTerm ? '低热度' : '低分' }}</text>
          <view
            class="as-wind-leader-panel__legend-dot is-mid"
            :style="{ background: isShortTerm ? '#e8c060' : '#60a5fa' }"
          ></view>
          <view
            class="as-wind-leader-panel__legend-dot is-large"
            :style="{ background: isShortTerm ? '#c89020' : '#2563eb' }"
          ></view>
          <view
            class="as-wind-leader-panel__legend-dot is-xl"
            :style="{ background: isShortTerm ? '#8a6411' : '#1e3a8a' }"
          ></view>
          <text class="as-wind-leader-panel__legend-label">{{ isShortTerm ? '高热度' : '高分' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface BubbleData {
  label: string
  sublabel?: string
  size: number
  color: string
  x: number
  y: number
}

const props = withDefaults(defineProps<{
  tabs: string[]
  activeTab: string
  bubbles: BubbleData[]
}>(), {
  tabs: () => ['长线风口', '短线风口'],
  activeTab: '长线风口',
  bubbles: () => []
})

const emit = defineEmits<{
  'tab-change': [tab: string]
}>()

const currentActiveTab = ref(props.activeTab)

const isShortTerm = computed(() => currentActiveTab.value === '短线风口')

function handleTabChange(tab: string) {
  currentActiveTab.value = tab
  emit('tab-change', tab)
}

function isDarkColor(color: string): boolean {
  const hex = color.replace('#', '')
  if (hex.length < 6) return false
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}
</script>

<style lang="scss" scoped>
.as-wind-leader-panel {
  background: $bg-card;
  border-radius: $r-lg;
  padding: $s-3;
}

/* ===== Tabs ===== */
.as-wind-leader-panel__tabs {
  display: flex;
  gap: $s-2;
  margin-bottom: $s-3;
}

.as-wind-leader-panel__tab {
  font-size: $font-size-xs;
  font-weight: 600;
  color: $ink-mute;
  padding: $s-1 $s-3;
  border-radius: $r-full;
  cursor: pointer;

  &.is-active {
    background: $brand-gradient;
    color: #fff;
    box-shadow: $shadow-primary;
  }
}

/* ===== Header ===== */
.as-wind-leader-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $s-2;
}

.as-wind-leader-panel__title {
  font-size: $font-size-sm;
  font-weight: 600;
  color: $ink;
}

.as-wind-leader-panel__update {
  font-size: $font-size-xs;
  color: $ink-mute;
}

/* ===== Bubbles ===== */
.as-wind-leader-panel__bubbles {
  display: flex;
  flex-direction: column;
}

.as-wind-leader-panel__svg {
  width: 100%;
  height: 520rpx;
  display: block;
}

.as-wind-leader-panel__bubble-label {
  text-anchor: middle;
  font-size: 10px;
  font-weight: 600;
}

.as-wind-leader-panel__bubble-sublabel {
  text-anchor: middle;
  font-size: 9px;
}

/* ===== Legend ===== */
.as-wind-leader-panel__legend {
  display: flex;
  align-items: center;
  gap: $s-2;
  margin-top: $s-1;
}

.as-wind-leader-panel__legend-hint {
  font-size: $font-size-xs;
  color: $ink-mute;
}

.as-wind-leader-panel__legend-colors {
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.as-wind-leader-panel__legend-dot {
  border-radius: 50%;

  &.is-small {
    width: 20rpx;
    height: 20rpx;
  }
  &.is-mid {
    width: 28rpx;
    height: 28rpx;
  }
  &.is-large {
    width: 36rpx;
    height: 36rpx;
  }
  &.is-xl {
    width: 44rpx;
    height: 44rpx;
  }
}

.as-wind-leader-panel__legend-label {
  font-size: $font-size-xs;
  color: $ink-mute;
}
</style>