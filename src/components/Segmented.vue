<template>
  <view class="as-segmented">
    <view
      v-for="option in options"
      :key="option.value"
      class="as-segmented__item"
      :class="{ 'as-segmented__item--active': modelValue === option.value }"
      @click="handleSelect(option.value)"
    >
      <text class="as-segmented__label">{{ option.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
export interface SegmentedOption {
  label: string
  value: string | number
}

const props = defineProps<{
  options: SegmentedOption[]
  modelValue: string | number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

function handleSelect(value: string | number) {
  if (props.modelValue !== value) {
    emit('update:modelValue', value)
  }
}
</script>

<style lang="scss" scoped>
.as-segmented {
  display: inline-flex;
  align-items: center;
  background: $bg-soft;
  border-radius: $r-xl;
  padding: 4rpx;
  gap: 4rpx;
}

.as-segmented__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rpx 24rpx;
  border-radius: $r-lg;
  cursor: pointer;
  transition: all $t-base;
  user-select: none;
}

.as-segmented__item--active {
  background: $white;
  box-shadow: $shadow-xs;
}

.as-segmented__label {
  font-size: $font-size-xs;
  font-weight: 500;
  color: $ink-soft;
  line-height: $lh-tight;
  transition: color $t-base;
  white-space: nowrap;
}

.as-segmented__item--active .as-segmented__label {
  color: $primary;
  font-weight: 600;
}

.as-segmented__item:not(.as-segmented__item--active):active {
  opacity: $op-active;
}
</style>