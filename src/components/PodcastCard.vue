<template>
  <view class="as-podcast-card">
    <!-- 头部 -->
    <view class="as-podcast-card__header">
      <view class="as-podcast-card__icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b5fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      </view>
      <text class="as-podcast-card__title">{{ title }}</text>
    </view>

    <!-- 描述文本 -->
    <text v-if="desc" class="as-podcast-card__desc">{{ desc }}</text>

    <!-- 状态内容区 -->
    <view class="as-podcast-card__status">
      <!-- idle 态：生成按钮 -->
      <view v-if="status === 'idle'" class="as-podcast-card__idle">
        <view class="as-podcast-card__generate-btn" hover-class="as-podcast-card__generate-btn--hover" @click="emit('generate')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <text class="as-podcast-card__generate-text">生成播报</text>
        </view>
      </view>

      <!-- loading 态：加载动画 -->
      <view v-if="status === 'loading'" class="as-podcast-card__loading">
        <view class="as-podcast-card__pulse">
          <view class="as-podcast-card__pulse-dot" />
          <view class="as-podcast-card__pulse-dot" />
          <view class="as-podcast-card__pulse-dot" />
        </view>
        <text class="as-podcast-card__loading-text">正在合成播报音频，约 5-15 秒...</text>
      </view>

      <!-- ready 态：播放按钮 + 时长 -->
      <view v-if="status === 'ready'" class="as-podcast-card__ready">
        <view class="as-podcast-card__play-btn" hover-class="as-podcast-card__play-btn--hover" @click="emit('play')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M8 5v14l11-7z" />
          </svg>
        </view>
        <text v-if="duration" class="as-podcast-card__duration">{{ duration }}</text>
      </view>

      <!-- error 态：错误提示 + 重试 -->
      <view v-if="status === 'error'" class="as-podcast-card__error">
        <view class="as-podcast-card__error-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c89020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </view>
        <text class="as-podcast-card__error-text">生成失败</text>
        <view class="as-podcast-card__retry-btn" hover-class="as-podcast-card__retry-btn--hover" @click="emit('retry')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          <text class="as-podcast-card__retry-text">重试</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type PodcastStatus = 'idle' | 'loading' | 'ready' | 'error'

const props = withDefaults(defineProps<{
  title: string
  desc?: string
  duration?: string
  status?: PodcastStatus
  cover?: string
}>(), {
  status: 'idle'
})

const emit = defineEmits<{
  generate: []
  play: []
  retry: []
}>()
</script>

<style lang="scss" scoped>
.as-podcast-card {
  background: $bg-card;
  border-radius: $r-lg;
  box-shadow: $shadow-card;
  padding: $s-4;
}

/* ===== 头部 ===== */
.as-podcast-card__header {
  display: flex;
  align-items: center;
  gap: $s-2;
  margin-bottom: $s-3;
}

.as-podcast-card__icon {
  width: 36rpx;
  height: 36rpx;
  border-radius: $r-xs;
  background: $primary-50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.as-podcast-card__title {
  font-size: $font-size-base;
  font-weight: 600;
  color: $ink;
  line-height: $lh-base;
}

/* ===== 描述 ===== */
.as-podcast-card__desc {
  display: block;
  font-size: $font-size-sm;
  color: $ink-soft;
  line-height: $lh-base;
  margin-bottom: $s-3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ===== 状态区 ===== */
.as-podcast-card__status {
  min-height: 48rpx;
  display: flex;
  align-items: center;
}

/* ===== idle 态 ===== */
.as-podcast-card__idle {
  display: flex;
}

.as-podcast-card__generate-btn {
  display: flex;
  align-items: center;
  gap: $s-1;
  padding: $s-1 $s-3;
  background: $brand-gradient;
  border-radius: $r-sm;
  cursor: pointer;
  transition: $t-fast;
}

.as-podcast-card__generate-btn--hover {
  opacity: $op-active;
  box-shadow: $shadow-primary;
}

.as-podcast-card__generate-text {
  font-size: $font-size-sm;
  font-weight: 500;
  color: $white;
  line-height: 1;
}

/* ===== loading 态 ===== */
.as-podcast-card__loading {
  display: flex;
  align-items: center;
  gap: $s-3;
}

.as-podcast-card__pulse {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.as-podcast-card__pulse-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: $primary;
  animation: pulse-dot 1.4s ease-in-out infinite both;
}

.as-podcast-card__pulse-dot:nth-child(1) {
  animation-delay: 0s;
}

.as-podcast-card__pulse-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.as-podcast-card__pulse-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse-dot {
  0%, 80%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  40% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.as-podcast-card__loading-text {
  font-size: $font-size-sm;
  color: $ink-mute;
  line-height: $lh-base;
}

/* ===== ready 态 ===== */
.as-podcast-card__ready {
  display: flex;
  align-items: center;
  gap: $s-3;
}

.as-podcast-card__play-btn {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: $brand-gradient;
  box-shadow: $shadow-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: $t-fast;
}

.as-podcast-card__play-btn--hover {
  opacity: $op-active;
  box-shadow: $shadow-hover;
}

.as-podcast-card__duration {
  font-size: $font-size-sm;
  color: $ink-mute;
  font-family: $font-mono;
  line-height: 1;
}

/* ===== error 态 ===== */
.as-podcast-card__error {
  display: flex;
  align-items: center;
  gap: $s-2;
}

.as-podcast-card__error-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.as-podcast-card__error-text {
  font-size: $font-size-sm;
  color: $warning;
  line-height: 1;
}

.as-podcast-card__retry-btn {
  display: flex;
  align-items: center;
  gap: $s-1;
  padding: $s-1 $s-2;
  background: $warning;
  border-radius: $r-xs;
  cursor: pointer;
  transition: $t-fast;
  margin-left: auto;
}

.as-podcast-card__retry-btn--hover {
  opacity: $op-active;
}

.as-podcast-card__retry-text {
  font-size: $font-size-xs;
  color: $white;
  line-height: 1;
}
</style>