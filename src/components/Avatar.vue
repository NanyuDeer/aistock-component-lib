<template>
  <view class="as-avatar" :class="[`as-avatar--${size}`, `as-avatar--${variant}`]" :style="customStyle">
    <image v-if="src" class="as-avatar__img" :src="src" mode="aspectFill" />
    <text v-else class="as-avatar__text">{{ initials }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
type AvatarVariant = 'primary' | 'gold' | 'accent' | 'neutral'

const props = withDefaults(defineProps<{
  src?: string
  text?: string
  size?: AvatarSize
  variant?: AvatarVariant
}>(), {
  src: '',
  text: '',
  size: 'md',
  variant: 'primary'
})

const initials = computed(() => {
  if (!props.text) return ''
  // 取前两个字符作为头像文字
  return props.text.slice(0, 2)
})

const customStyle = computed(() => {
  if (props.src) return {}
  return {}
})
</script>

<style lang="scss" scoped>
.as-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  color: $white;
  font-weight: 700;
}

.as-avatar__img {
  width: 100%;
  height: 100%;
}

.as-avatar__text {
  font-size: inherit;
  line-height: 1;
}

/* ===== Sizes ===== */
.as-avatar--xs {
  width: 48rpx;
  height: 48rpx;
  font-size: 20rpx;
}

.as-avatar--sm {
  width: 56rpx;
  height: 56rpx;
  font-size: 24rpx;
}

.as-avatar--md {
  width: 80rpx;
  height: 80rpx;
  font-size: 30rpx;
}

.as-avatar--lg {
  width: 120rpx;
  height: 120rpx;
  font-size: 44rpx;
}

/* ===== Variants ===== */
.as-avatar--primary {
  background: linear-gradient(135deg, $primary, $primary-deep);
}

.as-avatar--gold {
  background: linear-gradient(135deg, $gold, $gold-deep);
}

.as-avatar--accent {
  background: linear-gradient(135deg, $accent, $primary);
}

.as-avatar--neutral {
  background: linear-gradient(135deg, $ink-mute, $ink-soft);
}
</style>