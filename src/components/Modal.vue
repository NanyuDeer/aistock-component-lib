<template>
  <view v-if="modelValue" class="as-modal" @click="handleMaskClick">
    <view class="as-modal__mask"></view>
    <view class="as-modal__container" :class="`as-modal__container--${size}`" @click.stop>
      <view v-if="title || $slots.header" class="as-modal__header">
        <text v-if="title" class="as-modal__title">{{ title }}</text>
        <slot v-else name="header" />
        <view class="as-modal__close" @click="handleClose">
          <view class="as-modal__close-icon"></view>
        </view>
      </view>
      <view class="as-modal__body">
        <slot />
      </view>
      <view v-if="$slots.footer" class="as-modal__footer">
        <slot name="footer" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type ModalSize = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  size?: ModalSize
  maskClosable?: boolean
}>(), {
  title: '',
  size: 'md',
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
.as-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-modal;
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-modal__mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $overlay-base;
}

.as-modal__container {
  position: relative;
  background: $bg-card;
  border-radius: $r-2xl;
  box-shadow: $shadow-hover;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  animation: as-modal-in 0.3s $ease-out;
}

@keyframes as-modal-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.as-modal__container--sm { width: 600rpx; }
.as-modal__container--md { width: 800rpx; }
.as-modal__container--lg { width: 1000rpx; }

.as-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-5;
  border-bottom: 2rpx solid $line-soft;
}

.as-modal__title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $ink;
}

.as-modal__close {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $r-full;
}

.as-modal__close:active {
  background: $bg-soft;
}

.as-modal__close-icon {
  position: relative;
  width: 24rpx;
  height: 24rpx;
}

.as-modal__close-icon::before,
.as-modal__close-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24rpx;
  height: 4rpx;
  background: $ink-soft;
  border-radius: 2rpx;
}

.as-modal__close-icon::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.as-modal__close-icon::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.as-modal__body {
  padding: $s-5;
  overflow-y: auto;
  flex: 1;
}

.as-modal__footer {
  padding: $s-4 $s-5;
  border-top: 2rpx solid $line-soft;
  display: flex;
  justify-content: flex-end;
  gap: $s-3;
}
</style>