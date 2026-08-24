<template>
  <view v-if="visible" class="as-news-slider">
    <view
      class="as-news-slider__slide"
      @tap="handleClick"
    >
      <text class="as-news-slider__tag">{{ currentNews.tag }}</text>
      <text class="as-news-slider__title">{{ currentNews.title }}</text>
      <text class="as-news-slider__source">{{ currentNews.source }}</text>
    </view>
    <view class="as-news-slider__dots">
      <view
        v-for="(_, i) in news"
        :key="i"
        class="as-news-slider__dot"
        :class="{ 'is-active': i === currentIndex }"
        @tap="handleDotClick(i)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  news: Array<{ tag: string; title: string; source: string }>
  interval?: number
  visible?: boolean
}>(), {
  interval: 4000,
  visible: true
})

const emit = defineEmits<{
  (e: 'change', index: number): void
  (e: 'click', news: { tag: string; title: string; source: string }): void
}>()

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const currentNews = computed(() => {
  if (props.news.length === 0) {
    return { tag: '', title: '', source: '' }
  }
  return props.news[currentIndex.value] ?? props.news[0]
})

function startTimer(): void {
  stopTimer()
  if (props.news.length <= 1) return
  timer = setInterval(() => {
    nextSlide()
  }, props.interval)
}

function stopTimer(): void {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

function nextSlide(): void {
  if (props.news.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % props.news.length
  emit('change', currentIndex.value)
}

function handleDotClick(index: number): void {
  if (index === currentIndex.value) return
  currentIndex.value = index
  emit('change', index)
  startTimer()
}

function handleClick(): void {
  emit('click', currentNews.value)
}

watch(() => props.news, () => {
  currentIndex.value = 0
  startTimer()
})

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style lang="scss" scoped>
.as-news-slider {
  position: relative;
  border-radius: $r-lg;
  overflow: hidden;
  background: $brand-gradient;
  min-height: 140rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $s-4 $s-4 $s-6;
}

.as-news-slider__slide {
  display: flex;
  flex-direction: column;
  gap: $s-1;
}

.as-news-slider__tag {
  display: inline-flex;
  align-self: flex-start;
  font-size: $font-size-xs;
  color: $white;
  background: rgba(255, 255, 255, 0.2);
  border-radius: $r-xs;
  padding: 2rpx 12rpx;
  font-weight: 500;
}

.as-news-slider__title {
  font-size: $font-size-base;
  color: $white;
  font-weight: 600;
  line-height: $lh-base;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.as-news-slider__source {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.7);
}

.as-news-slider__dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $s-1;
  margin-top: $s-2;
}

.as-news-slider__dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: $r-full;
  background: rgba(255, 255, 255, 0.4);
  transition: all $t-fast;

  &.is-active {
    width: 24rpx;
    background: $white;
  }
}
</style>