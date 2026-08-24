<template>
  <view class="as-trend-dim-card">
    <!-- 头部：标题 + 分数 -->
    <view class="as-trend-dim-card__header">
      <text class="as-trend-dim-card__title">{{ title }}</text>
      <text class="as-trend-dim-card__score" :class="scoreClass">{{ score }}</text>
    </view>

    <!-- 进度条 -->
    <view class="as-trend-dim-card__bar">
      <view class="as-trend-dim-card__bar-fill" :style="barStyle"></view>
    </view>

    <!-- 描述 -->
    <text class="as-trend-dim-card__desc">{{ desc }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  score: number
  desc: string
}>(), {
  title: '',
  score: 0,
  desc: ''
})

const scoreClass = computed(() => {
  if (props.score > 70) return 'is-high'
  if (props.score >= 40) return 'is-mid'
  return 'is-low'
})

const barStyle = computed(() => {
  const pct = Math.max(0, Math.min(100, props.score))
  let color = 'var(--warning)'
  if (props.score > 70) color = 'var(--up)'
  else if (props.score >= 40) color = 'var(--primary)'
  return {
    width: `${pct}%`,
    background: color
  }
})
</script>

<style lang="scss" scoped>
.as-trend-dim-card {
  background: $bg-card;
  border-radius: $r-md;
  padding: $s-3;
}

/* ===== Header ===== */
.as-trend-dim-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $s-2;
}

.as-trend-dim-card__title {
  font-size: $font-size-sm;
  font-weight: 600;
  color: $ink;
}

.as-trend-dim-card__score {
  font-size: $font-size-lg;
  font-weight: 700;
  font-family: monospace;

  &.is-high { color: $up; }
  &.is-mid { color: $primary; }
  &.is-low { color: $warning; }
}

/* ===== Bar ===== */
.as-trend-dim-card__bar {
  height: 8rpx;
  background: $line-soft;
  border-radius: $r-full;
  margin-bottom: $s-2;
  overflow: hidden;
}

.as-trend-dim-card__bar-fill {
  height: 100%;
  border-radius: $r-full;
  transition: width $t-base;
}

/* ===== Desc ===== */
.as-trend-dim-card__desc {
  font-size: $font-size-xs;
  color: $ink-soft;
  line-height: 1.5;
}
</style>