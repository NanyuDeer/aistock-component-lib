<template>
  <view
    class="as-collapse"
    :class="{
      'as-collapse--open': isOpen,
      'is-disabled': disabled
    }"
  >
    <view
      class="as-collapse__header"
      :class="{ 'is-disabled': disabled }"
      @click="handleToggle"
    >
      <text class="as-collapse__title">{{ title }}</text>
      <view
        class="as-collapse__arrow"
        :class="{ 'is-rotated': isOpen }"
      />
    </view>
    <view
      class="as-collapse__body"
      :class="{ 'is-expanded': isOpen }"
    >
      <view class="as-collapse__content">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  open?: boolean
  disabled?: boolean
}>(), {
  title: '',
  open: false,
  disabled: false
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'change': [value: boolean]
}>()

const isOpen = ref(props.open)

watch(() => props.open, (val) => {
  isOpen.value = val
})

const handleToggle = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  emit('update:open', isOpen.value)
  emit('change', isOpen.value)
}
</script>

<style lang="scss" scoped>
.as-collapse {
  border: 2rpx solid $line;
  border-radius: $r-md;
  background: $bg-card;
  overflow: hidden;
  transition: all $t-base;
}

.as-collapse--open {
  border-color: $primary-100;
  box-shadow: $shadow-xs;
}

.as-collapse__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-3 $s-4;
  min-height: 88rpx;
  cursor: pointer;
  user-select: none;
  transition: background $t-fast;
}

.as-collapse__header:active {
  background: $bg-soft;
}

.as-collapse__header.is-disabled {
  cursor: not-allowed;
  opacity: $op-disabled;
}

.as-collapse__header.is-disabled:active {
  background: transparent;
}

.as-collapse__title {
  font-size: $font-size-base;
  font-weight: 500;
  color: $ink;
  flex: 1;
  line-height: $lh-tight;
}

.as-collapse__arrow {
  width: 24rpx;
  height: 24rpx;
  position: relative;
  flex-shrink: 0;
  margin-left: $s-3;
  transition: transform $t-base;
}

.as-collapse__arrow::before,
.as-collapse__arrow::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 12rpx;
  height: 3rpx;
  background: $ink-soft;
  border-radius: 2rpx;
  transition: transform $t-base;
}

.as-collapse__arrow::before {
  left: 1rpx;
  transform: translateY(-50%) rotate(45deg);
}

.as-collapse__arrow::after {
  right: 1rpx;
  transform: translateY(-50%) rotate(-45deg);
}

.as-collapse__arrow.is-rotated {
  transform: rotate(180deg);
}

.as-collapse__body {
  max-height: 0;
  overflow: hidden;
  transition: max-height $t-slow, opacity $t-base;
  opacity: 0;
}

.as-collapse__body.is-expanded {
  max-height: 2000rpx;
  opacity: 1;
}

.as-collapse__content {
  padding: 0 $s-4 $s-4;
  font-size: $font-size-base;
  color: $ink-soft;
  line-height: $lh-base;
}
</style>