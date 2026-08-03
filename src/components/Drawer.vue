<template>
  <view v-if="modelValue" class="as-drawer" @click="handleMaskClick">
    <view class="as-drawer__mask"></view>
    <view class="as-drawer__container" :class="`as-drawer__container--${placement}`" @click.stop>
      <view v-if="title || $slots.header" class="as-drawer__header">
        <text v-if="title" class="as-drawer__title">{{ title }}</text>
        <slot v-else name="header" />
        <view class="as-drawer__close" @click="handleClose">
          <view class="as-drawer__close-icon"></view>
        </view>
      </view>
      <scroll-view class="as-drawer__body" scroll-y>
        <slot />
      </scroll-view>
      <view v-if="$slots.footer" class="as-drawer__footer">
        <slot name="footer" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type DrawerPlacement = 'left' | 'right' | 'bottom'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  placement?: DrawerPlacement
  maskClosable?: boolean
}>(), {
  title: '',
  placement: 'right',
  maskClosable: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style lang="scss" scoped>
.as-drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-drawer;
  display: flex;
}

.as-drawer__mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $overlay-base;
  animation: as-drawer-fade 0.3s $ease-out;
}

@keyframes as-drawer-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.as-drawer__container {
  position: relative;
  background: $bg-card;
  display: flex;
  flex-direction: column;
  animation: as-drawer-in 0.3s $ease-out;
}

.as-drawer__container--right {
  margin-left: auto;
  height: 100%;
  width: 80%;
  max-width: 800rpx;
  animation-name: as-drawer-right;
}

.as-drawer__container--left {
  margin-right: auto;
  height: 100%;
  width: 80%;
  max-width: 800rpx;
  animation-name: as-drawer-left;
}

.as-drawer__container--bottom {
  margin-top: auto;
  width: 100%;
  max-height: 70%;
  border-radius: $r-2xl $r-2xl 0 0;
  animation-name: as-drawer-bottom;
}

@keyframes as-drawer-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes as-drawer-left {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes as-drawer-bottom {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.as-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-5;
  border-bottom: 2rpx solid $line-soft;
  flex-shrink: 0;
}

.as-drawer__title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $ink;
}

.as-drawer__close {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $r-full;
}

.as-drawer__close:active {
  background: $bg-soft;
}

.as-drawer__close-icon {
  position: relative;
  width: 24rpx;
  height: 24rpx;
}

.as-drawer__close-icon::before,
.as-drawer__close-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24rpx;
  height: 4rpx;
  background: $ink-soft;
  border-radius: 2rpx;
}

.as-drawer__close-icon::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.as-drawer__close-icon::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.as-drawer__body {
  flex: 1;
  padding: $s-5;
}

.as-drawer__footer {
  padding: $s-4 $s-5;
  border-top: 2rpx solid $line-soft;
  flex-shrink: 0;
}
</style>