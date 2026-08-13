<template>
  <view class="as-event-headline-card">
    <text class="as-event-headline-card__badge">头条</text>
    <text class="as-event-headline-card__title">{{ title }}</text>
    <text class="as-event-headline-card__source">来源：{{ source }} &#183; {{ time }}</text>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  source: string
  time: string
}>()
</script>

<style lang="scss" scoped>
.as-event-headline-card {
  display: flex;
  flex-direction: column;
  gap: $s-2;
  padding: $s-4;
  background: $brand-gradient;
  border-radius: $r-lg;
  box-shadow: $shadow-card;
}

.as-event-headline-card__badge {
  display: inline-flex;
  align-self: flex-start;
  font-size: 20rpx;
  font-weight: 700;
  padding: 2rpx 16rpx;
  background: rgba(255, 255, 255, 0.2);
  color: $white;
  border-radius: $r-xs;
  line-height: 1.4;
}

.as-event-headline-card__title {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $white;
  line-height: $lh-tight;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.as-event-headline-card__source {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
}
</style>