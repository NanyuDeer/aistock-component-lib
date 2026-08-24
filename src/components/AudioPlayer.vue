<template>
  <view class="as-audio-player">
    <!-- 隐藏的音频元素，实现实际播放 -->
    <audio
      ref="audioRef"
      :src="src"
      :autoplay="autoplay"
      :loop="loop"
      preload="metadata"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
      @play="onPlayEvent"
      @pause="onPauseEvent"
      @loadedmetadata="onLoadedMetadata"
    />

    <!-- 头部：封面 + 标题 -->
    <view class="as-audio-player__header">
      <view class="as-audio-player__cover">
        <image
          v-if="cover"
          class="as-audio-player__cover-img"
          :src="cover"
          mode="aspectFill"
        />
        <svg
          v-else
          class="as-audio-player__cover-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0b5fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </view>
      <text class="as-audio-player__title">{{ title }}</text>
    </view>

    <!-- 控制区：三按钮 -->
    <view class="as-audio-player__controls">
      <!-- 快退 -10s -->
      <view class="as-audio-player__btn as-audio-player__btn--side" hover-class="as-audio-player__btn--hover" @click="skipBack">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#4b5a7a">
          <path d="M11 18V6l-8 6 8 6zM21 18V6l-8 6 8 6z" />
        </svg>
      </view>

      <!-- 播放/暂停 -->
      <view
        class="as-audio-player__btn as-audio-player__btn--main"
        hover-class="as-audio-player__btn--main-hover"
        @click="togglePlay"
      >
        <svg v-if="isPlaying" width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
        </svg>
        <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M8 5v14l11-7z" />
        </svg>
      </view>

      <!-- 快进 +10s -->
      <view class="as-audio-player__btn as-audio-player__btn--side" hover-class="as-audio-player__btn--hover" @click="skipForward">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#4b5a7a">
          <path d="M13 18V6l8 6-8 6zM3 18V6l8 6-8 6z" />
        </svg>
      </view>
    </view>

    <!-- 进度条 -->
    <view class="as-audio-player__progress" @click="seek">
      <view class="as-audio-player__track">
        <view class="as-audio-player__fill" :style="{ width: progressPercent + '%' }" />
        <view class="as-audio-player__thumb" :style="{ left: 'calc(' + progressPercent + '% - 10rpx)' }" />
      </view>
    </view>

    <!-- 时间显示 -->
    <view class="as-audio-player__time">
      <text class="as-audio-player__time-current">{{ formatTime(currentTime) }}</text>
      <text class="as-audio-player__time-total">{{ formatTime(displayDuration) }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  src: string
  duration?: number
  cover?: string
  autoplay?: boolean
}>(), {
  autoplay: false,
  loop: false
})

const emit = defineEmits<{
  play: []
  pause: []
  ended: []
  timeupdate: [currentTime: number]
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const audioDuration = ref(0)
const isLoaded = ref(false)

// 优先使用 props.duration，否则使用音频实际 duration
const displayDuration = computed(() => {
  return props.duration && props.duration > 0 ? props.duration : audioDuration.value
})

// 进度百分比
const progressPercent = computed(() => {
  const total = displayDuration.value
  if (!total || total <= 0) return 0
  return Math.min((currentTime.value / total) * 100, 100)
})

// 播放/暂停
const togglePlay = () => {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play().catch(() => {
      // 自动播放被浏览器阻止
    })
  }
}

// 快退 10 秒
const skipBack = () => {
  if (!audioRef.value) return
  audioRef.value.currentTime = Math.max(0, audioRef.value.currentTime - 10)
}

// 快进 10 秒
const skipForward = () => {
  if (!audioRef.value) return
  const total = displayDuration.value
  audioRef.value.currentTime = Math.min(total, audioRef.value.currentTime + 10)
}

// 点击进度条跳转
const seek = (e: MouseEvent | TouchEvent) => {
  if (!audioRef.value) return
  const target = e.currentTarget as HTMLElement
  if (!target) return

  const rect = target.getBoundingClientRect()
  let clientX: number

  if ('touches' in e) {
    clientX = e.touches[0].clientX
  } else {
    clientX = e.clientX
  }

  const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
  const percent = x / rect.width
  const total = displayDuration.value
  audioRef.value.currentTime = percent * total
}

// 时间格式化 mm:ss
const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// 事件处理
const onTimeUpdate = () => {
  if (!audioRef.value) return
  currentTime.value = audioRef.value.currentTime
  emit('timeupdate', currentTime.value)
}

const onEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
  emit('ended')
}

const onPlayEvent = () => {
  isPlaying.value = true
  emit('play')
}

const onPauseEvent = () => {
  isPlaying.value = false
  emit('pause')
}

const onLoadedMetadata = () => {
  if (!audioRef.value) return
  audioDuration.value = audioRef.value.duration
  isLoaded.value = true
}

// 监听 src 变化时重置
watch(() => props.src, () => {
  currentTime.value = 0
  isPlaying.value = false
  isLoaded.value = false
})
</script>

<style lang="scss" scoped>
.as-audio-player {
  background: $bg-card;
  border-radius: $r-lg;
  box-shadow: $shadow-card;
  padding: $s-4;
}

/* ===== 头部 ===== */
.as-audio-player__header {
  display: flex;
  align-items: center;
  gap: $s-3;
  margin-bottom: $s-4;
}

.as-audio-player__cover {
  width: 48rpx;
  height: 48rpx;
  border-radius: $r-sm;
  background: $primary-50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.as-audio-player__cover-img {
  width: 100%;
  height: 100%;
}

.as-audio-player__cover-icon {
  display: block;
}

.as-audio-player__title {
  flex: 1;
  font-size: $font-size-base;
  font-weight: 600;
  color: $ink;
  line-height: $lh-base;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== 控制区 ===== */
.as-audio-player__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $s-6;
  margin-bottom: $s-4;
}

.as-audio-player__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: $t-fast;
}

.as-audio-player__btn--side {
  width: 56rpx;
  height: 56rpx;
  background: transparent;
}

.as-audio-player__btn--hover {
  opacity: $op-active;
}

.as-audio-player__btn--main {
  width: 72rpx;
  height: 72rpx;
  background: $brand-gradient;
  box-shadow: $shadow-primary;
}

.as-audio-player__btn--main-hover {
  opacity: $op-active;
  box-shadow: $shadow-hover;
}

/* ===== 进度条 ===== */
.as-audio-player__progress {
  padding: $s-1 0;
  cursor: pointer;
  margin-bottom: $s-1;
}

.as-audio-player__track {
  position: relative;
  height: 6rpx;
  background: $line-soft;
  border-radius: 3rpx;
  overflow: visible;
}

.as-audio-player__fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: $primary;
  border-radius: 3rpx;
  transition: width $t-fast;
}

.as-audio-player__thumb {
  position: absolute;
  top: 50%;
  width: 20rpx;
  height: 20rpx;
  background: $primary;
  border-radius: 50%;
  transform: translateY(-50%);
  box-shadow: $shadow-xs;
  transition: left $t-fast;
}

/* ===== 时间显示 ===== */
.as-audio-player__time {
  display: flex;
  justify-content: space-between;
  font-family: $font-mono;
}

.as-audio-player__time-current,
.as-audio-player__time-total {
  font-size: $font-size-xs;
  color: $ink-mute;
  line-height: $lh-base;
}
</style>