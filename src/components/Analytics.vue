<template>
  <view class="as-analytics">
    <view class="as-analytics__header">
      <text class="as-analytics__title">{{ title }}</text>
      <text class="as-analytics__period">{{ period }}</text>
    </view>
    <view class="as-analytics__grid">
      <view
        v-for="(item, i) in items"
        :key="i"
        class="as-analytics__item"
      >
        <text class="as-analytics__label">{{ item.label }}</text>
        <text class="as-analytics__value">{{ item.value }}</text>
        <view
          v-if="item.trend !== undefined"
          class="as-analytics__trend"
          :class="item.trendDirection === 'down' ? 'is-down' : 'is-up'"
        >
          <text class="as-analytics__trend-icon">{{ item.trendDirection === 'down' ? '↓' : '↑' }}</text>
          <text class="as-analytics__trend-text">{{ item.trend }}%</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  period?: string
  items?: Array<{
    label: string
    value: string | number
    trend?: number
    trendDirection?: 'up' | 'down'
  }>
}>(), {
  title: '使用分析',
  period: '近7天',
  items: () => []
})
</script>

<style lang="scss" scoped>
.as-analytics {
  background: $bg-card;
  border-radius: $r-lg;
  box-shadow: $shadow-card;
  padding: $s-4;
}

.as-analytics__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $s-4;
}

.as-analytics__title {
  font-size: $font-size-base;
  color: $ink;
  font-weight: 600;
}

.as-analytics__period {
  font-size: $font-size-xs;
  color: $ink-mute;
}

.as-analytics__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $s-3;
}

.as-analytics__item {
  display: flex;
  flex-direction: column;
  gap: $s-1;
}

.as-analytics__label {
  font-size: $font-size-xs;
  color: $ink-mute;
}

.as-analytics__value {
  font-size: $font-size-2xl;
  color: $ink;
  font-weight: 800;
  font-family: $font-mono;
  line-height: $lh-tight;
}

.as-analytics__trend {
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  font-size: $font-size-xs;
  font-weight: 600;
  font-family: $font-mono;

  &.is-up {
    color: $up;
  }

  &.is-down {
    color: $down;
  }
}

.as-analytics__trend-icon {
  font-size: inherit;
}

.as-analytics__trend-text {
  font-size: inherit;
}
</style>