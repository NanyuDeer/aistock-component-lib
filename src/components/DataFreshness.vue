<template>
  <view class="as-data-freshness" :class="`is-${status}`">
    <view class="as-data-freshness__dot" :class="`is-${status}`" />
    <text class="as-data-freshness__label">{{ displayLabel }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type FreshnessStatus = 'realtime' | 'delay' | 'closed'

const props = withDefaults(defineProps<{
  status?: FreshnessStatus
  label?: string
  delay?: string
}>(), {
  status: 'realtime',
  label: '',
  delay: ''
})

const displayLabel = computed(() => {
  if (props.label) return props.label

  switch (props.status) {
    case 'realtime':
      return '实时'
    case 'delay':
      return props.delay ? `延迟 ${props.delay}` : '延迟'
    case 'closed':
      return '已收盘'
    default:
      return '实时'
  }
})
</script>

<style lang="scss" scoped>
.as-data-freshness {
  display: inline-flex;
  align-items: center;
  gap: $s-1;
  padding: 2rpx 14rpx;
  border-radius: $r-full;
  font-size: 20rpx;
  font-weight: 600;
  line-height: 1.5;
}

/* ===== Realtime ===== */
.as-data-freshness.is-realtime {
  background: $down-soft;
  color: $down;
}

.as-data-freshness__dot.is-realtime {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: $down;
  animation: as-freshness-pulse 1.5s ease-in-out infinite;
}

@keyframes as-freshness-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

/* ===== Delay ===== */
.as-data-freshness.is-delay {
  background: $warning-soft;
  color: $warning;
}

.as-data-freshness__dot.is-delay {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: $warning;
}

/* ===== Closed ===== */
.as-data-freshness.is-closed {
  background: $bg-deep;
  color: $ink-mute;
}

.as-data-freshness__dot.is-closed {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: $ink-mute;
}

/* ===== Default dot style ===== */
.as-data-freshness__dot {
  flex-shrink: 0;
}
</style>