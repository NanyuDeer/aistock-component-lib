<template>
  <view class="as-trend-kline-compare">
    <!-- 图例行 -->
    <view class="as-trend-kline-compare__legend">
      <view
        v-for="(legend, index) in legends"
        :key="index"
        class="as-trend-kline-compare__legend-item"
      >
        <view class="as-trend-kline-compare__legend-dot" :style="{ background: legend.color }"></view>
        <text class="as-trend-kline-compare__legend-label">{{ legend.name }}</text>
      </view>
    </view>

    <!-- SVG 折线图 -->
    <svg
      class="as-trend-kline-compare__chart"
      :viewBox="`0 0 ${viewBoxWidth} 80`"
      :style="{ height: '160rpx' }"
    >
      <polyline
        v-for="(serie, index) in series"
        :key="index"
        :points="serie.points"
        :stroke="serie.color"
        fill="none"
        :stroke-width="serie.dash ? 1.5 : 2"
        :stroke-dasharray="serie.dash ? '4 2' : 'none'"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface LegendItem {
  name: string
  color: string
}

interface SeriesItem {
  points: string
  color: string
  dash?: boolean
}

const props = withDefaults(defineProps<{
  legends: LegendItem[]
  series: SeriesItem[]
}>(), {
  legends: () => [],
  series: () => []
})

const viewBoxWidth = computed(() => {
  if (props.series.length === 0) return 300
  const maxPoints = Math.max(...props.series.map(s => s.points.split(' ').length))
  return Math.max(300, maxPoints * 30)
})
</script>

<style lang="scss" scoped>
.as-trend-kline-compare {
  background: $bg-card;
  border-radius: $r-md;
  padding: $s-3 $s-4;
}

/* ===== Legend ===== */
.as-trend-kline-compare__legend {
  display: flex;
  gap: $s-3;
  margin-bottom: $s-2;
}

.as-trend-kline-compare__legend-item {
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.as-trend-kline-compare__legend-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.as-trend-kline-compare__legend-label {
  font-size: $font-size-xs;
  color: $ink-mute;
}

/* ===== Chart ===== */
.as-trend-kline-compare__chart {
  width: 100%;
  display: block;
}
</style>