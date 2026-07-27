<template>
  <view class="as-sub-page-card">
    <view v-if="title || showBack || $slots.header" class="as-sub-page-card__header">
      <view class="as-sub-page-card__header-left">
        <view v-if="showBack" class="as-sub-page-card__back" @click="handleBack">
          <view class="as-sub-page-card__back-icon"></view>
        </view>
        <text v-if="title" class="as-sub-page-card__title">{{ title }}</text>
        <slot v-else name="header" />
      </view>
      <view v-if="$slots.extra" class="as-sub-page-card__header-right">
        <slot name="extra" />
      </view>
    </view>

    <scroll-view class="as-sub-page-card__body" scroll-y>
      <slot />
    </scroll-view>

    <view v-if="$slots.footer" class="as-sub-page-card__footer">
      <slot name="footer" />
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  showBack?: boolean
}>(), {
  title: '',
  showBack: true
})

const emit = defineEmits<{
  back: []
}>()

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
.as-sub-page-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $bg-card;
  border-radius: $r-xl;
  overflow: hidden;
}

/* ===== Header ===== */
.as-sub-page-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-4 $s-5;
  border-bottom: 2rpx solid $line-soft;
  flex-shrink: 0;
}

.as-sub-page-card__header-left {
  display: flex;
  align-items: center;
  gap: $s-3;
  flex: 1;
  min-width: 0;
}

.as-sub-page-card__back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56rpx;
  height: 56rpx;
  border-radius: $r-full;
  flex-shrink: 0;
}

.as-sub-page-card__back:active {
  background: $bg-soft;
}

/* CSS 绘制返回箭头 */
.as-sub-page-card__back-icon {
  position: relative;
  width: 18rpx;
  height: 18rpx;
}

.as-sub-page-card__back-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 18rpx;
  height: 18rpx;
  border-left: 4rpx solid $ink;
  border-bottom: 4rpx solid $ink;
  transform: rotate(45deg);
}

.as-sub-page-card__title {
  font-size: $font-size-md;
  font-weight: 600;
  color: $ink;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.as-sub-page-card__header-right {
  flex-shrink: 0;
}

/* ===== Body ===== */
.as-sub-page-card__body {
  flex: 1;
  overflow: auto;
  padding: $s-4;
}

/* ===== Footer ===== */
.as-sub-page-card__footer {
  flex-shrink: 0;
  padding: $s-4 $s-5;
  border-top: 2rpx solid $line-soft;
}
</style>