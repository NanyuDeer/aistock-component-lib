<template>
  <view class="as-market-ov">
    <view class="as-market-ov__header">
      <text class="as-market-ov__title">大盘概览</text>
      <view class="as-market-ov__status">
        <view class="as-market-ov__dot" />
        <text class="as-market-ov__status-text">{{ status }}</text>
        <text class="as-market-ov__separator">·</text>
        <text class="as-market-ov__refresh">{{ refreshText }}</text>
      </view>
    </view>
    <view class="as-market-ov__grid">
      <view
        v-for="(index, i) in indices"
        :key="i"
        class="as-market-ov__card"
        :class="getTrendClass(index)"
      >
        <view class="as-market-ov__card-bar" :class="getTrendClass(index)" />
        <view class="as-market-ov__card-body">
          <view class="as-market-ov__card-top">
            <text class="as-market-ov__card-name">{{ index.name }}</text>
            <text class="as-market-ov__card-code">{{ index.code }}</text>
          </view>
          <text class="as-market-ov__card-price" :class="getTrendClass(index)">
            {{ formatPrice(index.price) }}
          </text>
          <view class="as-market-ov__card-change-row">
            <text class="as-market-ov__card-change-amt" :class="getTrendClass(index)">
              {{ formatChange(index.changeAmt) }}
            </text>
            <text class="as-market-ov__card-change-pct" :class="getTrendClass(index)">
              {{ formatPct(index.changePct) }}
            </text>
          </view>
          <view class="as-market-ov__card-sparkline">
            <svg
              viewBox="0 0 100 28"
              preserveAspectRatio="none"
              class="as-market-ov__sparkline"
            >
              <defs>
                <linearGradient
                  :id="`spark-grad-${i}`"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    :stop-color="getTrendColor(index)"
                    stop-opacity="0.25"
                  />
                  <stop
                    offset="100%"
                    :stop-color="getTrendColor(index)"
                    stop-opacity="0"
                  />
                </linearGradient>
              </defs>
              <polyline
                :points="index.sparkline"
                fill="none"
                :stroke="getTrendColor(index)"
                stroke-width="1.2"
              />
              <polygon
                :points="`${index.sparkline} 100,28 0,28`"
                :fill="`url(#spark-grad-${i})`"
              />
            </svg>
          </view>
          <view class="as-market-ov__card-vol">
            <text class="as-market-ov__card-vol-label">成交额</text>
            <text class="as-market-ov__card-vol-value">{{ index.volume }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type IndexTrend = 'up' | 'down'

withDefaults(defineProps<{
  status?: string
  refreshText?: string
  indices?: Array<{
    name: string
    code: string
    price: number
    changeAmt: number
    changePct: number
    volume: string
    sparkline: string
  }>
}>(), {
  status: '实时',
  refreshText: '60s 刷新',
  indices: () => []
})

function getTrend(item: { changeAmt: number }): IndexTrend {
  return item.changeAmt >= 0 ? 'up' : 'down'
}

function getTrendClass(item: { changeAmt: number }): string {
  return `is-${getTrend(item)}`
}

function getTrendColor(item: { changeAmt: number }): string {
  return getTrend(item) === 'up' ? '#e54d5e' : '#18a058'
}

function formatPrice(price: number): string {
  return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatChange(amt: number): string {
  const sign = amt > 0 ? '+' : ''
  return `${sign}${amt.toFixed(2)}`
}

function formatPct(pct: number): string {
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(2)}%`
}
</script>

<style lang="scss" scoped>
.as-market-ov {
  background: $bg-card;
  border-radius: $r-lg;
  box-shadow: $shadow-card;
  padding: $s-4;
}

/* ===== Header ===== */
.as-market-ov__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $s-4;
}

.as-market-ov__title {
  font-size: $font-size-base;
  color: $ink;
  font-weight: 600;
}

.as-market-ov__status {
  display: flex;
  align-items: center;
  gap: $s-1;
}

.as-market-ov__dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: $r-full;
  background: $down;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.as-market-ov__status-text,
.as-market-ov__separator,
.as-market-ov__refresh {
  font-size: $font-size-xs;
  color: $ink-mute;
}

/* ===== Grid ===== */
.as-market-ov__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $s-3;
}

/* ===== Card ===== */
.as-market-ov__card {
  display: flex;
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-lg;
  overflow: hidden;
}

.as-market-ov__card-bar {
  width: 6rpx;
  flex-shrink: 0;

  &.is-up {
    background: $up;
  }

  &.is-down {
    background: $down;
  }
}

.as-market-ov__card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $s-1;
  padding: $s-3;
}

.as-market-ov__card-top {
  display: flex;
  align-items: center;
  gap: $s-1;
}

.as-market-ov__card-name {
  font-size: $font-size-sm;
  color: $ink-soft;
  font-weight: 600;
}

.as-market-ov__card-code {
  font-size: $font-size-xs;
  color: $ink-mute;
  font-family: $font-mono;
}

.as-market-ov__card-price {
  font-size: $font-size-xl;
  font-weight: 800;
  font-family: $font-mono;
  line-height: $lh-tight;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
}

.as-market-ov__card-change-row {
  display: flex;
  align-items: center;
  gap: $s-1;
}

.as-market-ov__card-change-amt {
  font-size: $font-size-sm;
  font-weight: 600;
  font-family: $font-mono;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
}

.as-market-ov__card-change-pct {
  font-size: $font-size-xs;
  font-weight: 700;
  font-family: $font-mono;
  padding: 2rpx 12rpx;
  border-radius: $r-xs;

  &.is-up {
    color: $up;
    background: $up-bg;
  }

  &.is-down {
    color: $down;
    background: $down-bg;
  }
}

.as-market-ov__card-sparkline {
  width: 100%;
  height: 56rpx;
  margin-top: $s-1;
}

.as-market-ov__sparkline {
  width: 100%;
  height: 100%;
}

.as-market-ov__card-vol {
  display: flex;
  align-items: center;
  gap: $s-1;
}

.as-market-ov__card-vol-label {
  font-size: $font-size-xs;
  color: $ink-mute;
}

.as-market-ov__card-vol-value {
  font-size: $font-size-xs;
  color: $ink-soft;
  font-family: $font-mono;
}
</style>