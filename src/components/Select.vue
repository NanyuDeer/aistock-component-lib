<template>
  <view class="as-select" :class="{ 'is-disabled': disabled, 'is-open': open }" @click="handleToggle">
    <view v-if="selectedLabel" class="as-select__value">
      <text class="as-select__value-text">{{ selectedLabel }}</text>
    </view>
    <text v-else class="as-select__placeholder">{{ placeholder }}</text>
    <view class="as-select__arrow" :class="{ 'is-open': open }"></view>
  </view>
  <view v-if="open" class="as-select__dropdown" @click.stop>
    <view
      v-for="option in options"
      :key="option.value"
      class="as-select__option"
      :class="{ 'is-selected': option.value === modelValue }"
      @click="handleSelect(option)"
    >
      <text class="as-select__option-text">{{ option.label }}</text>
      <view v-if="option.value === modelValue" class="as-select__check"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface SelectOption {
  label: string
  value: string | number
}

const props = withDefaults(defineProps<{
  modelValue?: string | number
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
}>(), {
  modelValue: '',
  placeholder: '请选择',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const open = ref(false)

const selectedLabel = computed(() => {
  const option = props.options.find(o => o.value === props.modelValue)
  return option ? option.label : ''
})

const handleToggle = () => {
  if (!props.disabled) {
    open.value = !open.value
  }
}

const handleSelect = (option: SelectOption) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  open.value = false
}
</script>

<style lang="scss" scoped>
.as-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-lg;
  padding: 0 $s-3;
  height: 80rpx;
  cursor: pointer;
  transition: all $t-base;
}

.as-select.is-focused,
.as-select.is-open {
  border-color: $primary;
  box-shadow: $shadow-glow;
}

.as-select.is-disabled {
  background: $bg-soft;
  opacity: $op-disabled;
}

.as-select__value-text {
  font-size: $font-size-base;
  color: $ink;
}

.as-select__placeholder {
  font-size: $font-size-base;
  color: $ink-faint;
}

.as-select__arrow {
  position: relative;
  width: 16rpx;
  height: 16rpx;
  flex-shrink: 0;
  transition: transform $t-fast;
}

.as-select__arrow::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 16rpx;
  height: 16rpx;
  border-right: 3rpx solid $ink-mute;
  border-bottom: 3rpx solid $ink-mute;
  transform: rotate(45deg);
}

.as-select__arrow.is-open {
  transform: rotate(180deg);
}

/* ===== Dropdown ===== */
.as-select__dropdown {
  position: absolute;
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-lg;
  box-shadow: $shadow-card;
  z-index: $z-dropdown;
  overflow: hidden;
  margin-top: $s-1;
}

.as-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-3 $s-4;
  cursor: pointer;
  transition: background $t-fast;

  &:active {
    background: $bg-soft;
  }

  &.is-selected {
    background: $primary-50;
  }
}

.as-select__option-text {
  font-size: $font-size-sm;
  color: $ink;
}

.as-select__check {
  width: 12rpx;
  height: 20rpx;
  border: solid $primary;
  border-width: 0 4rpx 4rpx 0;
  transform: rotate(45deg);
}
</style>