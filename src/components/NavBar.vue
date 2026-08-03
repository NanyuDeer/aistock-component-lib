<template>
  <view class="as-navbar" :class="{ 'is-transparent': transparent }">
    <view class="as-navbar__left">
      <slot name="left">
        <view v-if="back" class="as-navbar__back" @click="handleBack">
          <SvgIcon name="arrow-left" size="36rpx" color="#0a1733" />
          <text v-if="leftText" class="as-navbar__back-text">{{ leftText }}</text>
        </view>
      </slot>
    </view>
    <text class="as-navbar__title">{{ title }}</text>
    <view class="as-navbar__right">
      <slot name="right" />
    </view>
  </view>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

const props = withDefaults(defineProps<{
  title?: string
  back?: boolean
  leftText?: string
  transparent?: boolean
}>(), {
  title: '',
  back: false,
  leftText: '',
  transparent: false
})

const emit = defineEmits<{
  back: []
}>()

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
.as-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88rpx;
  padding-top: $safe-top;
  padding-left: $s-4;
  padding-right: $s-4;
  background: $bg-card;
  border-bottom: 2rpx solid $line-soft;
  box-sizing: content-box;
}

.as-navbar.is-transparent {
  background: transparent;
  border-bottom: none;
}

.as-navbar__left {
  position: absolute;
  left: $s-4;
  top: $safe-top;
  height: 88rpx;
  display: flex;
  align-items: center;
  z-index: 1;
}

.as-navbar__back {
  display: flex;
  align-items: center;
  padding: 8rpx 0;
  gap: 8rpx;
}

.as-navbar__back:active {
  opacity: $op-active;
}

.as-navbar__back-text {
  font-size: $font-size-base;
  color: $ink;
  line-height: 1;
}

.as-navbar__title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.as-navbar__right {
  position: absolute;
  right: $s-4;
  top: $safe-top;
  height: 88rpx;
  display: flex;
  align-items: center;
  z-index: 1;
}
</style>