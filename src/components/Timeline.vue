<template>
  <view class="as-timeline" :class="`as-timeline--${mode}`">
    <view
      v-for="(item, index) in items"
      :key="index"
      class="as-timeline__item"
      :class="[
        `as-timeline__item--${item.status || 'primary'}`,
        {
          'is-last': index === items.length - 1,
          'is-alternate-left': mode === 'alternate' && index % 2 === 0,
          'is-alternate-right': mode === 'alternate' && index % 2 !== 0,
          'is-right': mode === 'right'
        }
      ]"
    >
      <view class="as-timeline__dot" />
      <view
        v-if="mode === 'left' || (mode === 'alternate' && index % 2 === 0)"
        class="as-timeline__content"
      >
        <text class="as-timeline__time">{{ item.time }}</text>
        <text class="as-timeline__title">{{ item.title }}</text>
        <text v-if="item.desc" class="as-timeline__desc">{{ item.desc }}</text>
      </view>
      <view
        v-if="mode === 'right'"
        class="as-timeline__content"
      >
        <text class="as-timeline__time">{{ item.time }}</text>
        <text class="as-timeline__title">{{ item.title }}</text>
        <text v-if="item.desc" class="as-timeline__desc">{{ item.desc }}</text>
      </view>
      <view
        v-if="mode === 'alternate' && index % 2 !== 0"
        class="as-timeline__content"
      >
        <text class="as-timeline__time">{{ item.time }}</text>
        <text class="as-timeline__title">{{ item.title }}</text>
        <text v-if="item.desc" class="as-timeline__desc">{{ item.desc }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type TimelineStatus = 'primary' | 'success' | 'warning' | 'danger'
type TimelineMode = 'left' | 'right' | 'alternate'

interface TimelineItem {
  time: string
  title: string
  desc?: string
  status?: TimelineStatus
}

withDefaults(defineProps<{
  items: TimelineItem[]
  mode?: TimelineMode
}>(), {
  mode: 'left'
})
</script>

<style lang="scss" scoped>
.as-timeline {
  position: relative;
  padding: $s-2 0;
}

.as-timeline__item {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding-bottom: $s-6;
}

.as-timeline__item.is-last {
  padding-bottom: 0;
}

/* ===== Dot ===== */
.as-timeline__dot {
  position: relative;
  z-index: 1;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  margin-top: 6rpx;
  flex-shrink: 0;
  background: $primary;
  border: 4rpx solid $primary-50;
}

.as-timeline__item--primary .as-timeline__dot {
  background: $primary;
  border-color: $primary-50;
}

.as-timeline__item--success .as-timeline__dot {
  background: $down;
  border-color: $down-soft;
}

.as-timeline__item--warning .as-timeline__dot {
  background: $warning;
  border-color: $warning-soft;
}

.as-timeline__item--danger .as-timeline__dot {
  background: $up;
  border-color: $up-soft;
}

/* ===== Connecting line ===== */
.as-timeline__dot::after {
  content: '';
  position: absolute;
  top: 24rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 3rpx;
  height: calc(100% + 22rpx);
  background: $line;
}

.as-timeline__item.is-last .as-timeline__dot::after {
  display: none;
}

/* ===== Content ===== */
.as-timeline__content {
  flex: 1;
  min-width: 0;
  margin-left: $s-3;
}

/* ===== Time ===== */
.as-timeline__time {
  display: block;
  font-size: $font-size-xs;
  color: $ink-mute;
  font-family: $font-mono;
  line-height: $lh-tight;
  margin-bottom: $s-1;
}

/* ===== Title ===== */
.as-timeline__title {
  display: block;
  font-size: $font-size-base;
  font-weight: 500;
  color: $ink;
  line-height: $lh-tight;
  margin-bottom: $s-1;
}

/* ===== Desc ===== */
.as-timeline__desc {
  display: block;
  font-size: $font-size-sm;
  color: $ink-soft;
  line-height: $lh-base;
}

/* ===== Right mode ===== */
.as-timeline--right .as-timeline__item {
  flex-direction: row-reverse;
}

.as-timeline--right .as-timeline__content {
  margin-left: 0;
  margin-right: $s-3;
  text-align: right;
}

.as-timeline--right .as-timeline__dot {
  order: 0;
}

/* ===== Alternate mode ===== */
.as-timeline--alternate .as-timeline__item.is-alternate-left {
  flex-direction: row;
  padding-right: 50%;
}

.as-timeline--alternate .as-timeline__item.is-alternate-left .as-timeline__content {
  margin-left: $s-3;
  margin-right: 0;
  text-align: left;
}

.as-timeline--alternate .as-timeline__item.is-alternate-right {
  flex-direction: row-reverse;
  padding-left: 50%;
}

.as-timeline--alternate .as-timeline__item.is-alternate-right .as-timeline__content {
  margin-left: 0;
  margin-right: $s-3;
  text-align: right;
}
</style>