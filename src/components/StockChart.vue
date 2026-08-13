<template>
  <view class="as-stock-chart">
    <!-- 头部：股票名+代码（左）+ 价格+涨跌（右） -->
    <view class="as-stock-chart__header">
      <view class="as-stock-chart__info">
        <text class="as-stock-chart__name">{{ name }} {{ code }}</text>
        <text class="as-stock-chart__sub">{{ currentPeriod }} . 前复权</text>
      </view>
      <view class="as-stock-chart__quote" :class="priceTrend">
        <text class="as-stock-chart__price">{{ formattedPrice }}</text>
        <text class="as-stock-chart__change">{{ formattedChange }}</text>
      </view>
    </view>

    <!-- 周期选择 -->
    <view class="as-stock-chart__periods">
      <text
        v-for="period in periods"
        :key="period"
        class="as-stock-chart__period"
        :class="{ 'is-active': period === currentPeriod }"
        @click="handlePeriodChange(period)"
      >
        {{ period }}
      </text>
    </view>

    <!-- 均线图例 -->
    <view v-if="maLines && maLines.length > 0" class="as-stock-chart__ma-legend">
      <view
        v-for="(ma, index) in maLines"
        :key="index"
        class="as-stock-chart__ma-item"
      >
        <view class="as-stock-chart__ma-dot" :style="{ background: ma.color }"></view>
        <text class="as-stock-chart__ma-label">{{ ma.name }} {{ ma.data[ma.data.length - 1]?.toFixed(1) || '--' }}</text>
      </view>
    </view>

    <!-- K线区域 + 均线叠加 -->
    <view class="as-stock-chart__candle-row">
      <view
        v-for="(candle, index) in candles"
        :key="index"
        class="as-stock-chart__candle"
        :class="candle.isUp ? 'is-up' : 'is-down'"
        :style="getCandleStyle(index)"
      >
        <view
          class="as-stock-chart__candle-wick"
          :style="{ height: `${getWickHeight(candle)}%` }"
        ></view>
        <view
          class="as-stock-chart__candle-body"
          :style="{ height: `${getBodyHeight(candle)}%` }"
        ></view>
      </view>

      <!-- 均线 SVG 叠加层 -->
      <svg
        v-if="maLines && maLines.length > 0"
        class="as-stock-chart__ma-overlay"
        :viewBox="`0 0 ${candles.length * 100} 120`"
        preserveAspectRatio="none"
      >
        <polyline
          v-for="(ma, mi) in maLines"
          :key="mi"
          :points="getMaPoints(ma)"
          :stroke="ma.color"
          fill="none"
          stroke-width="2"
          opacity="0.8"
        />
      </svg>
    </view>

    <!-- 成交量区域 -->
    <view class="as-stock-chart__vol-row">
      <view
        v-for="(candle, index) in candles"
        :key="index"
        class="as-stock-chart__vol-bar"
        :class="candle.isUp ? 'is-up' : 'is-down'"
        :style="{ height: `${getVolHeight(candle)}%` }"
      ></view>
    </view>

    <!-- 日期轴 -->
    <view class="as-stock-chart__axis">
      <text
        v-for="(label, index) in axisLabels"
        :key="index"
        class="as-stock-chart__axis-label"
      >
        {{ label }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface CandleData {
  open: number
  close: number
  high: number
  low: number
  volume: number
  isUp: boolean
}

interface MaLine {
  name: string
  color: string
  data: number[]
}

const props = withDefaults(defineProps<{
  name: string
  code: string
  price: number
  change: number
  changePct: number
  candles: CandleData[]
  periods?: string[]
  maLines?: MaLine[]
}>(), {
  periods: () => ['日K', '周K', '月K', '季K'],
  maLines: () => []
})

const emit = defineEmits<{
  'period-change': [period: string]
}>()

const currentPeriod = ref(props.periods[0])

const isUp = computed(() => props.change > 0)
const isDown = computed(() => props.change < 0)
const priceTrend = computed(() => ({
  'is-up': isUp.value,
  'is-down': isDown.value,
  'is-flat': props.change === 0
}))

const formattedPrice = computed(() => props.price.toFixed(2))

const formattedChange = computed(() => {
  const sign = isUp.value ? '+' : ''
  return `${sign}${props.change.toFixed(2)} ${sign}${props.changePct.toFixed(2)}%`
})

// 计算 K 线实际数值范围（高低点）
const candleRange = computed(() => {
  if (props.candles.length === 0) return { min: 0, max: 100 }
  let min = Infinity
  let max = -Infinity
  for (const c of props.candles) {
    if (c.low < min) min = c.low
    if (c.high > max) max = c.high
  }
  const pad = (max - min) * 0.1 || 1
  return { min: min - pad, max: max + pad }
})

// 成交量范围
const volRange = computed(() => {
  if (props.candles.length === 0) return { min: 0, max: 100 }
  let max = -Infinity
  for (const c of props.candles) {
    if (c.volume > max) max = c.volume
  }
  return { min: 0, max: max * 1.1 || 100 }
})

function getCandleStyle(index: number): Record<string, string> {
  const count = props.candles.length
  const left = `${(index / count) * 100}%`
  return { left }
}

function getWickHeight(candle: CandleData): number {
  const range = candleRange.value
  return ((candle.high - candle.low) / (range.max - range.min)) * 100
}

function getBodyHeight(candle: CandleData): number {
  const range = candleRange.value
  return (Math.abs(candle.close - candle.open) / (range.max - range.min)) * 100
}

function getVolHeight(candle: CandleData): number {
  return (candle.volume / volRange.value.max) * 100
}

function getMaPoints(ma: MaLine): string {
  const count = props.candles.length
  return ma.data
    .map((val, i) => {
      const x = (i / count) * 100 * count
      const range = candleRange.value
      const y = 120 - ((val - range.min) / (range.max - range.min)) * 120
      return `${x},${y}`
    })
    .join(' ')
}

const axisLabels = computed(() => {
  if (props.candles.length <= 4) return props.candles.map((_, i) => `T+${i + 1}`)
  const step = Math.floor(props.candles.length / 4)
  const labels: string[] = []
  for (let i = 0; i < props.candles.length; i += step) {
    labels.push(`T+${i + 1}`)
  }
  return labels.slice(0, 4)
})

function handlePeriodChange(period: string) {
  currentPeriod.value = period
  emit('period-change', period)
}
</script>

<style lang="scss" scoped>
.as-stock-chart {
  background: $bg-card;
  border-radius: $r-md;
  padding: $s-4;
}

/* ===== Header ===== */
.as-stock-chart__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: $s-3;
}

