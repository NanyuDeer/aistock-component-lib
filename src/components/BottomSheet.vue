<template>
  <view v-if="isOpen" class="as-bottom-sheet" @click="handleMaskClick">
    <view class="as-bottom-sheet__mask"></view>
    <view class="as-bottom-sheet__container" @click.stop>
      <view class="as-bottom-sheet__handle"></view>
      <view v-if="title" class="as-bottom-sheet__header">
        <text class="as-bottom-sheet__title">{{ title }}</text>
      </view>
      <scroll-view class="as-bottom-sheet__body" scroll-y>
        <slot />
      </scroll-view>
      <view v-if="$slots.footer" class="as-bottom-sheet__footer">
        <slot name="footer" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  open?: boolean
  title?: string
  maskClosable?: boolean
}>(), {
  open: false,
  title: '',
  maskClosable: true
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
}>()

const isOpen = ref(props.open)

watch(() => props.open, (val) => {
  isOpen.value = val
})

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

const handleClose = () => {
  isOpen.value = false
  emit('update:open', false)
  emit('close')
}
</script>

<style lang="scss" scoped>
.as-bottom-sheet {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-drawer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.as-bottom-sheet__mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $overlay-base;
  animation: as-bottom-sheet-fade 0.25s $ease-out;
}

@keyframes as-bottom-sheet-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.as-bottom-sheet__container {
  position: relative;
  background: $bg-card;
  border-radius: $r-2xl $r-2xl 0 0;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  animation: as-bottom-sheet-slide 0.3s $ease-out;
}

@keyframes as-bottom-sheet-slide {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.as-bottom-sheet__handle {
  width: 64rpx;
  height: 8rpx;
  background: $ink-faint;
  border-radius: $r-full;
  margin: $s-2 auto;
  flex-shrink: 0;
}

.as-bottom-sheet__header {
  padding: $s-2 $s-5 $s-4;
  flex-shrink: 0;
}

.as-bottom-sheet__title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
}

.as-bottom-sheet__body {
  flex: 1;
  padding: 0 $s-5 $s-5;
  overflow-y: auto;
}

.as-bottom-sheet__footer {
  padding: $s-4 $s-5;
  border-top: 2rpx solid $line-soft;
  flex-shrink: 0;
}
</style>