<template>
  <view class="as-insight-preview-card">
    <!-- 主题色头部：图标 + 标题 + 描述 -->
    <view class="as-insight-preview-card__header" :class="`is-${themeColor}`">
      <view class="as-insight-preview-card__icon-wrap">
        <SvgIcon :name="iconName" size="40rpx" :color="iconColor" />
      </view>
      <view class="as-insight-preview-card__header-text">
        <text class="as-insight-preview-card__title">{{ title }}</text>
        <text v-if="desc" class="as-insight-preview-card__desc">{{ desc }}</text>
      </view>
    </view>

    <!-- 排名预览列表 -->
    <view class="as-insight-preview-card__body">
      <view
        v-for="item in visibleItems"
        :key="item.rank"
        class="as-insight-preview-card__item"
      >
        <!-- 排名徽标：前 3 名高亮 -->
        <view class="as-insight-preview-card__rank" :class="rankClass(item.rank)">
          <text class="as-insight-preview-card__rank-text">{{ item.rank }}</text>
        </view>

        <!-- 名称 -->
        <text class="as-insight-preview-card__name">{{ item.name }}</text>

        <!-- 可选标签 -->
        <view
          v-if="item.tag"
          class="as-insight-preview-card__tag"
          :class="`is-${item.tagType ?? 'neutral'}`"
        >
          <text class="as-insight-preview-card__tag-text">{{ item.tag }}</text>
        </view>

        <!-- 可选趋势 -->
        <text
          v-if="item.trend"
          class="as-insight-preview-card__trend"
          :class="`is-${item.trendType ?? 'flat'}`"
        >{{ item.trend }}</text>
      </view>

      <!-- 空态 -->
      <view v-if="visibleItems.length === 0" class="as-insight-preview-card__empty">
        <text class="as-insight-preview-card__empty-text">暂无预览数据</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SvgIcon from './SvgIcon.vue'

type ThemeColor = 'brand' | 'gold' | 'accent'
type TagType = 'up' | 'down' | 'neutral' | 'warning' | 'gold'
type TrendType = 'up' | 'down' | 'flat'

interface InsightItem {
  /** 排名序号 */
  rank: number
  /** 名称（如股票名/概念名） */
  name: string
  /** 可选标签文字 */
  tag?: string
  /** 标签配色类型 */
  tagType?: TagType
  /** 可选趋势数值文字（如 +12.3%） */
  trend?: string
  /** 趋势配色类型 */
  trendType?: TrendType
}

const props = withDefaults(defineProps<{
  /** 卡片标题 */
  title: string
  /** 卡片描述 */
  desc?: string
  /** 头部图标名称（SvgIcon name） */
  iconName: string
  /** 头部背景主题色 */
  themeColor?: ThemeColor
  /** 预览列表项 */
  items: InsightItem[]
  /** 最多展示条数 */
  maxItems?: number
}>(), {
  desc: '',
  themeColor: 'brand',
  maxItems: 5
})

/** 按 maxItems 截断的可见列表 */
const visibleItems = computed(() => props.items.slice(0, props.maxItems))

/** 头部图标颜色随主题变化 */
const iconColor = computed<string>(() => {
  const colorMap: Record<ThemeColor, string> = {
    brand: '#0b5fff',
    gold: '#a67c1f',
    accent: '#0088c4'
  }
  return colorMap[props.themeColor]
})

/** 排名徽标样式：前 3 名奖牌色，其余默认灰 */
function rankClass(rank: number): string {
  if (rank === 1) return 'is-gold'
  if (rank === 2) return 'is-silver'
  if (rank === 3) return 'is-bronze'
  return 'is-default'
}
</script>

<style lang="scss" scoped>
.as-insight-preview-card {
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-xl;
  overflow: hidden;
  box-shadow: $shadow-xs;
}

/* ===== Header ===== */
.as-insight-preview-card__header {
  display: flex;
  align-items: center;
  gap: $s-3;
  padding: $s-3 $s-4;

  &.is-brand {
    background: $primary-50;
  }

  &.is-gold {
    background: $gold-soft;
  }

  &.is-accent {
    background: $accent-50;
  }
}

.as-insight-preview-card__icon-wrap {
  flex-shrink: 0;
  width: 64rpx;
  height: 64rpx;
  border-radius: $r-md;
  background: $bg-card;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $shadow-xs;
}

.as-insight-preview-card__header-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2rpx;
}

.as-insight-preview-card__title {
  font-size: $font-size-md;
  font-weight: 700;
  color: $ink;
  line-height: $lh-tight;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.as-insight-preview-card__desc {
  font-size: $font-size-xs;
  color: $ink-soft;
  line-height: $lh-base;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== Body ===== */
.as-insight-preview-card__body {
  padding: $s-2 $s-3 $s-3;
}

.as-insight-preview-card__item {
  display: flex;
  align-items: center;
  gap: $s-2;
  padding: $s-2 $s-1;
  border-bottom: 2rpx solid $line-soft;

  &:last-child {
    border-bottom: none;
  }
}

/* ===== Rank badge ===== */
.as-insight-preview-card__rank {
  flex-shrink: 0;
  width: 40rpx;
  height: 40rpx;
  border-radius: $r-full;
  display: flex;
  align-items: center;
  justify-content: center;

  &.is-gold {
    background: $gold;
  }

  &.is-silver {
    background: $ink-faint;
  }

  &.is-bronze {
    background: $gold-deep;
  }

  &.is-default {
    background: $bg-deep;
  }
}

.as-insight-preview-card__rank-text {
  font-size: $font-size-xs;
  font-weight: 700;
  font-family: $font-mono;
  color: $white;

  .is-default & {
    color: $ink-mute;
  }
}

/* ===== Name ===== */
.as-insight-preview-card__name {
  flex: 1;
  min-width: 0;
  font-size: $font-size-sm;
  font-weight: 500;
  color: $ink;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== Tag ===== */
.as-insight-preview-card__tag {
  flex-shrink: 0;
  padding: 2rpx 12rpx;
  border-radius: $r-xs;
  font-size: $font-size-xs;
  font-weight: 600;
  line-height: $lh-tight;

  &.is-up {
    background: $up-soft;
  }

  &.is-down {
    background: $down-soft;
  }

  &.is-neutral {
    background: rgba(11, 95, 255, 0.08);
  }

  &.is-warning {
    background: $warning-soft;
  }

  &.is-gold {
    background: $gold-soft;
  }
}

.as-insight-preview-card__tag-text {
  font-size: inherit;
  font-weight: inherit;

  .is-up & { color: $up; }
  .is-down & { color: $down; }
  .is-neutral & { color: $primary; }
  .is-warning & { color: $warning; }
  .is-gold & { color: $gold-deep; }
}

/* ===== Trend ===== */
.as-insight-preview-card__trend {
  flex-shrink: 0;
  font-size: $font-size-xs;
  font-weight: 700;
  font-family: $font-mono;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
  &.is-flat { color: $flat; }
}

/* ===== Empty ===== */
.as-insight-preview-card__empty {
  padding: $s-6 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-insight-preview-card__empty-text {
  font-size: $font-size-sm;
  color: $ink-mute;
}
</style>
