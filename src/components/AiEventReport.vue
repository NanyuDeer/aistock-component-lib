<template>
  <view class="as-ai-event-report">
    <!-- Left color bar -->
    <view class="as-ai-event-report__bar" />

    <!-- Content -->
    <view class="as-ai-event-report__content">
      <!-- Header -->
      <view class="as-ai-event-report__header">
        <view class="as-ai-event-report__badge">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
          </svg>
          <text class="as-ai-event-report__badge-text">AI 分析</text>
        </view>
      </view>

      <!-- Title -->
      <text class="as-ai-event-report__title">{{ title }}</text>

      <!-- Summary -->
      <text class="as-ai-event-report__summary">{{ summary }}</text>

      <!-- Key points -->
      <view v-if="points.length > 0" class="as-ai-event-report__points">
        <view
          v-for="(point, index) in points"
          :key="index"
          class="as-ai-event-report__point"
        >
          <view
            class="as-ai-event-report__point-dot"
            :style="{ background: getPointColor(point.color) }"
          />
          <text class="as-ai-event-report__point-text">{{ point.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
export interface AiEventPoint {
  text: string
  color?: 'up' | 'down' | 'primary' | 'warning'
}

withDefaults(defineProps<{
  title: string
  summary: string
  points?: AiEventPoint[]
}>(), {
  points: () => []
})

function getPointColor(color?: 'up' | 'down' | 'primary' | 'warning'): string {
  const colorMap: Record<string, string> = {
    up: '#e54d5e',
    down: '#18a058',
    primary: '#0b5fff',
    warning: '#c89020'
  }
  return color ? colorMap[color] : colorMap.primary
}
</script>

<style lang="scss" scoped>
.as-ai-event-report {
  display: flex;
  background: $bg-card;
  border-radius: $r-md;
  box-shadow: $shadow-sm;
  overflow: hidden;
}

.as-ai-event-report__bar {
  width: 6rpx;
  background: $primary;
  flex-shrink: 0;
}

.as-ai-event-report__content {
  flex: 1;
  padding: $s-3;
  display: flex;
  flex-direction: column;
  gap: $s-2;
}

.as-ai-event-report__header {
  display: flex;
  align-items: center;
}

.as-ai-event-report__badge {
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  background: $primary-50;
  color: $primary;
  padding: 4rpx 12rpx;
  border-radius: $r-full;
  font-size: 20rpx;
  font-weight: 600;
  line-height: $lh-tight;
}

.as-ai-event-report__badge-text {
  font-size: inherit;
  color: inherit;
  font-weight: 600;
}

.as-ai-event-report__title {
  font-size: $font-size-base;
  font-weight: 700;
  color: $ink;
  line-height: $lh-tight;
}

.as-ai-event-report__summary {
  font-size: $font-size-xs;
  color: $ink-soft;
  line-height: $lh-base;
}

.as-ai-event-report__points {
  display: flex;
  flex-direction: column;
  gap: $s-1;
  margin-top: $s-1;
}

.as-ai-event-report__point {
  display: flex;
  align-items: flex-start;
  gap: $s-1;
}

.as-ai-event-report__point-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6rpx;
}

.as-ai-event-report__point-text {
  font-size: $font-size-xs;
  color: $ink;
  line-height: $lh-base;
  flex: 1;
}
</style>