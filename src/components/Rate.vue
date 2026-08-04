<template>
  <view class="as-rate">
    <view
      v-for="i in max"
      :key="i"
      class="as-rate__item"
      :class="{ 'is-active': i <= modelValue }"
      @click="handleSelect(i)"
    >
      <view class="as-rate__star"></view>
    </view>
    <text v-if="showText && modelValue > 0" class="as-rate__text">{{ modelValue }} 星</text>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: number
  max?: number
  showText?: boolean
}>(), {
  max: 5,
  showText: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const handleSelect = (index: number) => {
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<style lang="scss" scoped>
.as-rate {
  display: inline-flex;
  align-items: center;
  gap: $s-1;
}

.as-rate__item {
  cursor: pointer;
  transition: transform $t-fast;

  &:active {
    transform: scale(1.15);
  }
}

/* CSS 绘制五角星 */
.as-rate__star {
  width: 36rpx;
  height: 36rpx;
  position: relative;
}

.as-rate__star::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 18rpx solid transparent;
  border-right: 18rpx solid transparent;
  border-bottom: 14rpx solid $ink-faint;
}

.as-rate__star::after {
  content: '';
  position: absolute;
  top: 12rpx;
  left: 0;
  width: 0;
  height: 0;
  border-left: 18rpx solid transparent;
  border-right: 18rpx solid transparent;
  border-top: 14rpx solid $ink-faint;
}

.as-rate__item.is-active .as-rate__star::before {
  border-bottom-color: $gold;
}

.as-rate__item.is-active .as-rate__star::after {
  border-top-color: $gold;
}

.as-rate__text {
  font-size: $font-size-xs;
  color: $gold-deep;
  font-weight: 600;
  margin-left: $s-2;
}
</style>