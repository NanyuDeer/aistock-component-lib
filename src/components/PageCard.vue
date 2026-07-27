<template>
  <view class="as-page-card" :style="{ paddingBottom: `calc(${bottomPadding} + ${safeBottom})` }">
    <view v-if="title || $slots.header" class="as-page-card__header">
      <view class="as-page-card__header-left">
        <view v-if="showBack" class="as-page-card__back" @click="handleBack">
          <view class="as-page-card__back-icon"></view>
        </view>
        <view class="as-page-card__title-wrap">
          <text v-if="title" class="as-page-card__title">{{ title }}</text>
          <text v-if="subtitle" class="as-page-card__subtitle">{{ subtitle }}</text>
        </view>
      </view>
      <view v-if="$slots.extra" class="as-page-card__header-right">
        <slot name="extra" />
      </view>
    </view>
    <scroll-view class="as-page-card__body" scroll-y :style="bodyStyle">
      <slot />
    </scroll-view>
    <view v-if="$slots.footer" class="as-page-card__footer">
      <slot name="footer" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  showBack?: boolean
  bottomPadding?: string
  safeBottom?: string
}>(), {
  title: '',
  subtitle: '',
  showBack: false,
  bottomPadding: '32rpx',
  safeBottom: 'env(safe-area-inset-bottom, 0px)'
})

const emit = defineEmits<{
  back: []
}>()

const bodyStyle = computed(() => ({
  paddingBottom: `calc(${props.bottomPadding} + ${props.safeBottom})`
}))

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
.as-page-card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: $bg-page;
}

/* ===== Header ===== */
.as-page-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-4 $s-5;
  background: $bg-card;
  border-bottom: 2rpx solid $line-soft;
  flex-shrink: 0;
}

.as-page-card__header-left {
  display: flex;
  align-items: center;
  gap: $s-3;
  flex: 1;
  min-width: 0;
}

.as-page-card__back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  border-radius: $r-full;
  flex-shrink: 0;
}

.as-page-card__back:active {
  background: $bg-soft;
}

/* CSS 绘制返回箭头 */
.as-page-card__back-icon {
  position: relative;
  width: 20rpx;
  height: 20rpx;
}

.as-page-card__back-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 20rpx;
  height: 20rpx;
  border-left: 4rpx solid $ink;
  border-bottom: 4rpx solid $ink;
  transform: rotate(45deg);
}

.as-page-card__title-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.as-page-card__title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
}

.as-page-card__subtitle {
  font-size: $font-size-xs;
  color: $ink-mute;
  margin-top: 2rpx;
}

.as-page-card__header-right {
  flex-shrink: 0;
}

/* ===== Body ===== */
.as-page-card__body {
  flex: 1;
  overflow: auto;
}

/* ===== Footer ===== */
.as-page-card__footer {
  flex-shrink: 0;
  padding: $s-4 $s-5;
  background: $bg-card;
  border-top: 2rpx solid $line-soft;
}
</style>