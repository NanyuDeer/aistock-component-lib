<template>
  <view class="as-alert" :class="`as-alert--${type}`">
    <view class="as-alert__icon">
      <view v-if="type === 'success'" class="as-alert__icon-success"></view>
      <view v-else-if="type === 'warning'" class="as-alert__icon-warning"></view>
      <view v-else-if="type === 'error'" class="as-alert__icon-error"></view>
      <view v-else class="as-alert__icon-info"></view>
    </view>
    <view class="as-alert__content">
      <text v-if="title" class="as-alert__title">{{ title }}</text>
      <text class="as-alert__desc">{{ description }}</text>
      <view v-if="$slots.default" class="as-alert__action">
        <slot />
      </view>
    </view>
    <view v-if="closable" class="as-alert__close" @click="handleClose">
      <view class="as-alert__close-icon"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type AlertType = 'info' | 'success' | 'warning' | 'error'

const props = withDefaults(defineProps<{
  title?: string
  description: string
  type?: AlertType
  closable?: boolean
}>(), {
  title: '',
  type: 'info',
  closable: false
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(true)

const handleClose = () => {
  visible.value = false
  emit('close')
}
</script>

<style lang="scss" scoped>
.as-alert {
  display: flex;
  align-items: flex-start;
  gap: $s-3;
  padding: $s-4 $s-5;
  border-radius: $r-lg;
  border: 2rpx solid;
}

.as-alert--info {
  background: $primary-50;
  border-color: $primary-100;
}

.as-alert--success {
  background: $down-bg;
  border-color: rgba(24, 160, 88, 0.2);
}

.as-alert--warning {
  background: $warning-bg;
  border-color: rgba(200, 144, 32, 0.2);
}

.as-alert--error {
  background: $up-bg;
  border-color: rgba(229, 77, 94, 0.2);
}

.as-alert__icon {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-alert__content {
  flex: 1;
  min-width: 0;
}

.as-alert__title {
  display: block;
  font-size: $font-size-md;
  font-weight: 600;
  margin-bottom: $s-1;

  .as-alert--info & { color: $primary; }
  .as-alert--success & { color: $down; }
  .as-alert--warning & { color: $warning; }
  .as-alert--error & { color: $up; }
}

.as-alert__desc {
  font-size: $font-size-sm;
  color: $ink-soft;
  line-height: $lh-base;
}

.as-alert__action {
  margin-top: $s-3;
}

.as-alert__close {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: $r-full;
}

.as-alert__close:active {
  background: rgba(0, 0, 0, 0.05);
}

.as-alert__close-icon {
  position: relative;
  width: 20rpx;
  height: 20rpx;
}

.as-alert__close-icon::before,
.as-alert__close-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20rpx;
  height: 3rpx;
  background: $ink-mute;
  border-radius: 2rpx;
}

.as-alert__close-icon::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.as-alert__close-icon::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* 图标样式复用 Toast 的 CSS 绘制 */
.as-alert__icon-success,
.as-alert__icon-error,
.as-alert__icon-warning,
.as-alert__icon-info {
  position: relative;
  width: 32rpx;
  height: 32rpx;
}

.as-alert__icon-success::before {
  content: '';
  position: absolute;
  top: 8rpx;
  left: 6rpx;
  width: 12rpx;
  height: 20rpx;
  border: solid $down;
  border-width: 0 4rpx 4rpx 0;
  transform: rotate(45deg);
}

.as-alert__icon-error::before,
.as-alert__icon-error::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24rpx;
  height: 4rpx;
  background: $up;
  border-radius: 2rpx;
}

.as-alert__icon-error::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.as-alert__icon-error::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.as-alert__icon-warning {
  width: 8rpx;
  height: 24rpx;
  background: $warning;
  border-radius: 4rpx;
  margin: 4rpx auto;
}

.as-alert__icon-info {
  width: 8rpx;
  height: 8rpx;
  background: $primary;
  border-radius: 50%;
  margin: 4rpx auto;
}
</style>