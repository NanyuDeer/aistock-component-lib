<template>
  <view class="as-ticker">
    <view
      class="as-ticker__track"
      :style="animationStyle"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <view
        v-for="(item, index) in duplicatedItems"
        :key="index"
        class="as-ticker__item"
      >
        <text class="as-ticker__item-name">{{ item.name }}</text>
        <text class="as-ticker__item-price">{{ formattedPrice(item.price) }}</text>
        <text
          class="as-ticker__item-change"
          :class="changeClass(item.changePct)"
        >{{ formattedChangePct(item.changePct) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface TickerItem {
  name: string
  price: number
  changePct: number
}

const props = withDefaults(defineProps<{
  items: TickerItem[]
  speed?: number
}>(), {
  speed: 30
})

const isPaused = ref(false)

const duplicatedItems = computed(() => {
  return [...props.items, ...props.items]
})

const animationStyle = computed(() => {
  const duration = props.speed > 0 ? props.speed : 30
  const state = isPaused.value ? 'paused' : 'running'
  return {
    animationDuration: `${duration}s`,
    animationPlayState: state
  }
})

const formattedPrice = (price: number): string => {
  return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formattedChangePct = (changePct: number): string => {
  const sign = changePct > 0 ? '+' : ''
  return `${sign}${changePct.toFixed(2)}%`
}

const changeClass = (changePct: number): Record<string, boolean> => ({
  'is-up': changePct > 0,
  'is-down': changePct < 0,
  'is-flat': changePct === 0
})

const onMouseEnter = () => {
  isPaused.value = true
}

const onMouseLeave = () => {
  isPaused.value = false
}
</script>

<style lang="scss" scoped>
.as-ticker {
  width: 100%;
  overflow: hidden;
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-md;
  padding: $s-2 0;
}

.as-ticker__track {
  display: flex;
  align-items: center;
  gap: 0;
  white-space: nowrap;
  animation: as-ticker-scroll 30s linear infinite;
}

@keyframes as-ticker-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.as-ticker__item {
  display: inline-flex;
  align-items: baseline;
  gap: $s-2;
  padding: 0 $s-4;
  flex-shrink: 0;

  & + & {
    border-left: 2rpx solid $line-soft;
  }
}

.as-ticker__item-name {
  font-size: $font-size-sm;
  color: $ink-soft;
  font-weight: 500;
  white-space: nowrap;
}

.as-ticker__item-price {
  font-size: $font-size-sm;
  font-weight: 600;
  font-family: $font-mono;
  color: $ink;
  white-space: nowrap;
}

.as-ticker__item-change {
  font-size: $font-size-xs;
  font-weight: 600;
  font-family: $font-mono;
  white-space: nowrap;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
  &.is-flat { color: $flat; }
}
</style>