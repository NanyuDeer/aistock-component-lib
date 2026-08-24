<template>
  <view class="as-insight-list-card">
    <!-- 标题行 -->
    <view class="as-insight-list-card__header">
      <text class="as-insight-list-card__icon">&#9432;</text>
      <text class="as-insight-list-card__title">{{ title }}</text>
    </view>

    <!-- 列表项 -->
    <view
      v-for="(item, idx) in items"
      :key="idx"
      class="as-insight-list-card__item"
    >
      <view
        class="as-insight-list-card__dot"
        :class="`is-${item.direction}`"
      />
      <text class="as-insight-list-card__text">{{ item.text }}</text>
      <text class="as-insight-list-card__time">{{ item.time }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
interface InsightItem {
  text: string
  time: string
  direction: 'up' | 'down' | 'neutral'
}

withDefaults(defineProps<{
  title?: string
  items: InsightItem[]
}>(), {
  title: '今日洞察'
})
</script>

<style lang="scss" scoped>
.as-insight-list-card {
  display: flex;
  flex-direction: column;
  gap: $s-2;
  padding: $s-3;
  background: $bg-card;
  border-radius: $r-md;
}

/* ===== Header ===== */
.as-insight-list-card__header {
  display: flex;
  align-items: center;
  gap: $s-1;
  padding-bottom: $s-2;
  border-bottom: 2rpx solid $line-soft;
}

.as-insight-list-card__icon {
  font-size: $font-size-base;
  color: $primary;
  line-height: 1;
}

.as-insight-list-card__title {
  font-size: $font-size-base;
  font-weight: 600;
  color: $primary;
}

/* ===== Items ===== */
.as-insight-list-card__item {
  display: flex;
  align-items: flex-start;
  gap: $s-1;
}

.as-insight-list-card__dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: $r-full;
  flex-shrink: 0;
  margin-top: 8rpx;

  &.is-up {
    background: $up;
  }

  &.is-down {
    background: $down;
  }

  &.is-neutral {
    background: $ink-mute;
  }
}

.as-insight-list-card__text {
  flex: 1;
  font-size: $font-size-sm;
  color: $ink;
  line-height: $lh-base;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.as-insight-list-card__time {
  flex-shrink: 0;
  font-size: $font-size-xs;
  color: $ink-mute;
  line-height: $lh-base;
  white-space: nowrap;
}
</style>