.as-stock-chart__info {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
}

.as-stock-chart__name {
  font-size: $font-size-md;
  font-weight: 600;
  color: $ink;
}

.as-stock-chart__sub {
  font-size: $font-size-xs;
  color: $ink-mute;
}

.as-stock-chart__quote {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 2rpx;

  &.is-up {
    .as-stock-chart__price,
    .as-stock-chart__change { color: $up; }
  }
  &.is-down {
    .as-stock-chart__price,
    .as-stock-chart__change { color: $down; }
  }
  &.is-flat {
    .as-stock-chart__price,
    .as-stock-chart__change { color: $ink; }
  }
}

.as-stock-chart__price {
  font-size: $font-size-lg;
  font-weight: 700;
  font-family: monospace;
}

.as-stock-chart__change {
  font-size: $font-size-xs;
  font-weight: 600;
  font-family: monospace;
}

/* ===== Periods ===== */
.as-stock-chart__periods {
  display: flex;
  gap: $s-4;
  margin-bottom: $s-3;
  padding-bottom: $s-2;
  border-bottom: 2rpx solid $line-soft;
}

.as-stock-chart__period {
  font-size: $font-size-xs;
  color: $ink-mute;
  padding: $s-1 0;
  position: relative;
  cursor: pointer;

  &.is-active {
    color: $primary;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -2rpx;
      left: 0;
      right: 0;
      height: 3rpx;
      background: $primary;
      border-radius: 2rpx;
    }
  }
}

/* ===== MA Legend ===== */
.as-stock-chart__ma-legend {
  display: flex;
  gap: $s-3;
  margin-bottom: $s-2;
}

.as-stock-chart__ma-item {
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.as-stock-chart__ma-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.as-stock-chart__ma-label {
  font-size: $font-size-xs;
  color: $ink-mute;
  font-family: monospace;
}

/* ===== Candle Row ===== */
.as-stock-chart__candle-row {
  position: relative;
  height: 240rpx;
  margin-bottom: $s-2;
}

.as-stock-chart__candle {
  position: absolute;
  bottom: 0;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
}

.as-stock-chart__candle-wick {
  width: 3rpx;
  min-height: 4rpx;
  flex-shrink: 0;

  .is-up & { background: $up; }
  .is-down & { background: $down; }
}

.as-stock-chart__candle-body {
  width: 100%;
  max-width: 16rpx;
  min-height: 4rpx;
  border-radius: 2rpx;

  .is-up & { background: $up; }
  .is-down & { background: $down; }
}

/* MA SVG Overlay */
.as-stock-chart__ma-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* ===== Volume Row ===== */
.as-stock-chart__vol-row {
  display: flex;
  align-items: flex-end;
  gap: 4rpx;
  height: 60rpx;
  margin-bottom: $s-1;
}

.as-stock-chart__vol-bar {
  flex: 1;
  min-height: 4rpx;
  border-radius: 2rpx 2rpx 0 0;

  &.is-up { background: rgba(229, 77, 94, 0.5); }
  &.is-down { background: rgba(24, 160, 88, 0.5); }
}

/* ===== Axis ===== */
.as-stock-chart__axis {
  display: flex;
  justify-content: space-between;
}

.as-stock-chart__axis-label {
  font-size: $font-size-xs;
  color: $ink-faint;
}
</style>