<template>
  <view class="as-watchlist">
    <view
      v-for="(item, index) in items"
      :key="index"
      class="as-watchlist__row"
      :class="changeClass(item.changePct)"
      @click="handleClick(item, index)"
    >
      <view class="as-watchlist__info">
        <text class="as-watchlist__name">{{ item.name }}</text>
        <text class="as-watchlist__code">{{ item.code }}</text>
      </view>
      <view class="as-watchlist__right">
        <view class="as-watchlist__prices">
          <text class="as-watchlist__price" :class="changeClass(item.changePct)">{{ formattedPrice(item.price) }}</text>
          <text class="as-watchlist__change" :class="changeClass(item.changePct)">{{ formattedChange(item.changePct) }}</text>
        </view>
        <view v-if="$slots.action" class="as-watchlist__action">
          <slot name="action" :item="item" :index="index" />
        </view>
        <view v-if="editable && !$slots.action" class="as-watchlist__action">
          <text class="as-watchlist__delete" @click.stop="handleRemove(index)">删除</text>
        </view>
      </view>
    </view>
    <view v-if="items.length === 0" class="as-watchlist__empty">
      <text class="as-watchlist__empty-text">暂无自选股</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface WatchlistItem {
  name: string
  code: string
  price: number
  changePct: number
}

const props = withDefaults(defineProps<{
  items: WatchlistItem[]
  editable?: boolean
}>(), {
  editable: false
})

const emit = defineEmits<{
  remove: [index: number]
  click: [item: WatchlistItem, index: number]
}>()

function changeClass(changePct: number): Record<string, boolean> {
  return {
    'is-up': changePct > 0,
    'is-down': changePct < 0,
    'is-flat': changePct === 0
  }
}

function formattedPrice(price: number): string {
  return price.toFixed(2)
}

function formattedChange(changePct: number): string {
  const sign = changePct > 0 ? '+' : ''
  return `${sign}${changePct.toFixed(2)}%`
}

function handleClick(item: WatchlistItem, index: number): void {
  emit('click', item, index)
}

function handleRemove(index: number): void {
  emit('remove', index)
}
</script>

<style lang="scss" scoped>
.as-watchlist {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
  background: $line;
  border-radius: $r-xl;
  overflow: hidden;
}

.as-watchlist__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-3 $s-4;
  background: $bg-card;
  cursor: pointer;
  transition: background $t-fast;
}

.as-watchlist__row:active {
  background: $bg-soft;
}

.as-watchlist__info {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  flex: 1;
  min-width: 0;
}

.as-watchlist__name {
  font-size: $font-size-md;
  font-weight: 600;
  color: $ink;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.as-watchlist__code {
  font-size: $font-size-xs;
  color: $ink-mute;
  font-family: $font-mono;
}

.as-watchlist__right {
  display: flex;
  align-items: center;
  gap: $s-3;
  flex-shrink: 0;
}

.as-watchlist__prices {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4rpx;
}

.as-watchlist__price {
  font-size: $font-size-lg;
  font-weight: 700;
  font-family: $font-mono;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
  &.is-flat { color: $flat; }
}

.as-watchlist__change {
  font-size: $font-size-xs;
  font-weight: 600;
  font-family: $font-mono;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
  &.is-flat { color: $flat; }
}

.as-watchlist__action {
  flex-shrink: 0;
}

.as-watchlist__delete {
  font-size: $font-size-xs;
  color: $up;
  font-weight: 500;
  padding: 8rpx 16rpx;
  border-radius: $r-xs;
  background: $up-bg;
}

.as-watchlist__delete:active {
  opacity: $op-active;
}

.as-watchlist__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $s-10 $s-6;
  background: $bg-card;
}

.as-watchlist__empty-text {
  font-size: $font-size-sm;
  color: $ink-mute;
}
</style>