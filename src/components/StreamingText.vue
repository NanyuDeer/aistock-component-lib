<template>
  <view class="as-streaming-text">
    <text class="as-streaming-text__content">{{ displayedText }}</text>
    <text
      v-if="cursor && !isDone"
      class="as-streaming-text__cursor"
    >|</text>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  speed?: number
  cursor?: boolean
  loop?: boolean
}>(), {
  speed: 50,
  cursor: true,
  loop: false
})

const emit = defineEmits<{
  done: []
}>()

const displayedText = ref('')
const isDone = ref(false)
let timer: ReturnType<typeof setInterval> | null = null
let currentIndex = 0

function startTyping() {
  stopTyping()
  currentIndex = 0
  displayedText.value = ''
  isDone.value = false

  timer = setInterval(() => {
    if (currentIndex < props.text.length) {
      displayedText.value += props.text[currentIndex]
      currentIndex++
    } else {
      stopTyping()
      isDone.value = true
      emit('done')

      if (props.loop) {
        setTimeout(() => startTyping(), 1000)
      }
    }
  }, props.speed)
}

function stopTyping() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

watch(() => props.text, () => {
  startTyping()
}, { immediate: true })

onUnmounted(() => {
  stopTyping()
})
</script>

<style lang="scss" scoped>
.as-streaming-text {
  display: inline;
  font-size: $font-size-base;
  color: $ink;
  line-height: $lh-base;
}

.as-streaming-text__content {
  font-size: inherit;
  color: inherit;
  line-height: inherit;
}

.as-streaming-text__cursor {
  display: inline-block;
  font-size: inherit;
  color: $primary;
  font-weight: 300;
  animation: as-cursor-blink 1s step-end infinite;
  margin-left: 2rpx;
}

@keyframes as-cursor-blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>