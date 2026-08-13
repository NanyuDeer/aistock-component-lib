<template>
  <view class="as-chat-bubble" :class="`as-chat-bubble--${role}`">
    <!-- Assistant avatar -->
    <view v-if="role === 'assistant'" class="as-chat-bubble__avatar">
      <view class="as-chat-bubble__avatar-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="4.5" y="8" width="15" height="11" rx="3" />
          <path d="M12 8V4.5" />
          <circle cx="12" cy="3.4" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="9" cy="13" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="13" r="1.1" fill="currentColor" stroke="none" />
          <path d="M9.5 16.5h5" />
        </svg>
      </view>
    </view>

    <!-- Bubble body -->
    <view class="as-chat-bubble__body">
      <!-- User bubble: text content -->
      <text v-if="role === 'user' && content" class="as-chat-bubble__text">{{ content }}</text>

      <!-- Assistant bubble: rich slot or text content -->
      <slot v-else-if="role === 'assistant'" />
      <text v-if="role === 'assistant' && !hasSlotContent && content" class="as-chat-bubble__text">{{ content }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

type BubbleRole = 'user' | 'assistant'

withDefaults(defineProps<{
  role: BubbleRole
  content?: string
  avatar?: string
}>(), {})

const slots = useSlots()
const hasSlotContent = !!(slots.default && slots.default().length > 0)
</script>

<style lang="scss" scoped>
.as-chat-bubble {
  display: flex;
  align-items: flex-start;
  gap: $s-2;
  margin-bottom: $s-3;
  max-width: 100%;
}

/* ===== User: right-aligned ===== */
.as-chat-bubble--user {
  flex-direction: row-reverse;
}

.as-chat-bubble--user .as-chat-bubble__body {
  background: $primary;
  color: $white;
  border-radius: $r-lg $r-xs $r-lg $r-lg;
  padding: $s-2 $s-3;
  max-width: 80%;
}

.as-chat-bubble--user .as-chat-bubble__text {
  color: $white;
  font-size: $font-size-base;
  line-height: $lh-base;
}

/* ===== Assistant: left-aligned ===== */
.as-chat-bubble--assistant .as-chat-bubble__body {
  background: $bg-card;
  color: $ink;
  border-radius: $r-xs $r-lg $r-lg $r-lg;
  padding: $s-2 $s-3;
  max-width: 80%;
  box-shadow: $shadow-sm;
}

.as-chat-bubble--assistant .as-chat-bubble__text {
  color: $ink;
  font-size: $font-size-base;
  line-height: $lh-base;
}

/* ===== Avatar ===== */
.as-chat-bubble__avatar {
  flex-shrink: 0;
  width: 36rpx;
  height: 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-chat-bubble__avatar-icon {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  background: $primary-50;
  color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== Shared ===== */
.as-chat-bubble__body {
  display: inline-block;
  word-break: break-word;
}
</style>