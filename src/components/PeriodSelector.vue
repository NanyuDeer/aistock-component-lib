<template>
  <view class="as-period-selector">
    <view
      v-for="(period, index) in periods"
      :key="index"
      class="as-period-selector__item"
      :class="{
        'is-active': index === currentValue
      }"
      @click="handleSelect(index, period)"
    >
      <text class="as-period-selector__text">{{ period }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  periods?: string[]
  value?: number
}>(), {
  periods: () => ['分时', '5日', '日K', '周K', '月K'],
  value: 0
})

const emit = defineEmits<{
  'update:value': [value: number]
  'change': [value: number, period: string]
}>()

const currentValue = computed(() => {
  const val = props.value
  if (val < 0) return 0
  if (val >= props.periods.length) return 0
  return val
})

const handleSelect = (index: number, period: string) => {
  if (index === currentValue.value) return
  emit('update:value', index)
  emit('change', index, period)
}
</script>

<style lang="scss" scoped>
.as-period-selector {
  display: inline-flex;
  align-items: center;
  background: $bg-soft;
  border: 2rpx solid $line;
  border-radius: $r-sm;
  padding: 4rpx;
  gap: 4rpx;
}

.as-period-selector__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $s-1 $s-3;
  min-width: 80rpx;
  height: 60rpx;
  border-radius: $r-sm;
  cursor: pointer;
  user-select: none;
  transition: all $t-fast;
}

.as-period-selector__item:active {
  background: $bg-deep;
}

.as-period-selector__item.is-active {
  background: $bg-card;
  box-shadow: $shadow-xs;
}

.as-period-selector__text {
  font-size: $font-size-sm;
  font-weight: 500;
  color: $ink-soft;
  transition: color $t-fast;
}

.as-period-selector__item.is-active .as-period-selector__text {
  color: $primary;
  font-weight: 600;
}
</style>