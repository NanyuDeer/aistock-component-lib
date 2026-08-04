<template>
  <view
    class="as-quote-header"
    :class="[`is-${statusClass}`]"
  >
    <view class="as-quote-header__main">
      <view class="as-quote-header__info">
        <view class="as-quote-header__name-row">
          <text class="as-quote-header__name">{{ name }}</text>
          <text v-if="code" class="as-quote-header__code">{{ code }}</text>
          <text v-if="tag" class="as-quote-header__tag" :class="`is-${statusClass}`">{{ tag }}</text>
        </view>
        <view class="as-quote-header__price-row">
          <text class="as-quote-header__price" :class="`is-${statusClass}`">{{ formattedPrice }}</text>
          <text class="as-quote-header__change" :class="`is-${statusClass}`">{{ formattedChange }}</text>
          <text class="as-quote-header__percent" :class="`is-${statusClass}`">{{ formattedPercent }}</text>
        </view>
      </view>
      <view v-if="$slots.default" class="as-quote-header__actions">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type QuoteStatus = 'normal' | 'up' | 'down'

const props = withDefaults(defineProps<{
  name: string
  code?: string
  price: number
  change: number
  changePct: number
  tag?: string
  status?: QuoteStatus
}>(), {
  code: '',
  tag: '',
  status: 'normal'
})

const statusClass = computed(() => {
  if (props.status !== 'normal') return props.status
  if (props.change > 0) return 'up'
  if (props.change < 0) return 'down'
  return 'normal'
})

const formattedPrice = computed(() => {
  return props.price.toFixed(2)
})

const formattedChange = computed(() => {
  const sign = props.change > 0 ? '+' : ''
  return `${sign}${props.change.toFixed(2)}`
})

const formattedPercent = computed(() => {
  const sign = props.changePct > 0 ? '+' : ''
  return `${sign}${props.changePct.toFixed(2)}%`
})
</script>

<style lang="scss" scoped>
.as-quote-header {
  background: $bg-card;
  border-radius: $r-xl;
  padding: $s-4 $s-5;
  border: 2rpx solid $line;
}

.as-quote-header__main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.as-quote-header__info {
  flex: 1;
  min-width: 0;
}

/* ===== Name Row ===== */
.as-quote-header__name-row {
  display: flex;
  align-items: center;
  gap: $s-2;
  margin-bottom: $s-2;
  flex-wrap: wrap;
}

.as-quote-header__name {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $ink;
}

.as-quote-header__code {
  font-size: $font-size-xs;
  color: $ink-mute;
  font-family: $font-mono;
}

.as-quote-header__tag {
  font-size: 20rpx;
  font-weight: 600;
  padding: 2rpx 14rpx;
  border-radius: $r-full;
  line-height: 1.4;

  &.is-up {
    background: $up-soft;
    color: $up;
  }

  &.is-down {
    background: $down-soft;
    color: $down;
  }

  &.is-normal {
    background: $primary-50;
    color: $primary;
  }
}

/* ===== Price Row ===== */
.as-quote-header__price-row {
  display: flex;
  align-items: baseline;
  gap: $s-3;
  flex-wrap: wrap;
}

.as-quote-header__price {
  font-size: $font-size-3xl;
  font-weight: 800;
  font-family: $font-mono;
  line-height: $lh-tight;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
  &.is-normal { color: $ink; }
}

.as-quote-header__change {
  font-size: $font-size-lg;
  font-weight: 600;
  font-family: $font-mono;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
  &.is-normal { color: $flat; }
}

.as-quote-header__percent {
  font-size: $font-size-sm;
  font-weight: 600;
  font-family: $font-mono;
  padding: 2rpx 14rpx;
  border-radius: $r-xs;

  &.is-up {
    color: $up;
    background: $up-soft;
  }

  &.is-down {
    color: $down;
    background: $down-soft;
  }

  &.is-normal {
    color: $flat;
    background: $bg-deep;
  }
}

/* ===== Actions ===== */
.as-quote-header__actions {
  flex-shrink: 0;
  margin-left: $s-4;
}
</style>