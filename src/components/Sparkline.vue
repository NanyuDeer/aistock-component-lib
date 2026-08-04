<template>
  <view class="as-sparkline" :style="{ width: width, height: height }">
    <view class="as-sparkline__track">
      <view
        v-for="(item, index) in normalizedData"
        :key="index"
        class="as-sparkline__bar"
        :class="`is-${trend}`"
        :style="{ height: `${item}%`, left: `${(index / (normalizedData.length - 1)) * 100}%` }"
      ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type SparklineTrend = 'up' | 'down' | 'flat'

const props = withDefaults(defineProps<{
  data: number[]
  width?: string
  height?: string
  trend?: SparklineTrend
}>(), {
  width: '100%',
  height: '60rpx',
  trend: 'flat'
})

const normalizedData = computed(() => {
  if (props.data.length === 0) return []
  const min = Math.min(...props.data)
  const max = Math.max(...props.data)
  const range = max - min || 1
  return props.data.map(v => ((v - min) / range) * 100)
})
</script>

<style lang="scss" scoped>
.as-sparkline {
  display: inline-block;
  position: relative;
}

.as-sparkline__track {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 4rpx;
}

.as-sparkline__bar {
  position: absolute;
  width: 6rpx;
  min-height: 4rpx;
  border-radius: 3rpx;
  transition: height $t-base;

  &.is-up { background: $up; }
  &.is-down { background: $down; }
  &.is-flat { background: $primary; }
}
</style>