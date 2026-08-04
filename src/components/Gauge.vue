<template>
  <view class="as-gauge" :style="{ width: `${size}rpx`, height: `${size}rpx` }">
    <view class="as-gauge__ring" :style="gaugeStyle">
      <view class="as-gauge__inner">
        <text class="as-gauge__value" :class="`is-${status}`">{{ value }}{{ unit }}</text>
        <text v-if="label" class="as-gauge__label">{{ label }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type GaugeStatus = 'primary' | 'success' | 'warning' | 'danger' | 'gold'

const props = withDefaults(defineProps<{
  value: number
  max?: number
  size?: number
  label?: string
  unit?: string
  status?: GaugeStatus
}>(), {
  max: 100,
  size: 200,
  label: '',
  unit: '',
  status: 'primary'
})

const statusColorMap: Record<GaugeStatus, string> = {
  primary: '#0b5fff',
  success: '#18a058',
  warning: '#c89020',
  danger: '#e54d5e',
  gold: '#c89020'
}

// 与 variables.scss 中 $line-soft 保持一致（JS 中无法引用 SCSS 变量）
const lineSoft = '#eef3fb'

const gaugeStyle = computed(() => {
  const percentage = Math.min(props.value / props.max, 1)
  const deg = percentage * 360
  const color = statusColorMap[props.status]
  return {
    background: `conic-gradient(${color} ${deg}deg, ${lineSoft} ${deg}deg)`
  }
})
</script>

<style lang="scss" scoped>
.as-gauge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.as-gauge__ring {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.as-gauge__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 74%;
  height: 74%;
  background: $bg-card;
  border-radius: 50%;
}

.as-gauge__value {
  font-size: $font-size-2xl;
  font-weight: 800;
  font-family: $font-mono;
  color: $primary;

  &.is-success { color: $down; }
  &.is-warning { color: $warning; }
  &.is-danger { color: $up; }
  &.is-gold { color: $gold; }
}

.as-gauge__label {
  font-size: $font-size-xs;
  color: $ink-mute;
  margin-top: $s-1;
}
</style>