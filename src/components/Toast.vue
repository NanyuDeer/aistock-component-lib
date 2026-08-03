<template>
  <view v-if="visible" class="as-toast" :class="`as-toast--${type}`">
    <view class="as-toast__icon">
      <view v-if="type === 'success'" class="as-toast__icon-success"></view>
      <view v-else-if="type === 'error'" class="as-toast__icon-error"></view>
      <view v-else-if="type === 'warning'" class="as-toast__icon-warning"></view>
      <view v-else class="as-toast__icon-info"></view>
    </view>
    <text class="as-toast__text">{{ message }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type ToastType = 'success' | 'error' | 'warning' | 'info'

const props = withDefaults(defineProps<{
  message: string
  type?: ToastType
  duration?: number
}>(), {
  type: 'info',
  duration: 2500
})

const visible = ref(true)
const emit = defineEmits<{
  close: []
}>()

watch(visible, (val) => {
  if (!val) {
    emit('close')
  }
})

let timer: ReturnType<typeof setTimeout> | null = null
if (timer) clearTimeout(timer)
timer = setTimeout(() => {
  visible.value = false
}, props.duration)
</script>

<style lang="scss" scoped>
.as-toast {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: $z-toast;
  display: flex;
  align-items: center;
  gap: $s-2;
  padding: $s-3 $s-5;
  border-radius: $r-full;
  box-shadow: $shadow-card;
  animation: as-toast-in 0.3s $ease-out;
}

@keyframes as-toast-in {
  from { opacity: 0; transform: translateX(-50%) translateY(-20rpx); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.as-toast--success { background: $down; }
.as-toast--error { background: $up; }
.as-toast--warning { background: $warning; }
.as-toast--info { background: $primary; }

.as-toast__text {
  font-size: $font-size-sm;
  color: $white;
  font-weight: 500;
}

.as-toast__icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

/* CSS 绘制图标 - 成功（对勾） */
.as-toast__icon-success {
  position: relative;
  width: 32rpx;
  height: 32rpx;
}

.as-toast__icon-success::before {
  content: '';
  position: absolute;
  top: 8rpx;
  left: 6rpx;
  width: 12rpx;
  height: 20rpx;
  border: solid $white;
  border-width: 0 4rpx 4rpx 0;
  transform: rotate(45deg);
}

/* CSS 绘制图标 - 错误（叉号） */
.as-toast__icon-error {
  position: relative;
  width: 32rpx;
  height: 32rpx;
}

.as-toast__icon-error::before,
.as-toast__icon-error::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24rpx;
  height: 4rpx;
  background: $white;
  border-radius: 2rpx;
}

.as-toast__icon-error::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.as-toast__icon-error::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* CSS 绘制图标 - 警告（感叹号） */
.as-toast__icon-warning {
  position: relative;
  width: 8rpx;
  height: 24rpx;
  background: $white;
  border-radius: 4rpx;
  margin: 4rpx auto;
}

.as-toast__icon-warning::after {
  content: '';
  position: absolute;
  top: 32rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 8rpx;
  height: 8rpx;
  background: $white;
  border-radius: 50%;
}

/* CSS 绘制图标 - 信息（i） */
.as-toast__icon-info {
  position: relative;
  width: 8rpx;
  height: 8rpx;
  background: $white;
  border-radius: 50%;
  margin: 4rpx auto;
}

.as-toast__icon-info::after {
  content: '';
  position: absolute;
  top: 12rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 8rpx;
  height: 16rpx;
  background: $white;
  border-radius: 4rpx;
}
</style>