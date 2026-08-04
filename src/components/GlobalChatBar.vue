<template>
  <view
    class="as-global-chat-bar"
    :class="{ 'is-fixed': fixed }"
    @click="handleClick"
  >
    <view class="as-global-chat-bar__inner">
      <view v-if="back" class="as-global-chat-bar__back" @click.stop="handleBack">
        <SvgIcon name="arrow-left" size="36rpx" color="#8a96b0" />
      </view>
      <view v-if="back" class="as-global-chat-bar__divider"></view>
      <view class="as-global-chat-bar__avatar">
        <text class="as-global-chat-bar__avatar-text">AI</text>
      </view>
      <view class="as-global-chat-bar__content">
        <slot>
          <text class="as-global-chat-bar__placeholder">{{ placeholder }}</text>
        </slot>
      </view>
      <view class="as-global-chat-bar__send">
        <view class="as-global-chat-bar__send-icon">
          <view class="as-global-chat-bar__send-arrow"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

const props = withDefaults(defineProps<{
  placeholder?: string
  back?: boolean
  fixed?: boolean
}>(), {
  placeholder: '问点什么…',
  back: false,
  fixed: true
})

const emit = defineEmits<{
  click: []
  back: []
}>()

const handleClick = () => {
  emit('click')
}

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
.as-global-chat-bar {
  position: relative;
  padding: 0 $s-4;
  padding-bottom: calc($s-3 + $safe-bottom);
  box-sizing: content-box;
}

.as-global-chat-bar.is-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-fixed;
}

.as-global-chat-bar__inner {
  display: flex;
  align-items: center;
  height: 88rpx;
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-full;
  padding: 0 8rpx 0 12rpx;
  box-shadow: $shadow-hover;
}

.as-global-chat-bar__back {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.as-global-chat-bar__back:active {
  opacity: $op-active;
}

.as-global-chat-bar__divider {
  width: 2rpx;
  height: 36rpx;
  background: $line;
  margin: 0 8rpx;
  flex-shrink: 0;
}

.as-global-chat-bar__avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background: $brand-gradient;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.as-global-chat-bar__avatar-text {
  font-size: $font-size-sm;
  font-weight: 700;
  color: $white;
  line-height: 1;
}

.as-global-chat-bar__content {
  flex: 1;
  margin-left: $s-3;
  min-width: 0;
}

.as-global-chat-bar__placeholder {
  font-size: $font-size-base;
  color: $ink-mute;
  line-height: $lh-base;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.as-global-chat-bar__send {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: $shadow-primary;
  margin-left: $s-2;
}

.as-global-chat-bar__send:active {
  opacity: $op-active;
}

.as-global-chat-bar__send-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
}

.as-global-chat-bar__send-arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20rpx;
  height: 20rpx;
  border: 4rpx solid $white;
  border-left: none;
  border-bottom: none;
  transform: translate(-50%, -50%) rotate(45deg);
  border-radius: 2rpx;
}
</style>