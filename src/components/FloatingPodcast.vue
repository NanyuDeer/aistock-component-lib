<template>
  <view
    v-if="visible"
    class="as-floating-podcast"
    :class="{ 'as-floating-podcast--enter': enterAnim, 'as-floating-podcast--leave': !enterAnim }"
    @click="emit('click')"
  >
    <!-- 左侧：播放/暂停按钮 -->
    <view
      class="as-floating-podcast__play-btn"
      hover-class="as-floating-podcast__play-btn--hover"
      @click.stop="emit('toggle-play')"
    >
      <svg v-if="playing" width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
      </svg>
      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M8 5v14l11-7z" />
      </svg>
    </view>

    <!-- 中间：标题 + 进度条 -->
    <view class="as-floating-podcast__info" @click.stop="emit('click')">
      <text class="as-floating-podcast__title">{{ title }}</text>
      <view class="as-floating-podcast__progress">
        <view class="as-floating-podcast__track">
          <view
            class="as-floating-podcast__fill"
            :style="{ width: Math.min(progress, 100) + '%' }"
          />
        </view>
      </view>
    </view>

    <!-- 右侧：关闭按钮 -->
    <view
      class="as-floating-podcast__close"
      hover-class="as-floating-podcast__close--hover"
      @click.stop="emit('close')"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8a96b0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  visible?: boolean
  playing?: boolean
  progress?: number
}>(), {
  visible: true,
  playing: false,
  progress: 0
})

const emit = defineEmits<{
  'toggle-play': []
  close: []
  click: []
}>()

// 进入/离开动画状态
const enterAnim = ref(false)

watch(() => props.visible, (val) => {
  if (val) {
    // 重新显示时重新触发进入动画
    enterAnim.value = false
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        enterAnim.value = true
      })
    })
  } else {
    enterAnim.value = false
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.as-floating-podcast {
  position: fixed;
  left: $s-4;
  right: $s-4;
  bottom: calc($s-4 + $safe-bottom);
  display: flex;
  align-items: center;
  gap: $s-3;
  padding: $s-2 $s-3;
  background: $bg-card;
  border-radius: $r-xl;
  box-shadow: $shadow-hover;
  z-index: $z-fixed;
  cursor: pointer;
  transition: transform $t-base, opacity $t-base;
}

/* ===== 进入/离开动画 ===== */
.as-floating-podcast--enter {
  transform: translateY(0);
  opacity: 1;
}

.as-floating-podcast--leave {
  transform: translateY(120%);
  opacity: 0;
}

/* ===== 播放按钮 ===== */
.as-floating-podcast__play-btn {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background: $brand-gradient;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: $t-fast;
}

.as-floating-podcast__play-btn--hover {
  opacity: $op-active;
  box-shadow: $shadow-primary;
}

/* ===== 信息区 ===== */
.as-floating-podcast__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.as-floating-podcast__title {
  font-size: $font-size-sm;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== 进度条 ===== */
.as-floating-podcast__progress {
  height: 4rpx;
}

.as-floating-podcast__track {
  width: 100%;
  height: 100%;
  background: $line-soft;
  border-radius: 2rpx;
  overflow: hidden;
}

.as-floating-podcast__fill {
  height: 100%;
  background: $primary;
  border-radius: 2rpx;
  transition: width $t-fast;
}

/* ===== 关闭按钮 ===== */
.as-floating-podcast__close {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: $t-fast;
}

.as-floating-podcast__close--hover {
  background: $bg-soft;
}
</style>