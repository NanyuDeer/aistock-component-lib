<template>
  <view class="as-fund-flow">
    <view class="as-fund-flow__bars">
      <view
        v-for="(flow, index) in flows"
        :key="index"
        class="as-fund-flow__bar-row"
      >
        <text class="as-fund-flow__bar-day">{{ flow.day }}</text>
        <view class="as-fund-flow__bar-track">
          <view
            class="as-fund-flow__bar-fill"
            :class="flow.main >= 0 ? 'is-up' : 'is-down'"
            :style="barFillStyle(flow.main)"
          ></view>
        </view>
        <text
          class="as-fund-flow__bar-value"
          :class="flow.main >= 0 ? 'is-up' : 'is-down'"
        >{{ formattedValue(flow.main) }}</text>
      </view>
    </view>
    <view v-if="inflow !== undefined || outflow !== undefined" class="as-fund-flow__summary">
      <view v-if="inflow !== undefined" class="as-fund-flow__summary-item">
        <text class="as-fund-flow__summary-label">净流入</text>
        <text class="as-fund-flow__summary-value is-up">{{ formattedValue(inflow!) }}</text>
      </view>
      <view v-if="outflow !== undefined" class="as-fund-flow__summary-item">
        <text class="as-fund-flow__summary-label">净流出</text>
        <text class="as-fund-flow__summary-value is-down">{{ formattedValue(outflow!) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface FundFlowDay {
  day: string
  main: number
}

const props = withDefaults(defineProps<{
  flows: FundFlowDay[]
  inflow?: number
  outflow?: number
}>(), {
  inflow: undefined,
  outflow: undefined
})

const maxAbs = computed(() => {
  if (props.flows.length === 0) return 1
  return Math.max(...props.flows.map(f => Math.abs(f.main)), 1)
})

function barFillStyle(main: number): Record<string, string> {
  const pct = (Math.abs(main) / maxAbs.value) * 100
  return {
    width: `${Math.max(pct, 2)}%`
  }
}

function formattedValue(value: number): string {
  const abs = Math.abs(value)
  const sign = value >= 0 ? '+' : '-'
  if (abs >= 1e8) return `${sign}${(abs / 1e8).toFixed(1)}亿`
  if (abs >= 1e4) return `${sign}${(abs / 1e4).toFixed(1)}万`
  return `${sign}${abs.toFixed(0)}`
}
</script>

<style lang="scss" scoped>
.as-fund-flow {
  display: flex;
  flex-direction: column;
  gap: $s-4;
}

.as-fund-flow__bars {
  display: flex;
  flex-direction: column;
  gap: $s-2;
}

.as-fund-flow__bar-row {
  display: flex;
  align-items: center;
  gap: $s-2;
}

.as-fund-flow__bar-day {
  width: 80rpx;
  font-size: $font-size-xs;
  color: $ink-soft;
  flex-shrink: 0;
}

.as-fund-flow__bar-track {
  flex: 1;
  height: 24rpx;
  background: $bg-soft;
  border-radius: $r-xs;
  position: relative;
  overflow: hidden;
}

.as-fund-flow__bar-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: $r-xs;
  transition: width $t-base;

  &.is-up {
    left: 50%;
    background: $up;
    border-radius: 0 $r-xs $r-xs 0;
  }

  &.is-down {
    right: 50%;
    background: $down;
    border-radius: $r-xs 0 0 $r-xs;
  }
}

.as-fund-flow__bar-value {
  width: 100rpx;
  text-align: right;
  font-size: $font-size-xs;
  font-weight: 600;
  font-family: $font-mono;
  flex-shrink: 0;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
}

.as-fund-flow__summary {
  display: flex;
  gap: $s-4;
  padding-top: $s-3;
  border-top: 2rpx solid $line;
}

.as-fund-flow__summary-item {
  display: flex;
  align-items: center;
  gap: $s-2;
}

.as-fund-flow__summary-label {
  font-size: $font-size-xs;
  color: $ink-mute;
}

.as-fund-flow__summary-value {
  font-size: $font-size-md;
  font-weight: 700;
  font-family: $font-mono;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
}
</style>