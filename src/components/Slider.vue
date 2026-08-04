<template>
  <view class="as-slider">
    <view v-if="label || showValue" class="as-slider__header">
      <text v-if="label" class="as-slider__label">{{ label }}</text>
      <text class="as-slider__value" :class="`is-${status}`">{{ formattedValue }}</text>
    </view>
    <view class="as-slider__track" @click="handleTrackClick">
      <view class="as-slider__fill" :class="`is-${status}`" :style="{ width: `${percentage}%` }"></view>
      <view class="as-slider__thumb" :class="`is-${status}`" :style="{ left: `${percentage}%` }"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type SliderStatus = 'primary' | 'success' | 'warning' | 'danger'

const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
  status?: SliderStatus
}>(), {
  min: 0,
  max: 100,
  step: 1,
  label: '',
  showValue: true,
  status: 'primary'
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const percentage = computed(() => {
  const range = props.max - props.min
  return ((props.modelValue - props.min) / range) * 100
})

const formattedValue = computed(() => {
  return props.step < 1 ? props.modelValue.toFixed(1) : props.modelValue.toString()
})

const handleTrackClick = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const ratio = (event.clientX - rect.left) / rect.width
  const raw = props.min + ratio * (props.max - props.min)
  const stepped = Math.round(raw / props.step) * props.step
  const clamped = Math.max(props.min, Math.min(props.max, stepped))
  emit('update:modelValue', clamped)
  emit('change', clamped)
}
</script>

<style lang="scss" scoped>
.as-slider {
  width: 100%;
}

.as-slider__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $s-3;
}

.as-slider__label {
  font-size: $font-size-sm;
  color: $ink-soft;
}

.as-slider__value {
  font-size: $font-size-sm;
  font-weight: 600;
  font-family: $font-mono;

  &.is-primary { color: $primary; }
  &.is-success { color: $down; }
  &.is-warning { color: $warning; }
  &.is-danger { color: $up; }
}

.as-slider__track {
  position: relative;
  height: 8rpx;
  background: $bg-deep;
  border-radius: $r-full;
  cursor: pointer;
}

.as-slider__fill {
  height: 100%;
  border-radius: $r-full;
  transition: width $t-fast;

  &.is-primary { background: linear-gradient(90deg, $primary, $primary-light); }
  &.is-success { background: linear-gradient(90deg, $down, $down-light); }
  &.is-warning { background: linear-gradient(90deg, $warning, $warning-light); }
  &.is-danger { background: linear-gradient(90deg, $up, $up-light); }
}

.as-slider__thumb {
  position: absolute;
  top: 50%;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: $white;
  border: 4rpx solid $primary;
  transform: translate(-50%, -50%);
  box-shadow: $shadow-sm;
  transition: left $t-fast, transform $t-fast;

  &:active {
    transform: translate(-50%, -50%) scale(1.15);
  }

  &.is-success { border-color: $down; }
  &.is-warning { border-color: $warning; }
  &.is-danger { border-color: $up; }
}
</style>