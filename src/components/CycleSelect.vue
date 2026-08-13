<template>
  <view class="as-cycle-select">
    <view
      v-for="(opt, i) in options"
      :key="i"
      class="as-cycle-select__item"
      :class="{ 'is-active': opt.value === modelValue }"
      @tap="handleSelect(opt.value)"
    >
      <text class="as-cycle-select__text">{{ opt.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  options: Array<{ label: string; value: string | number }>
  modelValue: string | number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function handleSelect(value: string | number): void {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.as-cycle-select {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  background: $bg-soft;
  border-radius: $r-full;
  padding: 4rpx;
  gap: 4rpx;
}

.as-cycle-select__item {
  padding: $s-1 $s-3;
  border-radius: $r-full;
  cursor: pointer;
  transition: all $t-fast;
}

.as-cycle-select__item.is-active {
  background: $bg-card;
  box-shadow: $shadow-xs;
}

.as-cycle-select__text {
  font-size: $font-size-sm;
  color: $ink-soft;
  font-weight: 500;
  white-space: nowrap;

  .is-active & {
    color: $primary;
    font-weight: 600;
  }
}
</style>