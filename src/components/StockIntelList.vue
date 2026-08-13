<template>
  <view class="as-stock-intel-list">
    <view
      v-for="(item, index) in items"
      :key="index"
      class="as-stock-intel-list__item"
      :class="`is-${item.type}`"
    >
      <view class="as-stock-intel-list__icon" :class="`is-${item.type}`">
        <!-- 搜索图标 - info -->
        <svg
          v-if="item.type === 'info'"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <!-- 趋势上升图标 - up -->
        <svg
          v-if="item.type === 'up'"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        <!-- 警告图标 - warning -->
        <svg
          v-if="item.type === 'warning'"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>
      </view>
      <view class="as-stock-intel-list__body">
        <text class="as-stock-intel-list__title">{{ item.title }}</text>
        <text class="as-stock-intel-list__desc">{{ item.desc }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface IntelItem {
  title: string
  desc: string
  type: 'info' | 'up' | 'warning'
}

const props = withDefaults(defineProps<{
  items: IntelItem[]
}>(), {
  items: () => []
})
</script>

<style lang="scss" scoped>
.as-stock-intel-list {
  display: flex;
  flex-direction: column;
  gap: $s-2;
}

/* ===== Item ===== */
.as-stock-intel-list__item {
  display: flex;
  gap: $s-2;
  background: $bg-card;
  border-radius: $r-md;
  padding: $s-3;
}

/* ===== Icon ===== */
.as-stock-intel-list__icon {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2rpx;

  &.is-info {
    background: $primary-50;
    color: $primary;
  }
  &.is-up {
    background: $up-soft;
    color: $up;
  }
  &.is-warning {
    background: $warning-bg;
    color: $warning;
  }
}

/* ===== Body ===== */
.as-stock-intel-list__body {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  flex: 1;
  min-width: 0;
}

.as-stock-intel-list__title {
  font-size: $font-size-sm;
  font-weight: 600;
  color: $ink;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.as-stock-intel-list__desc {
  font-size: $font-size-xs;
  color: $ink-soft;
  line-height: 1.5;
}
</style>