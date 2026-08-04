<template>
  <view class="as-radio" :class="{ 'is-disabled': disabled, 'is-checked': modelValue === value }" @click="handleSelect">
    <view class="as-radio__box">
      <view class="as-radio__dot"></view>
    </view>
    <text v-if="label" class="as-radio__label">{{ label }}</text>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string | number
  value?: string | number
  label?: string
  disabled?: boolean
}>(), {
  modelValue: '',
  value: '',
  label: '',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const handleSelect = () => {
  if (!props.disabled && props.modelValue !== props.value) {
    emit('update:modelValue', props.value)
    emit('change', props.value)
  }
}
</script>

<style lang="scss" scoped>
.as-radio {
  display: inline-flex;
  align-items: center;
  gap: $s-2;
  cursor: pointer;
  user-select: none;
}

.as-radio__box {
  width: 36rpx;
  height: 36rpx;
  border: 3rpx solid $line-strong;
  border-radius: 50%;
  background: $white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all $t-fast;
  flex-shrink: 0;
}

.as-radio__dot {
  width: 16rpx;
  height: 16rpx;
  background: $white;
  border-radius: 50%;
  transform: scale(0);
  transition: transform $t-fast;
}

.as-radio.is-checked .as-radio__box {
  border-color: $primary;
}

.as-radio.is-checked .as-radio__dot {
  background: $primary;
  transform: scale(1);
}

.as-radio.is-disabled {
  opacity: $op-disabled;
}

.as-radio__label {
  font-size: $font-size-sm;
  color: $ink;
}
</style>