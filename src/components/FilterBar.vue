<template>
  <view class="as-filter-bar">
    <view class="as-filter-bar__items">
      <slot />
    </view>
    <view class="as-filter-bar__actions">
      <view
        v-if="activeCount > 0"
        class="as-filter-bar__badge"
      >
        <text class="as-filter-bar__badge-text">{{ activeCount > 99 ? '99+' : activeCount }}</text>
      </view>
      <text
        class="as-filter-bar__reset"
        @click="handleReset"
      >重置</text>
      <view
        class="as-filter-bar__confirm"
        @click="handleConfirm"
      >
        <text class="as-filter-bar__confirm-text">确认</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  activeCount?: number
}>(), {
  activeCount: 0
})

const emit = defineEmits<{
  reset: []
  confirm: []
}>()

const handleReset = () => {
  emit('reset')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style lang="scss" scoped>
.as-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-3 $s-5;
  background: $bg-card;
  border-bottom: 2rpx solid $line-soft;
  gap: $s-3;
}

.as-filter-bar__items {
  display: flex;
  align-items: center;
  gap: $s-2;
  flex: 1;
  min-width: 0;
  flex-wrap: wrap;
}

.as-filter-bar__actions {
  display: flex;
  align-items: center;
  gap: $s-2;
  flex-shrink: 0;
  position: relative;
}

.as-filter-bar__badge {
  position: absolute;
  top: -8rpx;
  right: 116rpx;
  min-width: 28rpx;
  height: 28rpx;
  background: $primary;
  border-radius: $r-full;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6rpx;
}

.as-filter-bar__badge-text {
  font-size: 18rpx;
  color: $white;
  font-weight: 600;
  line-height: 1;
}

.as-filter-bar__reset {
  font-size: $font-size-sm;
  color: $ink-soft;
  cursor: pointer;
  padding: $s-1 $s-2;
  flex-shrink: 0;
}

.as-filter-bar__reset:active {
  color: $primary;
}

.as-filter-bar__confirm {
  background: $primary;
  border-radius: $r-sm;
  padding: $s-1 $s-3;
  cursor: pointer;
  flex-shrink: 0;
}

.as-filter-bar__confirm:active {
  opacity: $op-active;
}

.as-filter-bar__confirm-text {
  font-size: $font-size-sm;
  color: $white;
  font-weight: 500;
}
</style>