<template>
  <view class="as-insight-alert-card" :class="`is-${direction}`">
    <!-- 头部：股票信息 + 方向标签 -->
    <view class="as-insight-alert-card__header" :class="`is-${direction}`">
      <view class="as-insight-alert-card__stock">
        <view
          class="as-insight-alert-card__avatar"
          :class="`is-${direction}`"
        >{{ stockName.charAt(0) }}</view>
        <view class="as-insight-alert-card__info">
          <text class="as-insight-alert-card__name">{{ stockName }}</text>
          <text class="as-insight-alert-card__code">{{ stockCode }}</text>
        </view>
      </view>
      <view
        class="as-insight-alert-card__tag"
        :class="`is-${direction}`"
      >
        <text class="as-insight-alert-card__tag-icon">
          <text v-if="direction === 'up'">&#9650;</text>
          <text v-else>&#9660;</text>
        </text>
        {{ tagText }}
      </view>
    </view>

    <!-- 消息体 -->
    <view class="as-insight-alert-card__body">
      <view class="as-insight-alert-card__message">
        <text class="as-insight-alert-card__warn-icon">&#9888;</text>
        <text class="as-insight-alert-card__message-text">{{ message }}</text>
      </view>
    </view>

    <!-- 底部：类型标签 + 置信度 + 时间 -->
    <view class="as-insight-alert-card__footer">
      <view class="as-insight-alert-card__meta">
        <text
          class="as-insight-alert-card__alert-type"
          :class="`is-${direction}`"
        >{{ alertType }}</text>
        <text
          class="as-insight-alert-card__confidence"
          :class="`is-${confidence}`"
        >{{ confidenceLabel }}</text>
      </view>
      <text class="as-insight-alert-card__time">{{ time }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  stockName: string
  stockCode: string
  direction: 'up' | 'down'
  tagText: string
  message: string
  alertType: string
  confidence: 'high' | 'mid' | 'low'
  time: string
}>(), {})

const confidenceLabel = computed(() => {
  switch (props.confidence) {
    case 'high':
      return '高置信'
    case 'mid':
      return '中置信'
    case 'low':
      return '低置信'
  }
})
</script>

<style lang="scss" scoped>
.as-insight-alert-card {
  display: flex;
  flex-direction: column;
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-lg;
  overflow: hidden;
  transition: all $t-base;
}

/* ===== Header ===== */
.as-insight-alert-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-3;

  &.is-up {
    background: $up-bg;
  }

  &.is-down {
    background: $down-bg;
  }
}

.as-insight-alert-card__stock {
  display: flex;
  align-items: center;
  gap: $s-2;
}

.as-insight-alert-card__avatar {
  width: 44rpx;
  height: 44rpx;
  border-radius: $r-full;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-sm;
  font-weight: 700;
  color: $white;
  flex-shrink: 0;

  &.is-up {
    background: $up;
  }

  &.is-down {
    background: $down;
  }
}

.as-insight-alert-card__info {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
}

.as-insight-alert-card__name {
  font-size: $font-size-base;
  font-weight: 600;
  color: $ink;
  line-height: 1.2;
}

.as-insight-alert-card__code {
  font-size: $font-size-xs;
  color: $ink-mute;
  line-height: 1.2;
}

.as-insight-alert-card__tag {
  display: flex;
  align-items: center;
  gap: 4rpx;
  font-size: $font-size-xs;
  font-weight: 600;
  padding: 4rpx 16rpx;
  border-radius: $r-full;
  line-height: 1.4;
  flex-shrink: 0;

  &.is-up {
    background: $up-soft;
    color: $up;
  }

  &.is-down {
    background: $down-soft;
    color: $down;
  }
}

.as-insight-alert-card__tag-icon {
  font-size: 10rpx;
  line-height: 1;
}

/* ===== Body ===== */
.as-insight-alert-card__body {
  padding: $s-3;
  padding-top: $s-2;
}

.as-insight-alert-card__message {
  display: flex;
  gap: $s-1;
}

.as-insight-alert-card__warn-icon {
  font-size: 14rpx;
  color: $warning;
  flex-shrink: 0;
  line-height: $lh-base;
  margin-top: 2rpx;
}

.as-insight-alert-card__message-text {
  font-size: $font-size-sm;
  color: $ink;
  line-height: $lh-base;
  flex: 1;
}

/* ===== Footer ===== */
.as-insight-alert-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-2 $s-3;
  border-top: 2rpx solid $line-soft;
}

.as-insight-alert-card__meta {
  display: flex;
  align-items: center;
  gap: $s-1;
}

.as-insight-alert-card__alert-type {
  font-size: $font-size-xs;
  font-weight: 500;
  padding: 2rpx 12rpx;
  border-radius: $r-xs;
  line-height: 1.4;

  &.is-up {
    background: $up-bg;
    color: $up;
  }

  &.is-down {
    background: $down-bg;
    color: $down;
  }
}

.as-insight-alert-card__confidence {
  font-size: 20rpx;
  font-weight: 500;
  padding: 2rpx 12rpx;
  border-radius: $r-xs;
  line-height: 1.4;

  &.is-high {
    background: $down-soft;
    color: $down;
  }

  &.is-mid {
    background: $warning-soft;
    color: $warning;
  }

  &.is-low {
    background: $bg-soft;
    color: $ink-mute;
  }
}

.as-insight-alert-card__time {
  font-size: $font-size-xs;
  color: $ink-mute;
  display: flex;
  align-items: center;
  gap: 4rpx;
}
</style>