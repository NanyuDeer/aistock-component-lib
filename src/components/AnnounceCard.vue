<template>
  <view
    class="as-announce-card"
    :class="[`is-${type}`]"
    @click="handleClick"
  >
    <view class="as-announce-card__header">
      <text
        class="as-announce-card__tag"
        :class="`is-${type}`"
      >{{ tagLabel }}</text>
      <text v-if="time" class="as-announce-card__time">{{ time }}</text>
    </view>
    <text class="as-announce-card__title">{{ title }}</text>
    <text v-if="summary" class="as-announce-card__summary">{{ summary }}</text>
    <view v-if="$slots.default || $slots.footer" class="as-announce-card__footer">
      <view v-if="source" class="as-announce-card__source">{{ source }}</view>
      <view v-if="$slots.default" class="as-announce-card__actions">
        <slot />
      </view>
      <slot name="footer" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AnnounceType = 'announce' | 'research'

const props = withDefaults(defineProps<{
  type?: AnnounceType
  title: string
  source?: string
  time?: string
  summary?: string
}>(), {
  type: 'announce',
  source: '',
  time: '',
  summary: ''
})

const emit = defineEmits<{
  click: []
}>()

const tagLabel = computed(() => {
  return props.type === 'research' ? '研报' : '公告'
})

const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.as-announce-card {
  display: flex;
  flex-direction: column;
  gap: $s-2;
  padding: $s-4;
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-lg;
  transition: all $t-base;
  cursor: pointer;
  user-select: none;
}

.as-announce-card:active {
  transform: scale(0.995);
  background: $bg-soft;
}

/* ===== Left color bar ===== */
.as-announce-card {
  position: relative;
  overflow: hidden;
}

.as-announce-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6rpx;
}

.as-announce-card.is-announce::before {
  background: $primary;
}

.as-announce-card.is-research::before {
  background: $gold;
}

/* ===== Header ===== */
.as-announce-card__header {
  display: flex;
  align-items: center;
  gap: $s-2;
  padding-left: 12rpx;
}

.as-announce-card__tag {
  font-size: 20rpx;
  font-weight: 600;
  padding: 2rpx 14rpx;
  border-radius: $r-xs;
  line-height: 1.4;

  &.is-announce {
    background: $primary-50;
    color: $primary;
  }

  &.is-research {
    background: $gold-soft;
    color: $gold-deep;
  }
}

.as-announce-card__time {
  font-size: $font-size-xs;
  color: $ink-mute;
}

/* ===== Title ===== */
.as-announce-card__title {
  font-size: $font-size-md;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
  padding-left: 12rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ===== Summary ===== */
.as-announce-card__summary {
  font-size: $font-size-xs;
  color: $ink-soft;
  line-height: $lh-base;
  padding-left: 12rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ===== Footer ===== */
.as-announce-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 12rpx;
  padding-top: $s-2;
  margin-top: $s-1;
  border-top: 2rpx solid $line-soft;
}

.as-announce-card__source {
  font-size: $font-size-xs;
  color: $ink-mute;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.as-announce-card__actions {
  flex-shrink: 0;
  margin-left: $s-3;
}
</style>