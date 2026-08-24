<template>
  <view class="as-hot-burst">
    <view class="as-hot-burst__header">
      <view class="as-hot-burst__title-row">
        <view class="as-hot-burst__icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </view>
        <text class="as-hot-burst__title">热点爆发</text>
      </view>
      <text class="as-hot-burst__time">{{ time }}</text>
    </view>
    <view class="as-hot-burst__list">
      <view
        v-for="(item, i) in items"
        :key="i"
        class="as-hot-burst__item"
      >
        <text class="as-hot-burst__name">{{ item.name }}</text>
        <text class="as-hot-burst__pct">{{ formatPct(item.pct) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  time: string
  items: Array<{ name: string; pct: number }>
}>(), {
  time: '',
  items: () => []
})

function formatPct(pct: number): string {
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}
</script>

<style lang="scss" scoped>
.as-hot-burst {
  background: $up-bg;
  border-radius: $r-md;
  padding: $s-3;
}

.as-hot-burst__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $s-2;
}

.as-hot-burst__title-row {
  display: flex;
  align-items: center;
  gap: $s-1;
}

.as-hot-burst__icon {
  display: flex;
  align-items: center;
  color: $up;
  line-height: 1;
}

.as-hot-burst__title {
  font-size: $font-size-base;
  color: $up;
  font-weight: 700;
}

.as-hot-burst__time {
  font-size: $font-size-xs;
  color: $ink-mute;
}

.as-hot-burst__list {
  display: flex;
  flex-direction: column;
  gap: $s-1;
}

.as-hot-burst__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-1 0;
}

.as-hot-burst__name {
  font-size: $font-size-sm;
  color: $ink;
  font-weight: 500;
}

.as-hot-burst__pct {
  font-size: $font-size-sm;
  color: $up;
  font-weight: 700;
  font-family: $font-mono;
}
</style>