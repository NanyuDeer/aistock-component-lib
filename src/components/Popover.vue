<template>
  <view class="as-popover">
    <view class="as-popover__trigger" @click="handleToggle">
      <slot />
    </view>
    <view v-if="visible" class="as-popover__content" :class="`as-popover__content--${placement}`" @click.stop>
      <view v-if="title" class="as-popover__title">
        <text class="as-popover__title-text">{{ title }}</text>
      </view>
      <view class="as-popover__body">
        <slot name="content">
          <text class="as-popover__text">{{ content }}</text>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

withDefaults(defineProps<{
  title?: string
  content?: string
  placement?: PopoverPlacement
}>(), {
  title: '',
  content: '',
  placement: 'bottom'
})

const visible = ref(false)

const handleToggle = () => {
  visible.value = !visible.value
}
</script>

<style lang="scss" scoped>
.as-popover {
  position: relative;
  display: inline-block;
}

.as-popover__trigger {
  display: inline-block;
}

.as-popover__content {
  position: absolute;
  z-index: $z-popover;
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-lg;
  box-shadow: $shadow-card;
  min-width: 200rpx;
  animation: as-popover-in 0.2s $ease-out;
}

@keyframes as-popover-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.as-popover__content--top {
  bottom: calc(100% + #{$s-2});
  left: 50%;
  transform: translateX(-50%);
}

.as-popover__content--bottom {
  top: calc(100% + #{$s-2});
  left: 50%;
  transform: translateX(-50%);
}

.as-popover__content--left {
  right: calc(100% + #{$s-2});
  top: 50%;
  transform: translateY(-50%);
}

.as-popover__content--right {
  left: calc(100% + #{$s-2});
  top: 50%;
  transform: translateY(-50%);
}

.as-popover__title {
  padding: $s-3 $s-4;
  border-bottom: 2rpx solid $line-soft;
}

.as-popover__title-text {
  font-size: $font-size-sm;
  font-weight: 600;
  color: $ink;
}

.as-popover__body {
  padding: $s-3 $s-4;
}

.as-popover__text {
  font-size: $font-size-sm;
  color: $ink-soft;
  line-height: $lh-base;
}
</style>