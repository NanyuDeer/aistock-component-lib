<template>
  <view
    class="as-event-item-card"
    :class="[`is-${direction}`, `is-${typeColor}`]"
  >
    <!-- 左侧方向色条 -->
    <view class="as-event-item-card__bar" />

    <view class="as-event-item-card__body">
      <!-- 头部：类型标签 + 来源 + 时间 + 星级 -->
      <view class="as-event-item-card__header">
        <text class="as-event-item-card__type" :class="`is-${typeColor}`">{{ type }}</text>
        <view class="as-event-item-card__source">
          <text
            class="as-event-item-card__source-icon"
            :class="{ 'is-unverified': !sourceVerified }"
          >&#128279;</text>
          <text
            class="as-event-item-card__source-text"
            :class="{ 'is-unverified': !sourceVerified }"
          >{{ source }}</text>
        </view>
        <text class="as-event-item-card__time">{{ time }}</text>
        <ImportanceStars class="as-event-item-card__stars" :value="importance" />
      </view>

      <!-- 标题 -->
      <text class="as-event-item-card__title">{{ title }}</text>

      <!-- 影响行业 -->
      <view
        v-if="industries && industries.length > 0"
        class="as-event-item-card__industries"
      >
        <text
          v-for="(ind, idx) in industries"
          :key="idx"
          class="as-event-item-card__industry"
          :class="`is-${ind.direction}`"
        >{{ ind.name }}
          <text v-if="ind.direction === 'up'">&#8593;</text>
          <text v-else-if="ind.direction === 'down'">&#8595;</text>
          <text v-else>&#8594;</text>
        </text>
      </view>

      <!-- AI 摘要 -->
      <view v-if="aiSummary" class="as-event-item-card__ai-summary">
        <text class="as-event-item-card__ai-badge">AI</text>
        <text class="as-event-item-card__ai-text">{{ aiSummary }}</text>
      </view>

      <!-- 底部按钮 -->
      <view class="as-event-item-card__footer">
        <view
          class="as-event-item-card__btn as-event-item-card__btn--ghost"
          @click="emit('follow')"
        >+ 关注</view>
        <view
          class="as-event-item-card__btn as-event-item-card__btn--primary"
          @click="emit('analyze')"
        >AI解析</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import ImportanceStars from './ImportanceStars.vue'

interface Industry {
  name: string
  direction: 'up' | 'down' | 'neutral'
}

const props = withDefaults(defineProps<{
  type: string
  typeColor?: 'policy' | 'company' | 'industry'
  source: string
  sourceVerified?: boolean
  time: string
  importance: number
  title: string
  industries?: Industry[]
  aiSummary?: string
  direction: 'up' | 'down'
}>(), {
  typeColor: 'policy',
  sourceVerified: true,
  industries: () => [],
  aiSummary: ''
})

const emit = defineEmits<{
  follow: []
  analyze: []
}>()
</script>

<style lang="scss" scoped>
.as-event-item-card {
  position: relative;
  display: flex;
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-lg;
  overflow: hidden;
  transition: all $t-base;
}

/* ===== Left color bar ===== */
.as-event-item-card__bar {
  width: 6rpx;
  flex-shrink: 0;
}

.as-event-item-card.is-up .as-event-item-card__bar {
  background: $up;
}

.as-event-item-card.is-down .as-event-item-card__bar {
  background: $down;
}

/* ===== Body ===== */
.as-event-item-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $s-2;
  padding: $s-3;
}

/* ===== Header ===== */
.as-event-item-card__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: $s-1;
}

.as-event-item-card__type {
  font-size: 20rpx;
  font-weight: 600;
  padding: 2rpx 14rpx;
  border-radius: $r-xs;
  line-height: 1.4;
  flex-shrink: 0;

  &.is-policy {
    background: $primary-50;
    color: $primary;
  }

  &.is-company {
    background: $gold-soft;
    color: $gold-deep;
  }

  &.is-industry {
    background: $down-soft;
    color: $down;
  }
}

.as-event-item-card__source {
  display: flex;
  align-items: center;
  gap: 4rpx;
  flex-shrink: 0;
}

.as-event-item-card__source-icon {
  font-size: 18rpx;
  color: $ink-mute;

  &.is-unverified {
    color: $warning;
  }
}

.as-event-item-card__source-text {
  font-size: $font-size-xs;
  color: $ink-mute;

  &.is-unverified {
    color: $warning;
  }
}

.as-event-item-card__time {
  font-size: $font-size-xs;
  color: $ink-mute;
  flex-shrink: 0;
}

.as-event-item-card__stars {
  margin-left: auto;
  flex-shrink: 0;
}

/* ===== Title ===== */
.as-event-item-card__title {
  font-size: $font-size-md;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ===== Industries ===== */
.as-event-item-card__industries {
  display: flex;
  flex-wrap: wrap;
  gap: $s-1;
}

.as-event-item-card__industry {
  font-size: $font-size-xs;
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

  &.is-neutral {
    background: $bg-soft;
    color: $ink-mute;
  }
}

/* ===== AI Summary ===== */
.as-event-item-card__ai-summary {
  display: flex;
  gap: $s-1;
  padding: $s-2;
  background: $bg-soft;
  border-radius: $r-sm;
}

.as-event-item-card__ai-badge {
  flex-shrink: 0;
  font-size: 18rpx;
  font-weight: 700;
  padding: 0 8rpx;
  background: $brand-gradient;
  color: $white;
  border-radius: $r-xs;
  line-height: 1.6;
}

.as-event-item-card__ai-text {
  font-size: $font-size-xs;
  color: $ink-soft;
  line-height: $lh-base;
  flex: 1;
}

/* ===== Footer ===== */
.as-event-item-card__footer {
  display: flex;
  align-items: center;
  gap: $s-2;
  padding-top: $s-2;
  margin-top: $s-1;
  border-top: 2rpx solid $line-soft;
}

.as-event-item-card__btn {
  font-size: $font-size-xs;
  font-weight: 500;
  padding: $s-1 $s-3;
  border-radius: $r-full;
  line-height: 1.4;
  cursor: pointer;
  user-select: none;
  transition: all $t-fast;
}

.as-event-item-card__btn--ghost {
  background: $gold-soft;
  color: $accent;
}

.as-event-item-card__btn--ghost:active {
  opacity: $op-active;
}

.as-event-item-card__btn--primary {
  background: $brand-gradient;
  color: $white;
}

.as-event-item-card__btn--primary:active {
  opacity: $op-active;
}
</style>