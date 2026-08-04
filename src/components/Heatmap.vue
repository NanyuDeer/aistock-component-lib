<template>
  <view class="as-heatmap" :style="gridStyle">
    <view
      v-for="(cell, index) in cells"
      :key="index"
      class="as-heatmap__cell"
      :style="cellStyle(cell)"
    >
      <text class="as-heatmap__name">{{ cell.name }}</text>
      <text class="as-heatmap__change">{{ formattedChange(cell) }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface HeatmapCell {
  name: string
  changePct: number
}

const props = withDefaults(defineProps<{
  cells: HeatmapCell[]
  cols?: number
}>(), {
  cols: 0
})

const gridCols = computed(() => {
  if (props.cols > 0) return props.cols
  if (props.cells.length <= 5) return props.cells.length
  return Math.ceil(Math.sqrt(props.cells.length))
})

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${gridCols.value}, 1fr)`,
  gap: '8rpx'
}))

function getColorOpacity(changePct: number): string {
  const abs = Math.abs(changePct)
  // 0-1%: 0.15, 1-3%: 0.35, 3-5%: 0.55, >5%: 0.75
  let opacity: number
  if (abs > 5) opacity = 0.75
  else if (abs > 3) opacity = 0.55
  else if (abs > 1) opacity = 0.35
  else if (abs > 0) opacity = 0.15
  else opacity = 0.08
  return opacity.toFixed(2)
}

function cellStyle(cell: HeatmapCell): Record<string, string> {
  const opacity = getColorOpacity(cell.changePct)
  const isUp = cell.changePct > 0
  const isDown = cell.changePct < 0
  const color = isUp ? '#e54d5e' : isDown ? '#18a058' : '#909399'
  return {
    background: `${color}${Math.round(parseFloat(opacity) * 255).toString(16).padStart(2, '0')}`,
    borderRadius: '12rpx',
    padding: '16rpx',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4rpx',
    minHeight: '96rpx'
  }
}

function formattedChange(cell: HeatmapCell): string {
  const sign = cell.changePct > 0 ? '+' : ''
  return `${sign}${cell.changePct.toFixed(2)}%`
}
</script>

<style lang="scss" scoped>
.as-heatmap {
  width: 100%;
}

.as-heatmap__cell {
  cursor: pointer;
  transition: transform $t-fast, box-shadow $t-fast;
}

.as-heatmap__cell:active {
  transform: scale(0.96);
  box-shadow: $shadow-sm;
}

.as-heatmap__name {
  font-size: $font-size-xs;
  font-weight: 600;
  color: $white;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.15);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  text-align: center;
}

.as-heatmap__change {
  font-size: $font-size-xs;
  font-weight: 700;
  font-family: $font-mono;
  color: $white;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.15);
}
</style>