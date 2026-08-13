<template>
  <view class="as-stock-card-list">
    <view
      v-for="(stock, index) in stocks"
      :key="index"
      class="as-stock-card-list__card"
    >
      <view class="as-stock-card-list__info">
        <text class="as-stock-card-list__name">{{ stock.name }}</text>
        <text class="as-stock-card-list__meta">
          {{ stock.code }}<text v-if="stock.industry"> · {{ stock.industry }}</text>
        </text>
      </view>
      <view class="as-stock-card-list__price" :class="priceTrend(stock.changePct)">
        <text class="as-stock-card-list__price-value">{{ formatPrice(stock.price) }}</text>
        <text class="as-stock-card-list__price-pct">{{ formatChangePct(stock.changePct) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface StockCardItem {
  name: string
  code: string
  industry?: string
  price: number
  changePct: number
}

const props = withDefaults(defineProps<{
  stocks: StockCardItem[]
}>(), {
  stocks: () => []
})

function priceTrend(pct: number): Record<string, boolean> {
  return {
    'is-up': pct > 0,
    'is-down': pct < 0,
    'is-flat': pct === 0
  }
}

function formatPrice(price: number): string {
  return price.toFixed(2)
}

function formatChangePct(pct: number): string {
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(2)}%`
}
</script>

<style lang="scss" scoped>
.as-stock-card-list {
  display: flex;
  flex-direction: column;
  gap: $s-2;
}

/* ===== Card ===== */
.as-stock-card-list__card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $bg-card;
  border-radius: $r-sm;
  padding: $s-3 $s-4;
}

/* ===== Info ===== */
.as-stock-card-list__info {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  flex: 1;
  min-width: 0;
}

.as-stock-card-list__name {
  font-size: $font-size-sm;
  font-weight: 600;
  color: $ink;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.as-stock-card-list__meta {
  font-size: $font-size-xs;
  color: $ink-mute;
}

/* ===== Price ===== */
.as-stock-card-list__price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4rpx;
  flex-shrink: 0;

  &.is-up {
    .as-stock-card-list__price-value { color: $up; }
    .as-stock-card-list__price-pct { color: $up; }
  }
  &.is-down {
    .as-stock-card-list__price-value { color: $down; }
    .as-stock-card-list__price-pct { color: $down; }
  }
  &.is-flat {
    .as-stock-card-list__price-value { color: $ink; }
    .as-stock-card-list__price-pct { color: $ink-mute; }
  }
}

.as-stock-card-list__price-value {
  font-size: $font-size-md;
  font-weight: 700;
  font-family: monospace;
}

.as-stock-card-list__price-pct {
  font-size: $font-size-xs;
  font-weight: 600;
  font-family: monospace;
}
</style>