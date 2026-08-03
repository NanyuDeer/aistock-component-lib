<template>
  <view class="as-result" :class="`as-result--${status}`">
    <view class="as-result__icon-wrap">
      <slot name="icon">
        <view class="as-result__icon" :class="`is-${status}`">
          <view class="as-result__icon-shape" :class="`is-${status}`" />
        </view>
      </slot>
    </view>
    <text v-if="title" class="as-result__title">{{ title }}</text>
    <text v-if="subtitle" class="as-result__subtitle">{{ subtitle }}</text>
    <view v-if="$slots.default" class="as-result__actions">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
type ResultStatus = 'success' | 'warning' | 'error' | 'info'

withDefaults(defineProps<{
  status?: ResultStatus
  title?: string
  subtitle?: string
}>(), {
  status: 'success',
  title: '',
  subtitle: ''
})
</script>

<style lang="scss" scoped>
.as-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $s-8 $s-4;
  text-align: center;
}

/* ===== Icon ===== */
.as-result__icon-wrap {
  margin-bottom: $s-4;
}

.as-result__icon {
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-result__icon.is-success {
  background: $down-soft;
}

.as-result__icon.is-error {
  background: $up-soft;
}

.as-result__icon.is-warning {
  background: $warning-soft;
}

.as-result__icon.is-info {
  background: $primary-50;
}

/* ===== Icon shapes using CSS pseudo-elements ===== */
.as-result__icon-shape {
  position: relative;
  width: 44rpx;
  height: 44rpx;
}

/* Success: checkmark */
.as-result__icon-shape.is-success::before,
.as-result__icon-shape.is-success::after {
  content: '';
  position: absolute;
  background: $down;
  border-radius: 3rpx;
}

.as-result__icon-shape.is-success::before {
  width: 8rpx;
  height: 24rpx;
  top: 6rpx;
  left: 18rpx;
  transform: rotate(45deg);
}

.as-result__icon-shape.is-success::after {
  width: 8rpx;
  height: 14rpx;
  top: 20rpx;
  left: 8rpx;
  transform: rotate(-45deg);
}

/* Error: X */
.as-result__icon-shape.is-error::before,
.as-result__icon-shape.is-error::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40rpx;
  height: 8rpx;
  background: $up;
  border-radius: 4rpx;
}

.as-result__icon-shape.is-error::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.as-result__icon-shape.is-error::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* Warning: exclamation mark */
.as-result__icon-shape.is-warning {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.as-result__icon-shape.is-warning::before {
  content: '';
  display: block;
  width: 8rpx;
  height: 28rpx;
  background: $warning;
  border-radius: 4rpx;
  margin-bottom: 4rpx;
}

.as-result__icon-shape.is-warning::after {
  content: '';
  display: block;
  width: 8rpx;
  height: 8rpx;
  background: $warning;
  border-radius: 50%;
}

/* Info: circle with 'i' */
.as-result__icon-shape.is-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.as-result__icon-shape.is-info::before {
  content: '';
  display: block;
  width: 8rpx;
  height: 8rpx;
  background: $primary;
  border-radius: 50%;
  margin-bottom: 6rpx;
}

.as-result__icon-shape.is-info::after {
  content: '';
  display: block;
  width: 8rpx;
  height: 22rpx;
  background: $primary;
  border-radius: 4rpx;
}

/* ===== Title ===== */
.as-result__title {
  display: block;
  font-size: $font-size-xl;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
  margin-bottom: $s-2;
}

.as-result--success .as-result__title {
  color: $down;
}

.as-result--error .as-result__title {
  color: $up;
}

.as-result--warning .as-result__title {
  color: $warning;
}

.as-result--info .as-result__title {
  color: $primary;
}

/* ===== Subtitle ===== */
.as-result__subtitle {
  display: block;
  font-size: $font-size-base;
  color: $ink-soft;
  line-height: $lh-base;
  margin-bottom: $s-4;
}

/* ===== Actions ===== */
.as-result__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $s-3;
  margin-top: $s-2;
}
</style>