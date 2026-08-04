<template>
  <view class="as-index-card" :class="`is-${trend}`">
    <view class="as-index-card__header">
      <text class="as-index-card__name">{{ name }}</text>
      <text class="as-index-card__code">{{ code }}</text>
    </view>
    <text class="as-index-card__value">{{ formattedValue }}</text>
    <view class="as-index-card__footer">
      <text class="as-index-card__change">{{ formattedChange }}</text>
      <text class="as-index-card__percent">{{ formattedPercent }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type IndexTrend = 'up' | 'down' | 'flat'

const props = withDefaults(defineProps<{
  name: string
  code: string
  value: number
  change: number
  changePercent: number
  trend?: IndexTrend
}>(), {
  trend: 'flat'
})

const formattedValue = computed(() => props.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))

const formattedChange = computed(() => {
  const sign = props.change > 0 ? '+' : ''
  return `${sign}${props.change.toFixed(2)}`
})

const formattedPercent = computed(() => {
  const sign = props.changePercent > 0 ? '+' : ''
  return `${sign}${props.changePercent.toFixed(2)}%`
})
</script>

<style lang="scss" scoped>
.as-index-card {
  display: flex;
  flex-direction: column;
  gap: $s-2;
  padding: $s-4 $s-5;
  background: $bg-card;
  border-radius: $r-xl;
  border: 2rpx solid $line;
}

.as-index-card.is-up .as-index-card__value,
.as-index-card.is-up .as-index-card__change,
.as-index-card.is-up .as-index-card__percent {
  color: $up;
}

.as-index-card.is-down .as-index-card__value,
.as-index-card.is-down .as-index-card__change,
.as-index-card.is-down .as-index-card__percent {
  color: $down;
}

.as-index-card.is-flat .as-index-card__value,
.as-index-card.is-flat .as-index-card__change,
.as-index-card.is-flat .as-index-card__percent {
  color: $flat;
}

.as-index-card__header {
  display: flex;
  align-items: center;
  gap: $s-2;
}

.as-index-card__name {
  font-size: $font-size-sm;
  color: $ink-soft;
  font-weight: 500;
}

.as-index-card__code {
  font-size: $font-size-xs;
  color: $ink-mute;
  font-family: $font-mono;
}

.as-index-card__value {
  font-size: $font-size-2xl;
  font-weight: 800;
  font-family: $font-mono;
  line-height: $lh-tight;
}

.as-index-card__footer {
  display: flex;
  align-items: center;
  gap: $s-2;
}

.as-index-card__change {
  font-size: $font-size-sm;
  font-weight: 600;
  font-family: $font-mono;
}

.as-index-card__percent {
  font-size: $font-size-xs;
  font-weight: 600;
  font-family: $font-mono;
  padding: 2rpx 12rpx;
  border-radius: $r-xs;
  background: $bg-deep;
}
</style>