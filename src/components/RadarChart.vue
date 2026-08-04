<template>
  <view class="as-radar-chart">
    <view v-if="dimensions.length === 0" class="as-radar-chart__empty">
      <view class="as-radar-chart__empty-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8a96b0" stroke-width="1.5" style="display: block;">
          <polygon points="12 2 22 20 2 20"></polygon>
          <line x1="12" y1="2" x2="12" y2="20"></line>
        </svg>
      </view>
      <text class="as-radar-chart__empty-title">暂无数据</text>
      <text class="as-radar-chart__empty-desc">数据加载完成后将展示{{ dimensions.length > 0 ? dimensions.length : '多' }}维雷达图</text>
    </view>
    <view v-else class="as-radar-chart__svg-wrap" :style="{ width: `${size}rpx`, height: `${size}rpx` }">
      <svg
        :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
        :width="`${size}rpx`"
        :height="`${size}rpx`"
        style="display: block;"
      >
        <!-- 网格层（多层同心多边形） -->
        <polygon
          v-for="level in gridLevels"
          :key="'grid-' + level"
          :points="gridPolygon(level)"
          fill="none"
          :stroke="level === gridLevels.length ? '#cdd8ec' : '#e1e9f5'"
          :stroke-width="level === gridLevels.length ? 1.5 : 1"
        ></polygon>
        <!-- 轴线 -->
        <line
          v-for="(dim, i) in dimensions"
          :key="'axis-' + i"
          :x1="centerX"
          :y1="centerY"
          :x2="axisEnd(i).x"
          :y2="axisEnd(i).y"
          stroke="#e1e9f5"
          stroke-width="1"
        ></line>
        <!-- 数据多边形 -->
        <polygon
          :points="dataPolygon"
          :fill="statusColor"
          :fill-opacity="0.18"
          :stroke="statusColor"
          stroke-width="2"
          stroke-linejoin="round"
        ></polygon>
        <!-- 数据顶点 -->
        <circle
          v-for="(pt, i) in dataPoints"
          :key="'pt-' + i"
          :cx="pt.x"
          :cy="pt.y"
          :r="3.5"
          :fill="statusColor"
        ></circle>
        <!-- 标签 -->
        <text
          v-for="(dim, i) in dimensions"
          :key="'label-' + i"
          :x="labelPos(i).x"
          :y="labelPos(i).y"
          :text-anchor="labelPos(i).anchor"
          font-size="11"
          font-weight="600"
          fill="#0a1733"
        >{{ dim.label }} {{ dim.value }}</text>
      </svg>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface RadarDimension {
  label: string
  value: number
  max?: number
}

type RadarStatus = 'primary' | 'success' | 'warning' | 'danger' | 'gold'

const props = withDefaults(defineProps<{
  dimensions: RadarDimension[]
  size?: number
  status?: RadarStatus
}>(), {
  size: 400,
  status: 'primary'
})

const statusColorMap: Record<RadarStatus, string> = {
  primary: '#0b5fff',
  success: '#18a058',
  warning: '#c89020',
  danger: '#e54d5e',
  gold: '#c89020'
}

const statusColor = computed(() => statusColorMap[props.status])

const viewBoxSize = 200
const centerX = viewBoxSize / 2
const centerY = viewBoxSize / 2
const radius = viewBoxSize * 0.4

const n = computed(() => props.dimensions.length)

const gridLevels = computed(() => {
  // 3-5 层同心多边形
  const count = Math.min(Math.max(n.value, 3), 5)
  return Array.from({ length: count }, (_, i) => i + 1)
})

function polygonPoints(level: number, ratios: number[]): string {
  const r = (radius / gridLevels.value.length) * level
  return ratios
    .map((ratio, i) => {
      const angle = (Math.PI * 2 * i) / n.value - Math.PI / 2
      const x = centerX + r * Math.cos(angle)
      const y = centerY + r * Math.sin(angle)
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

function gridPolygon(level: number): string {
  return polygonPoints(level, Array.from({ length: n.value }, () => 1))
}

function axisEnd(index: number): { x: number; y: number } {
  const angle = (Math.PI * 2 * index) / n.value - Math.PI / 2
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  }
}

const dataPoints = computed(() => {
  return props.dimensions.map((dim, i) => {
    const max = dim.max ?? 100
    const ratio = Math.min(dim.value / max, 1)
    const angle = (Math.PI * 2 * i) / n.value - Math.PI / 2
    const r = radius * ratio
    return {
      x: Number((centerX + r * Math.cos(angle)).toFixed(2)),
      y: Number((centerY + r * Math.sin(angle)).toFixed(2))
    }
  })
})

const dataPolygon = computed(() => {
  return dataPoints.value.map(p => `${p.x},${p.y}`).join(' ')
})

function labelPos(index: number): { x: number; y: number; anchor: string } {
  const angle = (Math.PI * 2 * index) / n.value - Math.PI / 2
  const labelRadius = radius + 18
  const x = centerX + labelRadius * Math.cos(angle)
  const y = centerY + labelRadius * Math.sin(angle)

  let anchor = 'middle'
  const cos = Math.cos(angle)
  if (cos < -0.1) anchor = 'end'
  else if (cos > 0.1) anchor = 'start'

  return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), anchor }
}
</script>

<style lang="scss" scoped>
.as-radar-chart {
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-radar-chart__svg-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-radar-chart__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $s-10 $s-6;
  background: $bg-soft;
  border-radius: $r-lg;
  width: 100%;
}

.as-radar-chart__empty-icon {
  margin-bottom: $s-4;
  opacity: 0.5;
}

.as-radar-chart__empty-title {
  font-size: $font-size-md;
  font-weight: 600;
  color: $ink-soft;
  margin-bottom: $s-2;
}

.as-radar-chart__empty-desc {
  font-size: $font-size-sm;
  color: $ink-mute;
  text-align: center;
}
</style>