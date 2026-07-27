<template>
  <view class="as-empty">
    <view class="as-empty__icon">
      <slot name="icon">
        <view class="as-empty__icon-default"></view>
      </slot>
    </view>
    <text v-if="title" class="as-empty__title">{{ title }}</text>
    <text v-if="description" class="as-empty__desc">{{ description }}</text>
    <view v-if="$slots.default" class="as-empty__action">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: '暂无数据',
  description: ''
})
</script>

<style lang="scss" scoped>
.as-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $s-10 $s-6;
}

.as-empty__icon {
  margin-bottom: $s-4;
}

.as-empty__icon-default {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: $bg-deep;
  position: relative;
}

.as-empty__icon-default::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48rpx;
  height: 48rpx;
  border: 6rpx solid $line-strong;
  border-radius: 50%;
}

.as-empty__icon-default::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-30%, -30%) rotate(-45deg);
  width: 24rpx;
  height: 24rpx;
  border-right: 6rpx solid $line-strong;
  border-bottom: 6rpx solid $line-strong;
  border-radius: 0 0 6rpx 0;
}

.as-empty__title {
  font-size: $font-size-md;
  font-weight: 600;
  color: $ink-soft;
  margin-bottom: $s-2;
}

.as-empty__desc {
  font-size: $font-size-sm;
  color: $ink-mute;
  text-align: center;
}

.as-empty__action {
  margin-top: $s-5;
}
</style>