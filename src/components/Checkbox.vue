<template>
  <view class="as-checkbox" :class="{ 'is-disabled': disabled, 'is-checked': modelValue }" @click="handleToggle">
    <view class="as-checkbox__box">
      <view class="as-checkbox__check"></view>
    </view>
    <text v-if="label" class="as-checkbox__label">{{ label }}</text>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
  label?: string
  disabled?: boolean
}>(), {
  modelValue: false,
  label: '',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const handleToggle = () => {
  if (!props.disabled) {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<style lang="scss" scoped>
.as-checkbox {
  display: inline-flex;
  align-items: center;
  gap: $s-2;
  cursor: pointer;
  user-select: none;
}

.as-checkbox__box {
  width: 36rpx;
  height: 36rpx;
  border: 3rpx solid $line-strong;
  border-radius: $r-xs;
  background: $white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all $t-fast;
  flex-shrink: 0;
}

.as-checkbox__check {
  width: 10rpx;
  height: 18rpx;
  border: solid $white;
  border-width: 0 4rpx 4rpx 0;
  transform: rotate(45deg) scale(0);
  transition: transform $t-fast;
}

.as-checkbox.is-checked .as-checkbox__box {
  background: $primary;
  border-color: $primary;
}

.as-checkbox.is-checked .as-checkbox__check {
  transform: rotate(45deg) scale(1);
}

.as-checkbox.is-disabled {
  opacity: $op-disabled;
}

.as-checkbox__label {
  font-size: $font-size-sm;
  color: $ink;
}
</style>